import React from "react";

import { NavBar } from "@/components";

import { ModeType } from "@/types";

type Props = {
  mode: ModeType;
  children: React.ReactNode;
};

const RootLayout = ({ mode, children }: Props) => {
  return (
    <>
      <NavBar mode={mode} />
      <main className="bg-zinc-950 h-full w-full mx-auto md:max-w-allowed">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
