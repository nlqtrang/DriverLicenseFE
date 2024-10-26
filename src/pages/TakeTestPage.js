import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import instance from "../utils/index";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";

const Question = ({ data, questionIndex, handleAnswer, selectedAnswer }) => {
  return (
    <div id={`question-${questionIndex}`} className="mb-6">
      <h4 className="font-semibold mb-2">{data.questionText}</h4>
      <div className="grid grid-cols-1 gap-2">
        {data.options.map((option, optionIndex) => (
          <button
            key={option._id}
            className={`btn btn-outline-primary w-full text-left ${
              selectedAnswer === optionIndex ? "btn-primary text-white" : ""
            }`}
            onClick={() => handleAnswer(questionIndex, optionIndex)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const TakeTestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // Time left in seconds (e.g., 10 minutes)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await instance.get("questions/random");
        setQuestions(response.data);
        setAnswers(Array(response.data.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] =
      newAnswers[questionIndex] === optionIndex ? null : optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    toast.success("Test submitted successfully!");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Questions */}
      <div className="w-8/12 p-4 overflow-y-auto">
        {questions.map((question, index) => (
          <Question
            key={question._id}
            data={question}
            questionIndex={index}
            handleAnswer={handleAnswer}
            selectedAnswer={answers[index]}
          />
        ))}
      </div>

      {/* Right side - Navigation and Summary */}
      <div className="w-4/12 p-4 bg-gray-100">
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Navigation</h5>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((question, index) => (
              <button
                key={question._id}
                className={`btn ${
                  answers[index] !== null ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => {
                  document
                    .getElementById(`question-${index}`)
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Time Left</h5>
          <p className="text-lg font-bold">{formatTime(timeLeft)}</p>
        </div>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Submit Test
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TakeTestPage;
