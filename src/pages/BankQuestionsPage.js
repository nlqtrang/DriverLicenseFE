import { React, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useQuestion from "../hooks/useQuestion";
import { Table, Tag, Card, Button, Form, Modal, Input, Checkbox, notification } from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ConfirmModal } from "../components/ConfirmModal";
const BankQuestionsPage = () => {
  const {
    questions,
    getAllQuestions,
    updateQuestion,
    createQuestion,
    deleteQuestion,
  } = useQuestion();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  const showEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record); // Đặt giá trị mặc định cho form
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        updateQuestion(values._id, values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        // Lấy thông tin lỗi từ errorFields
        const errors = errorInfo.errorFields?.map(err => `${err.name}: ${err.errors.join(', ')}`).join('; ');
      
        notification.error({
          message: 'Validation Error',
          description: errors, // Hiển thị mô tả lỗi
        });
      });
      
  };
  

  const handleCancelCreate = () => {
    setIsCreateModalVisible(false);
    createForm.resetFields();
  }

  const handleCreate = () => {
    createForm
      .validateFields()
      .then((values) => {
        const formattedOptions = values.options ? values.options.map((option) => ({
          ...option,
          isCorrect: option.isCorrect || false, // Đảm bảo giá trị là false nếu không được tích
        })): null;
  
        const updatedRecord = { ...values, options: formattedOptions };
        createQuestion(updatedRecord).then(() => {
          setIsCreateModalVisible(false);
          getAllQuestions();
        });
        createForm.resetFields();
      })
      .catch((errorInfo) => {
        // Lấy thông tin lỗi từ errorFields
        // const errors = errorInfo.errorFields?.map(err => `${err.name}: ${err.errors.join(', ')}`).join('; ');
        // const error = errorInfo.errorFields[0].errors[0];
        //lấy lỗi  thứ nhất
        const error = errorInfo.errorFields[0].errors[0];
        notification.error({
          message: 'Validation Error',
          description: "heloo", // Hiển thị mô tả lỗi
        });
      });
      
  };
  
  const handleDelete = (questionId) => {
    ConfirmModal({
      title: "Bạn có chắc muốn xóa không",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        deleteQuestion(questionId);
      },
    });
  };
  useEffect(() => {
    getAllQuestions();
  }, []);
  const columns = [
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      render: (options) => (
        <>
          {options && options.length > 0 ? options.map((option) => (
            <div key={option._id}>
              <Tag color={option.isCorrect ? "green" : "volcano"}>
                {option.text}
              </Tag>
            </div>
          )) : <Tag color="red">Chưa có đáp án</Tag>}
        </>
      )
    },
    {
      key: "action",
      title: "Chức năng",
      width: "20%",
      render: (record) => {
        return (
          <div>
            <EditOutlined
              style={{
                color: "green",
                padding: 10,
                cursor: "pointer",
                marginRight: 10,
              }}
              onClick={() => showEditModal(record)}
            />
            <DeleteOutlined
              style={{
                color: "red",
                padding: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                handleDelete(record._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  if (!questions) {
    return <div>Loading user information...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#ccc",
        width: "100%",
      }}
    >
      <Card
        style={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: 24 }}>Quản lý câu hỏi</h1>
      </Card>
      <Card
        style={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div>
          <div className="d-flex justify-content-end mb-base">
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => setIsCreateModalVisible(true)}
            >
              Thêm câu hỏi
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={questions}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Card>
      <Modal
        title="Edit Record"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical" initialValues={editingRecord}>
          <Form.Item
            name="questionText"
            label="Question"
            rules={[{ required: true, message: "Please input the question!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="_id" label="ID" hidden>
            <Input disabled />
          </Form.Item>
          <Form.List name="options">
            {(fields) => (
              <>
                {fields?.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "text"]}
                      label={`Option ${name + 1}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input the option text!",
                        },
                      ]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Option text" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "isCorrect"]}
                      valuePropName="checked"
                    >
                      <Checkbox>Correct</Checkbox>
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
      <Modal
        title="Add New Question"
        open={isCreateModalVisible}
        onCancel={handleCancelCreate}
        onOk={handleCreate}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="questionText"
            label="Question"
            rules={[{ required: true, message: "Please input the question!" }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields?.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "text"]}
                      label={`Option ${name + 1}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input the option text!",
                        },
                      ]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Option text" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "isCorrect"]}
                      valuePropName="checked"
                    >
                      <Checkbox>Correct</Checkbox>
                    </Form.Item>
                    <Button onClick={() => remove(name)}>Remove</Button>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "100%" }}
                >
                  + Add Option
                </Button>
              </>
            )}
          </Form.List>

          {/* <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please input the category!' }]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default BankQuestionsPage;
