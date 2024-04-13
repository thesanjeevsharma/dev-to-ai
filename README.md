# DEV AI

> Unofficial AI app for DEV readers and creators, created as part of [Cloudflare AI x DEV challenge](https://dev.to/challenges/cloudflare).

## Demo

:link: [https://dev-to-ai.pages.dev](https://dev-to-ai.pages.dev)

## Features

The app runs in two modes: `Creator` and `Reader` mode.

1. **Creator mode**: Let's you generate a cover image and action plan for your next article.
   ![Creator mode](https://dev-to-ai.pages.dev/creator-mode.png)

2. **Reader mode**: Let's you summarize and translate an article. It also provides a sentiment analysis of the article.
   ![Reader mode](https://dev-to-ai.pages.dev/reader-mode.png)

## Installation Steps

1. Make sure you have the required env variables set from `.env.example` file.

```
NEXT_APP_DEV_TO_API=https://dev.to/api/articles
CF_WORKER_AI=https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/run/@cf
CF_TOKEN=<TOKEN>
```

Replace `ACCOUNT_ID` and `TOKEN` with the value you get from Cloudflare. Please generate the token with `Workers AI` `read` and `edit` access.

2. Run `npm i`
3. Run `npm run dev` to run the project locally
