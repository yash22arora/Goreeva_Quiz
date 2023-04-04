import { IInputProps } from "./types";

const Input: React.FC<IInputProps> = (props) => {
  const { type, placeholder, value, onChange, className, ...rest } = props;
  return (
    <input
      className={`rounded-lg flex w-auto px-3 py-2 text-xl outline-none placeholder:opacity-30 focus::outline focus:outline-2 focus:outline-gray-600 font-semibold bg-gray-800 bg-opacity-40 backdrop-blur-md text-gray-300 ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    ></input>
  );
};

export default Input;
