import { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { TQuizData } from "./types";
import ShortUniqueId from "short-unique-id";
import { CgSpinner } from "react-icons/cg";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { useHistory } from "react-router-dom";

const BasicsForm: React.FC = () => {
  const uid = new ShortUniqueId({ length: 6 });
  const [quizData, setQuizData] = useState<TQuizData>({
    quizName: "",
    quizDescription: "",
    correctMarks: 0,
    incorrectMarks: 0,
    timeLimit: 0,
    id: uid(),
    questions: [],
    ownerUid: auth.currentUser?.uid || "",
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuizData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(auth.currentUser?.uid);
    setIsLoading(true);
    e.preventDefault();
    setDoc(doc(db, "quizzes", quizData.id), quizData)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        history.push(`/edit/${quizData.id}`);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <form
      className="flex flex-col items-start my-6 text-gray-300 relative top-1/2 left-1/2 -translate-x-1/2  w-1/2 gap-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold my-4">
        <span className="font-normal mr-4">1.</span> The Basics:
      </h2>
      <div className="gap-2 flex flex-col w-full">
        <label className="text-xl font-semibold">Quiz name</label>
        <Input
          type="text"
          placeholder="eg: History Quiz 101"
          className="w-full"
          name="quizName"
          value={quizData.quizName}
          onChange={handleUpdate}
        />
      </div>
      <div className="gap-2 flex flex-col w-full">
        <label className="text-xl font-semibold">Quiz Description</label>
        <textarea
          rows={4}
          placeholder="eg: This is the most historical history quiz of all times ;)"
          className="rounded-lg flex w-auto px-3 py-2 text-xl outline-none placeholder:opacity-30 focus::outline focus:outline-2 focus:outline-gray-600 font-semibold bg-gray-800 bg-opacity-40 backdrop-blur-md text-gray-300"
          name="quizDescription"
          value={quizData.quizDescription}
          onChange={handleUpdate}
        />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="gap-2 flex flex-col w-full">
          <label className="text-xl font-semibold">
            Marks for correct answers
          </label>
          <Input
            type="number"
            placeholder="eg: 5"
            className="w-full"
            name="correctMarks"
            value={quizData.correctMarks}
            onChange={handleUpdate}
          />
        </div>
        <div className="gap-2 flex flex-col w-full">
          <label className="text-xl font-semibold">
            Marks for incorrect answers
          </label>
          <Input
            type="number"
            placeholder="eg: -2"
            className="w-full"
            name="incorrectMarks"
            value={quizData.incorrectMarks}
            onChange={handleUpdate}
          />
        </div>
      </div>
      <div className="gap-2 flex flex-col w-full">
        <label className="text-xl font-semibold">Time Limit (in mins)</label>
        <Input
          type="number"
          placeholder="eg: 20"
          className="w-full"
          name="timeLimit"
          value={quizData.timeLimit}
          onChange={handleUpdate}
        />
      </div>
      <Button
        type="submit"
        className="self-end px-6 bg-violet-800 flex flex-row items-center gap-2"
      >
        {isLoading && (
          <div className="animate-spin">
            <CgSpinner />
          </div>
        )}
        Next
      </Button>
    </form>
  );
};

export default BasicsForm;
