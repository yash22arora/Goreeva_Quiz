import { useState } from "react";
import { IOptionProps } from "./types";

const Option: React.FC<IOptionProps> = (props) => {
  const { option, id, selected, onSelect, onEdit, isEdit } = props;
  const seq = ["A", "B", "C", "D"];
  const [optionValue, setOptionValue] = useState(option);

  return (
    <div
      className={`p-3 rounded-md  flex flex-row items-start justify-start text-xl font-semibold ${
        selected && !isEdit
          ? "bg-opacity-100 bg-[rgb(157,114,226)] outline outline-2 outline-gray-300"
          : "bg-opacity-70 bg-[rgb(113,79,168)] outline-none"
      } ${isEdit ? "cursor-text" : "cursor-pointer"}  `}
      onClick={() => {
        if (!isEdit) {
          onSelect && onSelect();
        }
      }}
    >
      <span className=" mr-3">{seq[id]}.</span>
      {isEdit ? (
        <input
          placeholder="Enter option"
          type="text"
          value={optionValue}
          onChange={(e) => {
            setOptionValue(e.target.value);
            onEdit && onEdit(e.target.value);
          }}
          className="w-full bg-transparent px-2"
        />
      ) : (
        <span>{option}</span>
      )}
    </div>
  );
};

export default Option;
