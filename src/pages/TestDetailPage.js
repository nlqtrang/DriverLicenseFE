import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from 'react';
import { Card, List, Tooltip, Button, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';

import useTest from "../hooks/useTest";

const TestDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use navigate for navigation

    // Sử dụng URLSearchParams để lấy giá trị của query parameter
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');  // Lấy giá trị của param 'id'

    const {testData, getDetailTest} = useTest();
    const questionRefs = useRef([]); // Dùng ref để scroll đến câu hỏi

    useEffect(() => {
        getDetailTest(id);
    }, []);

    // Hàm xác nhận khi nhấn nút Back
    const handleBack = () => {
        navigate("/profile");
    };

    // Kiểm tra nếu testData hoặc testData.data chưa có, tránh lỗi null
    if (!testData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin tip="Loading..." />
            </div>
        );
    }

    

    // Bảo vệ khi testData không có data (dự phòng)
    const { questions = [], score, totalQuestions, startTime, endTime, user } = testData || {};

    // Hàm để scroll tới câu hỏi
    const scrollToQuestion = (index) => {
        questionRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar bên trái hiển thị thông tin tổng quan và danh sách câu hỏi */}
            <div className="w-1/4 p-4 bg-white shadow-lg h-screen sticky top-0">
            {/* Nút Back to Profile */}
            <Button type="primary" onClick={handleBack} className="mt-6">
                    Back to Profile
                </Button>
                <Card className="mb-4" title="Test Overview">
                    <p><UserOutlined /> <strong>User:</strong> {user.name}</p>
                    <p><FieldTimeOutlined /> <strong>Start Time:</strong> {startTime ? new Date(startTime).toLocaleString() : 'N/A'}</p>
                    <p><FieldTimeOutlined /> <strong>End Time:</strong> {endTime ? new Date(endTime).toLocaleString() : 'N/A'}</p>
                    <p><strong>Score:</strong> {score} / {totalQuestions}</p>
                </Card>

                {/* Danh sách câu hỏi */}
                <Card title="Questions">
                    <div className="flex flex-wrap">
                        {questions.map((item, index) => (
                            <div key={index} onClick={() => scrollToQuestion(index)} className="cursor-pointer m-1">
                                <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                                    <span className="mr-2 font-semibold">{index + 1}</span>
                                    {item.isCorrect === null ? (
                                        <InfoCircleOutlined style={{ color: '#d9d9d9' }} /> // Chưa làm
                                    ) : item.isCorrect ? (
                                        <CheckCircleOutlined style={{ color: '#52c41a' }} /> // Đúng
                                    ) : (
                                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} /> // Sai
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                
            </div>

            {/* Phần hiển thị chi tiết câu hỏi bên phải */}
            <div className="w-3/4 p-4">
                <Card title="Test Questions">
                    <List
                        itemLayout="vertical"
                        dataSource={questions}
                        renderItem={(item, index) => (
                            <List.Item className="mb-6 p-4 rounded-lg bg-white shadow-sm" ref={el => (questionRefs.current[index] = el)}>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-lg">{index + 1}. {item.question.questionText}</p>
                                    {item.isCorrect === null ? (
                                        <Tooltip title="Not Answered">
                                            <InfoCircleOutlined style={{ fontSize: '20px', color: '#FFA500' }} />
                                        </Tooltip>
                                    ) : item.isCorrect ? (
                                        <Tooltip title="Correct">
                                            <CheckCircleOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Incorrect">
                                            <CloseCircleOutlined style={{ fontSize: '20px', color: '#ff4d4f' }} />
                                        </Tooltip>
                                    )}
                                </div>
                                <div className="mt-4">
                                    {/* Hiển thị các lựa chọn */}
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={item.question.options}
                                        renderItem={(option) => (
                                            <List.Item>
                                                <div
                                                    className={`text-base p-2 rounded-md ${
                                                        option.text === item.selectedAnswer
                                                        ? item.isCorrect === true
                                                            ? "bg-green-100 border border-green-400"
                                                            : "bg-red-100 border border-red-400"
                                                        : option.isCorrect
                                                        ? "bg-blue-100 border border-blue-400"
                                                        : "bg-gray-100"
                                                    }`}
                                                >
                                                    <span>{option.text}</span>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                    <div className="mt-4">
                                        <strong>Your Answer: </strong>
                                        {item.selectedAnswer !== null ? (
                                            <span className="font-semibold">{item.selectedAnswer}</span>
                                        ) : (
                                            <span className="text-red-500">No answer selected</span>
                                        )}
                                    </div>
                                    {item.isCorrect === false && (
                                        <div className="mt-2 text-blue-500">
                                            <strong>Correct Answer: </strong>
                                            <span className="font-semibold">
                                                {
                                                    item.question.options.find(option => option.isCorrect).text
                                                }
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    );
};

export default TestDetailPage;
