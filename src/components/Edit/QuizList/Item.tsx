import { Link } from "react-router-dom";
import { IQuizListItem } from "./types";
import { FiChevronRight } from "react-icons/fi";

const Item: React.FC<IQuizListItem> = (props) => {
  const { quizName, index, id } = props;
  return (
    <Link
      to={`/edit/${id}`}
      className="flex flex-row items-center text-gray-300 justify-between w-full p-2 hover:bg-slate-400 hover:bg-opacity-25"
    >
      <div>
        <span className="text-lg font-medium mr-4">{index}.</span>
        <span className="text-lg font-medium mr-4">{quizName}</span>
      </div>
      <div className=" flex flex-row items-center">
        <span className="text-lg font-medium mr-8">{id}</span>
        <FiChevronRight size={24} />
      </div>
    </Link>
  );
};

export default Item;
