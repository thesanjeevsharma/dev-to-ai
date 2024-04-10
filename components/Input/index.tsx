import React from "react";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text";
};

const Input = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) => {
  return (
    <>
      <label className="text-sm text-white mb-4" htmlFor={name}>
        {label}
      </label>
      <input
        className="block w-full px-2 py-1 border border-gray-100 rounded"
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
