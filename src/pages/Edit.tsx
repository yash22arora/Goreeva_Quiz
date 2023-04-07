import { useState } from "react";
import { IQuestion } from "../components/Edit/types";
import Question from "../components/Edit/Question";

const Edit: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      prompt: "What is the capital of India?",
      answers: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "Delhi",
      id: 1,
    },
    {
      prompt: "Which is not a neighbouring country to India?",
      answers: ["Pakistan", "Nepal", "China", "Japan"],
      correctAnswer: "China",
      id: 2,
    },
    {
      prompt: "Which is the largest country in the world?",
      answers: ["Russia", "China", "India", "USA"],
      correctAnswer: "Russia",
      id: 3,
    },
    {
      prompt: "Which is the largest city in the world?",
      answers: ["Tokyo", "New York", "Delhi", "Shanghai"],
      correctAnswer: "Shanghai",
      id: 4,
    },
  ]);
  return (
    <div className="w-full h-full flex flex-col max-w-5xl mx-auto">
      <div className="" id="quizHeader"></div>
      <div className="flex flex-col gap-6">
        {questions.map((question, index) => {
          return <Question question={question} key={index} isEdit={false} />;
        })}
      </div>
    </div>
  );
};

export default Edit;
