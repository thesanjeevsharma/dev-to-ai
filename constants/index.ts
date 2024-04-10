import { Step } from "../types";

export const STEPS = [Step.FETCH, Step.SUMMARIZE, Step.TRANSLATE];

export const STEP_TEXT: {
  [key in Step]: {
    upcoming: string;
    current: string;
    done: string;
  };
} = {
  [Step.FETCH]: {
    upcoming: "Fetch article",
    current: "Fetching article",
    done: "Article fetched",
  },
  [Step.SUMMARIZE]: {
    upcoming: "Summarize article",
    current: "Summarizing article",
    done: "Article summarized",
  },
  [Step.TRANSLATE]: {
    upcoming: "Translate article",
    current: "Translating article",
    done: "Article translated",
  },
};
