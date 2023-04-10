import { useEffect, useMemo, useState } from "react";
import { TQuizData } from "../components/Create/BasicsForm/types";
import { DUMMY_QUESTIONS } from "../constants";
import Question from "../components/Edit/Question";
import ProgressBar from "../components/common/ProgressBar/ProgressBar";
import { useHistory, useParams } from "react-router-dom";
import { getQuiZDatafromFirestore } from "../utils/crud";
import customToast from "../components/common/CustomToast/CustomToast";
import Button from "../components/common/Button/Button";

const PlayQuiz: React.FC = () => {
  const [quizData, setQuizData] = useState<TQuizData>();
  const { quizId } = useParams<{ quizId: string }>();
  const history = useHistory();

  useEffect(() => {
    getQuiZDatafromFirestore(quizId).then((res) => {
      if (res) {
        setQuizData({
          ...res,
          correctMarks: res.correctMarks as number,
          incorrectMarks: res.incorrectMarks as number,
        });
        // setTimeLeft(res.timeLimit * 60);
        setMaxMarks(res.questions.length * res.correctMarks);
      } else {
        customToast("Quiz not found :(");
        history.push("/");
      }
    });
  }, [quizId]);

  // create timer from timeLimit
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizCompleteTime, setQuizCompleteTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [maxMarks, setMaxMarks] = useState(0);
  const [isQuizStart, setIsQuizStart] = useState(false);

  useEffect(() => {
    if (!isQuizStart) return;
    if (timeLeft === 0) {
      handleFinish();
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (!quizData) return;
    if (currentQuestion === quizData.questions.length - 1) {
      setIsLastQuestion(true);
    }
  }, [currentQuestion, quizData]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleNext = () => {
    if (quizData)
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
  };

  const handleSelectAnswer = (option: string, id: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[id] = option;
    setSelectedAnswers(newAnswers);
  };

  const evaluateQuiz = async () => {
    if (!quizData) return Promise.resolve(0);
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {}, 1000);
      let score: number = 0;
      const correctMarks = quizData.correctMarks;
      const incorrectMarks = quizData.incorrectMarks;
      selectedAnswers.forEach((selectedAnswer, index) => {
        if (selectedAnswer === quizData.questions[index].correctAnswer) {
          score = +score + +correctMarks;
        } else {
          score = +score + +incorrectMarks;
        }
      });
      resolve(score);
    });
  };

  const handleFinish = () => {
    setIsLoading(true);
    setQuizCompleteTime(timeLeft);
    evaluateQuiz().then((score) => {
      setIsQuizComplete(true);
      setFinalScore(score);
      setIsLoading(false);
    });
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <>
      {!isQuizStart ? (
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col gap-2 text-gray-400">
          <div className="grid grid-cols-2 gap-2 my-4">
            <h1 className="text-2xl font-semibold">Quiz Name:</h1>
            <h1 className="text-2xl font-semibold">{quizData.quizName}</h1>
            <p className="text-lg font-normal ">Description:</p>
            <p className="text-lg font-normal ">{quizData.quizDescription}</p>
            <p className="text-lg font-normal ">Total Questions:</p>
            <p className="text-lg font-normal ">{quizData.questions.length}</p>
            <p className="text-lg font-normal ">Time Limit:</p>
            <p className="text-lg font-normal ">{quizData.timeLimit} minutes</p>
            <p className="text-lg font-medium ">Correct Answer: </p>
            <p className="text-lg font-medium ">
              {quizData.correctMarks} points{" "}
            </p>
            <p className="text-lg font-medium ">Incorrect Answer: </p>
            <p className="text-lg font-medium ">
              {quizData.incorrectMarks} points{" "}
            </p>
          </div>
          <Button
            className="w-full rounded-md py-4 bg-violet-700 hover:bg-violet-800 font-semibold "
            onClick={() => {
              setIsQuizStart(true);
              setTimeLeft(quizData.timeLimit * 60);
            }}
          >
            Start
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-300">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-center">
              {quizData.quizName}
            </h1>
            <p className="text-lg text-center font-medium mt-2 text-gray-400">
              {quizData.quizDescription}
            </p>
            <p className="text-xl text-center font-medium mt-6 text-gray-400">
              Marking Scheme
            </p>
            <div className="flex flex-row items-center w-full justify-between text-gray-400 gap-8 mt-3">
              <span className="text-green-300">
                Correct Answer : {quizData.correctMarks}
              </span>
              <span className="text-yellow-200">
                Incorrect Answer : {quizData.incorrectMarks}
              </span>
            </div>
          </div>
          {!isQuizComplete ? (
            <>
              <h1 className="text-7xl font-semibold mb-3">
                {formatTime(timeLeft)}
              </h1>
              <div className="w-full my-3 max-w-4xl">
                <ProgressBar
                  completed={timeLeft}
                  total={quizData.timeLimit * 60}
                />
              </div>
              <h1 className="text-3xl font-semibold mt-3">
                Q{currentQuestion + 1}/Q{quizData.questions.length}
              </h1>
              <div className="my-8 w-full max-w-4xl">
                <Question
                  question={quizData.questions[currentQuestion]}
                  isEdit={false}
                  onSelectAnswer={(option) =>
                    handleSelectAnswer(option, currentQuestion)
                  }
                />
                <button
                  className="cursor-pointer mt-4 flex flex-row items-center justify-center p-4 w-full bg-violet-600 hover:bg-opacity-70 bg-opacity-50 text-gray-300 font-bold text-2xl disabled:bg-slate-500 disabled:cursor-not-allowed"
                  onClick={isLastQuestion ? handleFinish : handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                >
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center mt-12 text-3xl">
              <h1 className="text-7xl font-semibold mb-6">
                {quizCompleteTime > 0
                  ? finalScore > maxMarks / 2
                    ? "Good Job!"
                    : "You can do better!"
                  : "Time's Up!"}
              </h1>
              <span className="font-semibold mb-4">
                Questions attempted : {selectedAnswers.length} /{" "}
                {quizData.questions.length}
              </span>
              <span className="font-semibold">
                Final Score : {finalScore} / {maxMarks}
              </span>
              <button
                className="cursor-pointer mt-12 flex flex-row items-center justify-center p-4 w-full bg-violet-600 hover:bg-opacity-70 bg-opacity-50 text-gray-300 font-bold text-2xl disabled:bg-slate-500 disabled:cursor-not-allowed"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PlayQuiz;
