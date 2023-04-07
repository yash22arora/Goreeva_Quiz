import { useEffect, useMemo, useState } from "react";
import { TQuizData } from "../components/Create/BasicsForm/types";
import { DUMMY_QUESTIONS } from "../constants";
import Question from "../components/Edit/Question";

const PlayQuiz: React.FC = () => {
  const quizData: TQuizData = useMemo(
    () => ({
      quizName: "Test Quiz",
      quizDescription:
        "lorem ipsum dolor sit amet nunc nunc lorem ipsum blah blah blah",
      correctMarks: 5,
      incorrectMarks: -2,
      timeLimit: 30,
      id: "dfveveevv",
      questions: DUMMY_QUESTIONS,
    }),
    []
  );

  // create timer from timeLimit
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);
  const [quizCompleteTime, setQuizCompleteTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
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
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {}, 1000);
      let score = 0;
      quizData.questions.forEach((question, index) => {
        if (question.correctAnswer === selectedAnswers[index]) {
          score += quizData.correctMarks;
        } else {
          score += quizData.incorrectMarks;
        }
      });
      resolve(score);
    });
  };

  const handleFinish = () => {
    setIsLoading(true);
    evaluateQuiz().then((score) => {
      setIsQuizComplete(true);
      setFinalScore(score);
      setIsLoading(false);
      setQuizCompleteTime(timeLeft);
    });
  };

  return (
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
        <div className="flex flex-row items-center w-full justify-between text-gray-400">
          <span className="text-green-300">
            Correct Answer : {quizData.correctMarks}
          </span>
          <span className="text-yellow-200">
            Incorrect Answer : {quizData.incorrectMarks}
          </span>
        </div>
      </div>
      <h1 className="text-7xl font-semibold ">{formatTime(timeLeft)}</h1>
      <div className="my-10 w-full max-w-4xl">
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
    </div>
  );
};

export default PlayQuiz;
