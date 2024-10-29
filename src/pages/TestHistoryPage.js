import React, { useEffect } from 'react';
import { Card, List, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Dùng để format thời gian
import useTest from '../hooks/useTest';

const TestHistoryPage = ({ testHistory }) => {
  const navigate = useNavigate();
  const {listTests, getListTests} = useTest();

    useEffect(() => {
        getListTests();
    }, []);



  // Hàm xử lý điều hướng đến trang chi tiết bài thi
  const handleNavigateToDetail = (testId) => {
    navigate(`/test-result-detail?id=${testId}`); // Điều hướng đến trang chi tiết bài thi với testId
  };


  if (!listTests) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <Card title="Lịch sử bài thi" className="shadow-lg">
          <List
            itemLayout="vertical"
            dataSource={listTests}
            renderItem={(item) => (
              <List.Item className="mb-4">
                <Card
                  title={`Bài thi: ${moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}`}
                  extra={
                    <Button
                      type="primary"
                      onClick={() => handleNavigateToDetail(item._id)}
                    >
                      Xem chi tiết
                    </Button>
                  }
                  className="shadow-sm"
                >
                  <p><strong>Điểm:</strong> {item.score} / {item.totalQuestions}</p>
                  <p><strong>Bắt đầu lúc:</strong> {moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <p><strong>Kết thúc lúc:</strong> {moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <p><strong>Thời gian tối đa:</strong> {item.maxTimeAllowed} giây</p>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default TestHistoryPage;
