import { Switch } from "..";

import { ModeType } from "@/types";

type Props = {
  mode?: ModeType;
};

const NavBar = ({ mode }: Props) => {
  const bgColor = mode === "creator" ? "bg-lime-800" : "bg-blue-800";

  return (
    <nav className="bg-zinc-900 text-white px-4">
      <div className="h-12 flex items-center justify-between mx-auto w-full md:max-w-allowed md:h-16">
        <span>DEV AI ✨</span>
        <Switch mode={mode} />
      </div>
      <div
        className={`text-center uppercase py-1 text-sm mx-[-16px] ${bgColor}`}
      >
        {mode === "creator" ? "✍️ Creator Mode" : "👀 Reader Mode"}
      </div>
    </nav>
  );
};

export default NavBar;
