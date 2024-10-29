import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, Layout } from 'antd';
import { scroller, Element } from 'react-scroll';
import useTest from "../hooks/useTest";
import { ConfirmModal } from '../components/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const TestPage = () => {
  const {questions, answers, getAllQuestions, updateAnswer, submitTest} = useTest();
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuestions()
  }, []);

  // Handle answer selection and deselection (toggle logic)
  const handleAnswerChange = (questionId, selectedOptionText) => {
    updateAnswer(questionId, selectedOptionText);
  };

  // Scroll to specific question
  const scrollToQuestion = (questionId) => {
    scroller.scrollTo(questionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -10, // adjust offset for padding
    });
  };

  // Xử lý sự kiện khi nhấn vào nút "Back"
  const handleBack = () => {
    ConfirmModal({
      title: "Bạn có chắc muốn thoát không, bài thi sẽ không được lưu lại",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        navigate("/profile"); // Điều hướng về trang Profile nếu người dùng xác nhận
      },
    });
  };

  const handleSubmit = () => {
    ConfirmModal({
      title: "Bạn có chắc muốn nộp bài không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        submitTest();
      },
    });
  };

  // Hiển thị loading trong khi dữ liệu chưa được nạp
  if (!questions) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Fixed Sidebar */}
          <div className="col-span-3">
            <div className="fixed top-20 left-0 w-1/4 p-4 bg-white shadow-md">
              <h3 className="font-semibold text-lg mb-4">Danh sách câu hỏi</h3>
              <div className="grid grid-cols-4 gap-2">
                {questions.map((question, index) => (
                  <div
                    key={question._id}
                    className={`cursor-pointer h-12 w-12 flex items-center justify-center rounded-md border ${
                      answers.find((a) => a.questionId === question._id)
                        ?.selectedAnswer
                        ? 'bg-green-200'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => scrollToQuestion(question._id)}
                  >
                    {index + 1}
                  </div>
                ))}
                </div>
            <Button type="primary" onClick={handleSubmit} className="mt-4">
              Submit
            </Button>
            {/* Nút Back để quay lại trang Profile */}
            <Button type="default" onClick={handleBack} className="mt-4 ml-2">
              Exit
            </Button>
              </div>
            
          </div>

          {/* Main Content */}
          <Content className="col-span-9 ml-4">
            {questions.map((question) => (
              <Element name={question._id} key={question._id}>
                <Card
                  title={question.questionText}
                  className="mb-4 shadow-lg"
                >
                  {question.options.map((option) => (
                    <div
                      key={option._id}
                      className={`mb-2 p-2 cursor-pointer rounded border ${
                        answers.find((a) => a.questionId === question._id)
                          ?.selectedAnswer === option.text
                          ? 'bg-blue-200'
                          : 'bg-gray-100'
                      }`}
                      onClick={() =>
                        handleAnswerChange(
                          question._id,
                          option.text // Text of the selected option
                        )
                      }
                    >
                      {option.text}
                    </div>
                  ))}
                </Card>
              </Element>
            ))}

            <Button type="primary" onClick={handleSubmit} className="mt-4">
              Submit
            </Button>
            {/* Nút Back để quay lại trang Profile */}
            <Button type="default" onClick={handleBack} className="mt-4 ml-2">
              Back to Profile
            </Button>
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
