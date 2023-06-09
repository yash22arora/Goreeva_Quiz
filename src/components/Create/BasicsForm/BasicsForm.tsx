import { useContext, useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { TQuizData } from "./types";
import ShortUniqueId from "short-unique-id";
import { CgSpinner } from "react-icons/cg";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { useHistory } from "react-router-dom";
import customToast from "../../common/CustomToast/CustomToast";
import AuthContext from "../../../store/auth-context";

const BasicsForm: React.FC = () => {
  const uid = new ShortUniqueId({ length: 6 });
  const authCtx = useContext(AuthContext);
  const [quizData, setQuizData] = useState<TQuizData>({
    quizName: "",
    quizDescription: "",
    correctMarks: 0,
    incorrectMarks: 0,
    timeLimit: 0,
    id: uid(),
    questions: [],
    ownerUid: "",
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

  const validateFields = () => {
    if (quizData.quizName === "") {
      customToast("Quiz name cannot be empty");
      return false;
    }
    if (quizData.quizDescription === "") {
      customToast("Quiz description cannot be empty");
      return false;
    }
    if (quizData.correctMarks === 0) {
      customToast("Correct marks cannot be empty");
      return false;
    }
    if (quizData.incorrectMarks === null) {
      customToast("Incorrect marks cannot be empty");
      return false;
    }
    if (quizData.timeLimit === 0) {
      customToast("Time limit must be >= 1 min");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authCtx.user && validateFields()) {
      setIsLoading(true);
      setDoc(doc(db, "quizzes", quizData.id), {
        ...quizData,
        ownerUid: authCtx.user.uid,
      })
        .then((res) => {
          setIsLoading(false);
          customToast("Quiz created successfully");
          history.push(`/edit/${quizData.id}`);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  };

  return (
    <form
      className="flex flex-col items-start my-6 text-gray-300 relative top-1/2 left-1/2 -translate-x-1/2  w-1/2 gap-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold my-4">The Basics:</h2>
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
