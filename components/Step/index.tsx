import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";

type Props = {
  status: "done" | "current" | "upcoming";
  text: {
    done: string;
    current: string;
    upcoming: string;
  };
};

const Step = ({ status, text }: Props) => {
  return (
    <div className="flex items-center">
      {status === "done" && <AiFillCheckCircle className="text-green-500" />}
      {status === "current" && (
        <AiFillClockCircle className="text-yellow-500" />
      )}
      {status === "upcoming" && (
        <div className="w-4 h-4 bg-zinc-950 border rounded-full"></div>
      )}
      <div className="ml-2 text-zinc-100 text-sm">{text[status]}</div>
    </div>
  );
};

export default Step;
