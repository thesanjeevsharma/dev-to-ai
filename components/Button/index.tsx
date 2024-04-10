import React from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({ children, disabled, onClick }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-white text-zinc-950 rounded py-1"
    >
      {children}
    </button>
  );
};

export default Button;
