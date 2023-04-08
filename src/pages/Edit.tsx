import { useEffect, useState } from "react";
import { IQuestion } from "../components/Edit/types";
import Question from "../components/Edit/Question";
import ShortUniqueId from "short-unique-id";
import { CgSpinner } from "react-icons/cg";
import { useHistory, useParams } from "react-router-dom";
import {
  getQuiZDatafromFirestore,
  updateQuestionsonFirestore,
} from "../utils/crud";
import { TQuizData } from "../components/Create/BasicsForm/types";
import customToast from "../components/common/CustomToast/CustomToast";
import { BiCopy } from "react-icons/bi";

const Edit: React.FC = () => {
  const uid = new ShortUniqueId({ length: 10 });
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [quizData, setQuizData] = useState<TQuizData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { quizId } = useParams<{
    quizId: string;
  }>();
  const history = useHistory();

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    getQuiZDatafromFirestore(quizId).then((res) => {
      if (res) {
        setQuizData(res);
        setQuestions(res.questions);
      } else {
        history.push("/");
      }
    });
  }, [quizId]);

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
    let newQuestions = [...questions];
    newQuestions = newQuestions.filter((question) => question.id !== id);
    setQuestions(newQuestions);
  };

  const onSave = () => {
    const errors: { [key: string]: string } = {};
    setErrors({});
    let errorFlag = false;
    questions.forEach((question, index) => {
      if (question.correctAnswer === "") {
        errors[question.id] = "Correct answer cannot be empty";
        errorFlag = true;
      }
      if (new Set(question.answers).size !== question.answers.length) {
        errors[question.id] = "Answers cannot be same";
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
      setIsLoading(true);
      const newQuizData = {
        ...quizData,
        questions,
      };
      updateQuestionsonFirestore(quizId, questions)
        .then((res) => {
          customToast("Questions updated successfully");
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(quizId);
    customToast("Quiz ID copied to clipboard");
  };

  return (
    <div className="w-full h-full flex flex-col max-w-5xl mx-auto">
      <div
        className="flex flex-col p-8 rounded-lg mb-4 w-full text-gray-300 bg-slate-600 bg-opacity-50 backdrop-blur-lg"
        id="quizHeader"
      >
        <h1 className=" text-5xl text-center flex flex-row items-center w-full justify-center font-semibold mb-6">
          Quiz ID:{" "}
          <span
            className="hover:underline underline-offset-4 cursor-copy flex flex-row items-center gap-4 ml-4"
            onClick={copyCodeToClipboard}
          >
            {quizId}
            <BiCopy size={35} />
          </span>
        </h1>
        <h1 className="text-center font-semibold text-3xl">
          {quizData?.quizName}
        </h1>
        <p className="text-center text-gray-400 text-xl my-3">
          {quizData?.quizDescription}
        </p>
        <div className="grid grid-cols-3 mt-3 text-center">
          <span className="text-lg font-medium">
            Time Limit: {quizData?.timeLimit} mins
          </span>
          <span className="text-lg font-medium">
            Correct Answer Marks: {quizData?.correctMarks} pts
          </span>
          <span className="text-lg font-medium">
            Inorrect Answer Marks: {quizData?.incorrectMarks} pts
          </span>
        </div>
      </div>
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
        <div className="ml-auto flex flex-row items-center gap-6">
          <button
            className="bg-orange-300 text-slate-800 font-bold text-2xl px-6 py-2 rounded-sm flex flex-row items-center gap-2"
            onClick={() => {
              history.push(`/play/${quizId}`);
            }}
          >
            Preview
          </button>
          <button
            className="bg-violet-600 text-gray-300 font-bold text-2xl px-6 py-2 rounded-sm flex flex-row items-center gap-2"
            onClick={onSave}
          >
            {isLoading && (
              <div className="animate-spin">
                <CgSpinner />
              </div>
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
