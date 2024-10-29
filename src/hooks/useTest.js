import { useState } from "react";
import { notification } from "antd";
import instance from "../utils/index";
import { handleResponse } from "../utils/request";
import { useNavigate } from "react-router-dom";
export const useTest = () => {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [testData, setTestData] = useState(null);
  const [listTests, setListTests] = useState([]);
  const navigate = useNavigate();

  const getAllQuestions = async () => {
    try {
      const { data } = await instance.get("/questions/random");
      setQuestions(data.data.questions);
      setAnswers(
        data.data.questions.map((question) => ({
          questionId: question._id,
          selectedAnswer: null,
        }))
      );
      setStartTime(data.data.startTime);
      handleResponse(data);
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };
  const updateAnswer = (questionId, selectedOptionText) => {
    setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.questionId === questionId
            ? {
                ...answer,
                selectedAnswer: answer.selectedAnswer === selectedOptionText ? null : selectedOptionText, // Toggle chọn/hủy chọn
              }
            : answer
        )
      );
  };
//   try {
//     const { data } = await instance.put(`/questions/${questionId}`, question);
//     handleResponse(data);
//     getAllQuestions();
//   } catch {
//     notification.error({
//       message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
//     });
//   }
// };
  const submitTest = async () => {
    try {
      const { data } = await instance.post("/tests/taketest", {
        questions: answers, startTime
      });
      handleResponse(data);
      navigate(`/test-result-detail?id=${data.data}`);
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }

  };

  const getDetailTest = async (id) => {
    try {
      const { data } = await instance.get(`/tests/${id}`);
      setTestData(data.data);
      handleResponse(data);
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };

  //get list test
  const getListTests = async () => {
    try {
      const { data } = await instance.get(`/tests`);
      setListTests(data.data);
      handleResponse(data);
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };
  
  return {
    questions,
    answers,
    testData,
    listTests,
    getAllQuestions,
    updateAnswer,
    submitTest,
    getDetailTest,
    getListTests,
  };
};

export default useTest;
