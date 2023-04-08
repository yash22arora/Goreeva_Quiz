import { Link } from "react-router-dom";
import { IQuizListItem } from "./types";
import { FiChevronRight } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import customToast from "../../common/CustomToast/CustomToast";

const Item: React.FC<IQuizListItem> = (props) => {
  const { quizName, index, id } = props;
  return (
    <div className="flex flex-row items-center text-gray-300 gap-6 w-full  ">
      <Link
        to={`/edit/${id}`}
        className="rounded-md p-2 pl-4 flex flex-row items-center hover:bg-slate-400 hover:bg-opacity-25 justify-between w-full"
      >
        <div>
          <span className="text-lg font-medium mr-4">{index}.</span>
          <span className="text-lg font-medium mr-4">{quizName}</span>
        </div>
        <div className=" gap-8 flex flex-row items-center">
          <span className="text-lg font-medium">{id}</span>
          <FiChevronRight size={24} />
        </div>
      </Link>
      <div className="p-2 cursor-pointer hover:bg-slate-400 hover:bg-opacity-20 rounded-md">
        <BiCopy
          size={24}
          onClick={() => {
            navigator.clipboard.writeText(id);
            customToast("Quiz ID copied to clipboard");
          }}
          title="Copy quiz ID to clipboard"
        />
      </div>
    </div>
  );
};

export default Item;
