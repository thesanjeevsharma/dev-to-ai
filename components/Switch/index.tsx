import React from "react";
import { useRouter } from "next/router";

import { ModeType } from "@/types";

type Props = {
  mode?: ModeType;
};

const CTA_TEXT = {
  creator: "Switch to Reader Mode",
  reader: "Switch to Creator Mode",
};

const Switch = ({ mode = "reader" }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${mode === "creator" ? "" : "creator"}`);
  };

  return (
    <button className="text-sm border p-1 rounded" onClick={handleClick}>
      {CTA_TEXT[mode]}
    </button>
  );
};

export default Switch;
