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

export const getPositivityText = (positivity: number) => {
  if (positivity > 0.9) {
    return "Highly positive! 😊";
  }
  if (positivity > 0.6) {
    return "Positive! 😄";
  }
  if (positivity > 0.4) {
    return "Neutral 😐";
  }
  if (positivity > 0.1) {
    return "Negative 😕";
  }
};
