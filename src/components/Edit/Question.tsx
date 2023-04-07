import { useEffect, useState } from "react";
import { IQuestion, IQuestionProps } from "./types";
import Option from "./Option";

const Question: React.FC<IQuestionProps> = (props) => {
  const { question, isEdit = false, onEdit, onDelete, error } = props;
  const [answers, setAnswers] = useState<IQuestion["answers"]>(
    question.answers
  );
  const [correctAnswer, setCorrectAnswer] = useState<
    IQuestion["correctAnswer"] | null
  >(isEdit ? null : question.correctAnswer);
  const [prompt, setPrompt] = useState<IQuestion["prompt"]>(question.prompt);

  const onEditOption = (option: string, id: number) => {
    const newAnswers = [...answers];
    newAnswers[id] = option;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    onEdit &&
      onEdit({
        ...question,
        answers: answers,
        correctAnswer: correctAnswer || "",
        prompt: prompt,
      });
  }, [answers, correctAnswer, prompt]);

  return (
    <div className="rounded-lg p-6 bg-[rgb(113,79,168)] bg-opacity-60 text-gray-300">
      {isEdit ? (
        <textarea
          placeholder="Enter question prompt"
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
                !isEdit && setCorrectAnswer(answer);
              }}
              isEdit={isEdit}
              onEdit={(option) => onEditOption(option, index)}
            />
          );
        })}
      </div>
      {isEdit && (
        <div className="flex flex-row items-center justify-between mt-4 text-xl w-full text-gray-300">
          <div>
            <span>Correct Answer: </span>
            <select
              className="rounded-lg p-2 ml-4 bg-[rgb(113,79,168)] bg-opacity-60"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              value={correctAnswer as string}
            >
              <option hidden selected>
                Select Option
              </option>
              {answers.map((answer, index) => {
                return <option value={answer}>{answer}</option>;
              })}
            </select>
          </div>
          <div>
            <button
              className="bg-red-500 p-2 rounded-lg text-gray-300"
              onClick={() => onDelete && onDelete(question.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-xl font-semibold mt-4">{error}</div>
      )}
    </div>
  );
};

export default Question;
