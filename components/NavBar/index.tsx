import { Switch } from "..";

import { ModeType } from "@/types";

type Props = {
  mode?: ModeType;
};

const NavBar = ({ mode }: Props) => {
  return (
    <nav className="h-12 bg-zinc-900 text-white flex items-center justify-between px-4">
      <span>DEV AI ✨</span>
      <Switch mode={mode} />
    </nav>
  );
};

export default NavBar;
