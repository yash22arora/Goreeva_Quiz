import { useContext, useEffect, useState } from "react";
import { TQuizData } from "../../Create/BasicsForm/types";
import AuthContext from "../../../store/auth-context";
import Item from "./Item";
import { getAllQuizzes } from "../../../utils/crud";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState<TQuizData[]>([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (!authCtx.user) return;

    let quizzesLocal: TQuizData[] = [];
    getAllQuizzes(authCtx.user?.uid).then((res) => {
      res.forEach((quiz) => {
        const quizData = quiz.data() as TQuizData;
        quizzesLocal.push(quizData);
        console.log(quizzesLocal);
      });
      setQuizzes(quizzesLocal);
    });
  }, [authCtx.user]);

  if (!authCtx.isLoggedIn)
    return (
      <div className="flex flex-col w-full items-center justify-center text-sm text-gray-400">
        Log in to see your created quizzes
      </div>
    );

  return (
    <div className="flex flex-col w-full items-center justify-center text-sm text-gray-400">
      {quizzes.length === 0 ? (
        <span>You have not created any quiz yet.</span>
      ) : (
        <>
          <span className="mb-4">Your Quizzes</span>
          {quizzes.map((quiz, index) => {
            return (
              <Item id={quiz.id} index={index + 1} quizName={quiz.quizName} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default QuizList;
