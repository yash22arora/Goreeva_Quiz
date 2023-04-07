import { useEffect, useState } from "react";
import { IQuestion } from "../components/Edit/types";
import Question from "../components/Edit/Question";
import ShortUniqueId from "short-unique-id";

const Edit: React.FC = () => {
  const uid = new ShortUniqueId({ length: 10 });
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      prompt: "What is the capital of India?",
      answers: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "",
      id: uid(),
    },
    {
      prompt: "Which is not a neighbouring country to India?",
      answers: ["Pakistan", "Nepal", "China", "Japan"],
      correctAnswer: "",
      id: uid(),
    },
    {
      prompt: "Which is the largest country in the world?",
      answers: ["Russia", "China", "India", "USA"],
      correctAnswer: "",
      id: uid(),
    },
    {
      prompt: "Which is the largest city in the world?",
      answers: ["Tokyo", "New York", "Delhi", "Shanghai"],
      correctAnswer: "",
      id: uid(),
    },
  ]);

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const onEditQuestion = (question: IQuestion, id: number) => {
    const newQuestions = [...questions];
    newQuestions[id] = question;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        prompt: "",
        answers: ["", "", "", ""],
        correctAnswer: "",
        id: uid(),
      },
    ]);
  };

  const onDeleteQuestion = (id: string) => {
    console.log(id);
    let newQuestions = [...questions];
    newQuestions = newQuestions.filter((question) => question.id !== id);
    setQuestions(newQuestions);
  };

  const onSave = () => {
    const errors: { [key: string]: string } = {};
    let errorFlag = false;
    questions.forEach((question, index) => {
      if (question.correctAnswer === "") {
        errors[question.id] = "Correct answer cannot be empty";
        errorFlag = true;
      }
      if (question.answers.filter((answer) => answer === "").length > 0) {
        errors[question.id] = "Answers cannot be empty";
        errorFlag = true;
      }
      if (question.prompt === "") {
        errors[question.id] = "Prompt cannot be empty";
        errorFlag = true;
      }
    });
    setErrors(errors);

    if (!errorFlag) {
      console.log("Save");
      //make api request
    }
  };

  return (
    <div className="w-full h-full flex flex-col max-w-5xl mx-auto">
      <div className="" id="quizHeader"></div>
      <div className="flex flex-col gap-6">
        {questions.map((question, index) => {
          return (
            <Question
              error={errors[question.id]}
              question={question}
              key={question.id}
              isEdit={true}
              onEdit={(question) => onEditQuestion(question, index)}
              onDelete={(id) => onDeleteQuestion(id)}
            />
          );
        })}
        <div
          className="cursor-pointer flex flex-row items-center justify-center p-4 w-full bg-violet-600 hover:bg-opacity-70 bg-opacity-50 text-gray-300 font-bold text-2xl"
          onClick={handleAddQuestion}
        >
          Add Question
        </div>
        <div>
          <button
            className="bg-violet-600 text-gray-300 font-bold text-2xl p-4"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
