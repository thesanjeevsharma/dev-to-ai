import type { APIState, Step } from "../types";

export const getStepStatus = (step: Step, apiState: APIState) => {
  if (apiState === null) {
    return "upcoming";
  }

  if (step === apiState) {
    return "current";
  }

  if (step < apiState) {
    return "done";
  }

  return "upcoming";
};

export const sanitizeText = (text: string) => {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/\n/g, " ")
    .replace(/ {2,}/g, "");
};
