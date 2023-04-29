import * as React from "react";

type Props = {
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<Props> = (props: Props) => {
  const { className, type, children, onClick } = props;

  return (
    <>
      <button
        className={`rounded-full bg-gray-300 px-4 py-2 ${className || ""}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};