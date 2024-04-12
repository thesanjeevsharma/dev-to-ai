export enum Step {
  FETCH,
  SUMMARIZE,
  TRANSLATE,
  DONE,
}

export type APIState = null | Step;

export type Article = {
  title: string;
  body_html: string;
  cover_image: string;
  user: {
    name: string;
  };
};
