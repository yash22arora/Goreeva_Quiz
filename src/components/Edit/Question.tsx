import { useState } from "react";
import { IQuestion, IQuestionProps } from "./types";
import Option from "./Option";

const Question: React.FC<IQuestionProps> = (props) => {
  const { question, isEdit = false } = props;
  const [answers, setAnswers] = useState<IQuestion["answers"]>(
    question.answers
  );
  const [correctAnswer, setCorrectAnswer] = useState<
    IQuestion["correctAnswer"]
  >(question.correctAnswer);
  const [prompt, setPrompt] = useState<IQuestion["prompt"]>(question.prompt);

  return (
    <div className="rounded-lg p-6 bg-[rgb(113,79,168)] bg-opacity-60 text-gray-300">
      {isEdit ? (
        <textarea
          value={prompt}
          rows={prompt.split("\n").length}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-transparent rounded-md p-2 font-semibold resize-y outline outline-gray-400 text-2xl"
        ></textarea>
      ) : (
        <h2 className="font-semibold text-2xl">{question.prompt}</h2>
      )}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {answers.map((answer, index) => {
          return (
            <Option
              option={answer}
              id={index}
              selected={correctAnswer === answer}
              onSelect={() => {
                setCorrectAnswer(answer);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Question;
