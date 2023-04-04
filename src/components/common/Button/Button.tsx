import { IButtonProps } from "./types";

const Button: React.FC<IButtonProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <button
      className={
        "p-2 rounded-lg text-lg text-gray-300 font-medium " + className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
