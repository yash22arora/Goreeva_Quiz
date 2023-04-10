import { IProgressBarProps } from "./types";

const ProgressBar: React.FC<IProgressBarProps> = (props) => {
  const { total, completed } = props;
  const percentage = (completed / total) * 100;
  return (
    <div className="bg-gray-400 rounded-full h-2 w-full">
      <div
        className="bg-violet-500 rounded-full h-2 transition-none duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
