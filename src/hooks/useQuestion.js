import { useState } from "react";
import { notification } from "antd";
import instance from "../utils/index";
import { handleResponse } from "../utils/request";
export const useQuestion = () => {
  const [questions, setQuestions] = useState(null);

  const getALlQuestions = async () => {
    try {
      const { data } = await instance.get("/questions");
      setQuestions(data.data);
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };
  const updateQuestion = async (questionId, question) => {
    try {
      const { data } = await instance.put(`/questions/${questionId}`, question);
      handleResponse(data);
      getALlQuestions();
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };
  const createQuestion = async (question) => {
    try {
      const { data } = await instance.post("/questions/create", question);
      handleResponse(data);
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };
  const deleteQuestion = async (questionId) => {
    try {
      const { data } = await instance.delete(`/questions/${questionId}`);
      handleResponse(data);
      getALlQuestions();
    } catch {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
    }
  };
  return {
    questions,
    getALlQuestions,
    updateQuestion,
    createQuestion,
    deleteQuestion,
  };
};

export default useQuestion;
