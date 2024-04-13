import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label: string;
};

const Select = ({ value, onChange, options, label }: Props) => {
  return (
    <div className="flex items-center">
      <label className="text-white mr-2">{label}</label>
      <select
        className="block w-32 px-2 py-1 border border-gray-100 rounded"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
