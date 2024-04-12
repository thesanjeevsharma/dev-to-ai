import { Step } from "../types";

export const STEPS = [Step.FETCH, Step.SUMMARIZE, Step.TRANSLATE];

// @ts-ignore
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

export const LANGUAGES = [
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Chinese", value: "zh" },
  { label: "German", value: "de" },
  {
    label: "Russian",
    value: "ru",
  },
];

export const DEV_TO_URL_REGEX =
  /^(https?:\/\/)?(www\.)?dev.to\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+-\w+$/;
