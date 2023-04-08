import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Input from "../components/common/Input/Input";
import Button from "../components/common/Button/Button";
import QuizList from "../components/Edit/QuizList/QuizList";

const Home: React.FC = () => {
  const [quizId, setQuizId] = useState<string>("");
  const history = useHistory();

  const handleStart = () => {
    history.push(`/play/${quizId}`);
  };

  return (
    <div className="flex flex-col items-center text-gray-300 pt-24">
      <h1 className="text-7xl font-semibold text-gray-300">
        Welcome to Quizzy 📝
      </h1>
      <p className="text-center text-lg mt-3">The simplest quiz app.</p>

      <div className="flex flex-col gap-4 mt-24">
        <div className="flex flex-row items-center justify-center gap-6">
          <Input
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            maxLength={6}
            placeholder="Enter quiz ID"
            className="px-4 py-3"
          />
          <Button
            className="px-6 py-3 bg-orange-300 disabled:bg-slate-500 disabled:cursor-not-allowed font-semibold text-slate-800 disabled:text-gray-300"
            disabled={quizId.length !== 6}
            onClick={handleStart}
          >
            Start
          </Button>
        </div>
        <span className="mx-auto font-bold">OR</span>
        <Button
          className="w-full rounded-md py-4 bg-violet-700 hover:bg-violet-800 font-semibold "
          onClick={() => {
            history.push("/create");
          }}
        >
          Create
        </Button>
      </div>
      <div className="w-full max-w-5xl text-center mt-24">
        <QuizList />
      </div>
    </div>
  );
};

export default Home;
