// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

const MODEL = "meta/llama-2-7b-chat-fp16";

export default async function handler(req: Request) {
  if (req.method === "POST") {
    const { text } = await req.json();

    const response = await fetch(`${process.env.CF_WORKER_AI}/${MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are an experienced tech blog writer. When given an idea for a blog post, you have to generate a rough plan for the article.",
          },
          {
            role: "user",
            content: text,
          },
          {
            role: "assistant",
            content: "Here is a rough plan for your article:",
          },
        ],
      }),
    });

    const data = await response.json();
    return Response.json(data, { status: 200 });
  }

  return Response.json(null, { status: 405 });
}
