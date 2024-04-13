import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { getPositivityText, getStepStatus, sanitizeText } from "@/utils";
import { DEV_TO_URL_REGEX, LANGUAGES, STEP_TEXT } from "@/constants";

import {
  ArticleCard,
  Button,
  Input,
  Select,
  Step,
  SummaryCard,
} from "@/components";
import { RootLayout } from "@/layouts";

import { APIState, Article, Step as StepType } from "@/types";

const Home = () => {
  const [url, setUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [apiState, setApiState] = React.useState<APIState>(null);

  const [article, setArticle] = React.useState<Article | null>(null);
  const [summary, setSummary] = React.useState<string>("");
  const [positivity, setPositivity] = React.useState<number>(0);
  const [translatedSummary, setTranslatedSummary] = React.useState<string>("");

  const [showTranslateOption, setShowTranslateOption] =
    React.useState<boolean>(false);
  const [translateTo, setTranslateTo] = React.useState<string>("hi");

  const resetApp = () => {
    setError("");
    setArticle(null);
    setSummary("");
    setPositivity(0);
    setTranslatedSummary("");
    setApiState(null);
  };

  const handleFetchArticle = async () => {
    try {
      resetApp();

      const isValid = DEV_TO_URL_REGEX.test(url);
      if (!isValid) {
        setError("Invalid URL");
        return;
      }

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

  const handleSummarizeArticle = React.useCallback(
    async (text: string) => {
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

            if (showTranslateOption) {
              setApiState(StepType.TRANSLATE);
            } else {
              setApiState(StepType.DONE);
            }
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
    },
    [showTranslateOption]
  );

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
          // @ts-ignore
          const positivityObj = data.result.find((d) => d.label === "POSITIVE");
          if (positivityObj) {
            setPositivity(positivityObj.score);
          }
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

  const handleTranslation = React.useCallback(
    async (text: string) => {
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            language: translateTo,
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.success) {
            setApiState(StepType.DONE);
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
    },
    [translateTo]
  );

  React.useEffect(() => {
    if (apiState === StepType.SUMMARIZE && article?.body_html) {
      const text = sanitizeText(article!.body_html);
      handleSummarizeArticle(text);
      handleSentimentAnalysis(text);
    }
    if (apiState === StepType.TRANSLATE && summary) {
      handleTranslation(summary);
    }
  }, [
    apiState,
    summary,
    article,
    handleSummarizeArticle,
    handleTranslation,
    handleSentimentAnalysis,
  ]);

  const isInProgress = ![null, StepType.DONE].includes(apiState);

  return (
    <RootLayout mode="reader">
      <div className="p-4 md:py-8">
        <div className="mb-8">
          <div className="mb-4">
            <Input
              label="Article URL"
              placeholder="Paste DEV article URL here"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value.trim())}
            />
            {!!error && <p className="text-red-500">{error}</p>}
          </div>
          {showTranslateOption ? (
            <div className="mb-4 flex items-center justify-between">
              <Select
                label="Translate to"
                value={translateTo}
                onChange={(e) => setTranslateTo(e.target.value)}
                options={LANGUAGES}
              />
              <span
                className="text-white cursor-pointer"
                onClick={() => setShowTranslateOption(false)}
              >
                <AiOutlineCloseCircle />
              </span>
            </div>
          ) : (
            <div
              className="mb-4"
              role="button"
              tabIndex={1}
              onClick={() => {
                setShowTranslateOption(true);
                resetApp();
              }}
            >
              <p className="text-sm text-white underline">
                Summary in your language?
              </p>
            </div>
          )}
          <Button disabled={!url || isInProgress} onClick={handleFetchArticle}>
            {isInProgress ? "Working on it..." : "Summarize"}
          </Button>
        </div>

        {apiState !== null && (
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
              {!!positivity && (
                <div className="mt-2 text-white">
                  Sentiment analysis: {getPositivityText(positivity)}
                </div>
              )}
            </div>

            {showTranslateOption && (
              <div className="mb-4">
                <div className="mb-2">
                  <Step
                    status={getStepStatus(StepType.TRANSLATE, apiState)}
                    text={STEP_TEXT[StepType.TRANSLATE]}
                  />
                </div>
                {!!translatedSummary && (
                  <SummaryCard text={translatedSummary} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default Home;
