import React from "react";

import { getStepStatus, sanitizeText } from "@/utils";
import { STEP_TEXT } from "@/constants";

import {
  ArticleCard,
  Button,
  Input,
  NavBar,
  Step,
  SummaryCard,
} from "@/components";

import { APIState, Article, Step as StepType } from "@/types";

const Home = () => {
  const [url, setUrl] = React.useState<string>("");
  const [apiState, setApiState] = React.useState<APIState>(null);

  const [article, setArticle] = React.useState<Article | null>(null);
  const [summary, setSummary] = React.useState<string>("");
  const [translatedSummary, setTranslatedSummary] = React.useState<string>("");

  const handleFetchArticle = async () => {
    try {
      setApiState(StepType.FETCH);
      const response = await fetch(
        url.replace(
          "https://dev.to",
          process.env.NEXT_APP_DEV_TO_API || "https://dev.to/api/articles"
        )
      );
      if (response.status === 200) {
        const data = await response.json();
        setArticle(data);
        setApiState(StepType.SUMMARIZE);
      } else {
        throw new Error("Failed to fetch article");
      }
    } catch (error) {
      setApiState(null);
      console.error(error);
    }
  };

  const handleSummarizeArticle = React.useCallback(async (text: string) => {
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setSummary(data.result.summary);
          setApiState(StepType.TRANSLATE);
        } else {
          throw new Error("Failed to summarize article");
        }
      } else {
        throw new Error("Failed to summarize article");
      }
    } catch (error) {
      setApiState(null);
      console.error(error);
    }
  }, []);

  const handleSentimentAnalysis = React.useCallback(async (text: string) => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          console.log({ data });
        } else {
          throw new Error("Failed to analyze article");
        }
      } else {
        throw new Error("Failed to analyze article");
      }
    } catch (error) {
      setApiState(null);
      console.error(error);
    }
  }, []);

  const handleTranslation = React.useCallback(async (text: string) => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setTranslatedSummary(data.result.translated_text);
        } else {
          throw new Error("Failed to translate article");
        }
      } else {
        throw new Error("Failed to translate article");
      }
    } catch (error) {
      setApiState(null);
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    if (article?.body_html) {
      const text = sanitizeText(article!.body_html);
      handleSummarizeArticle(text);
      handleSentimentAnalysis(text);
    }
  }, [article, handleSummarizeArticle, handleSentimentAnalysis]);

  React.useEffect(() => {
    if (summary) {
      handleTranslation(summary);
    }
  }, [summary, handleTranslation]);

  const isInProgress = apiState !== null;

  return (
    <>
      <NavBar />
      <main className="bg-zinc-950 p-4 min-h-screen">
        <div className="mb-8">
          <div className="mb-4">
            <Input
              label="Article URL"
              placeholder="https://dev.to/thesanjeevsharma/introduction-to-nginx-213b"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value.trim())}
            />
          </div>
          <Button disabled={isInProgress} onClick={handleFetchArticle}>
            {isInProgress ? "Working on it..." : "Summarize"}
          </Button>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <div className="mb-2">
              <Step
                status={getStepStatus(StepType.FETCH, apiState)}
                text={STEP_TEXT[StepType.FETCH]}
              />
            </div>
            {!!article && <ArticleCard article={article} />}
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <Step
                status={getStepStatus(StepType.SUMMARIZE, apiState)}
                text={STEP_TEXT[StepType.SUMMARIZE]}
              />
            </div>
            {!!summary && <SummaryCard text={summary} />}
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <Step
                status={getStepStatus(StepType.TRANSLATE, apiState)}
                text={STEP_TEXT[StepType.TRANSLATE]}
              />
            </div>
            {!!translatedSummary && <SummaryCard text={translatedSummary} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
