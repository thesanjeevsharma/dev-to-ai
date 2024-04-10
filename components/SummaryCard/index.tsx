import React from "react";

type Props = {
  text: string;
};

const SummaryCard = ({ text }: Props) => {
  return (
    <div className="flex bg-zinc-900 p-2 rounded">
      <p className="text-white text-md">{text}</p>
    </div>
  );
};

export default SummaryCard;
