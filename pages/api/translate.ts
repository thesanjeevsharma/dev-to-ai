// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

const MODEL = "meta/m2m100-1.2b";

export default async function handler(req: Request) {
  if (req.method === "POST") {
    const { text, language } = await req.json();

    const response = await fetch(`${process.env.CF_WORKER_AI}/${MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
      body: JSON.stringify({
        text,
        source_lang: "en",
        target_lang: language,
      }),
    });

    const data = await response.json();
    return Response.json(data, {
      status: 200,
    });
  }

  return Response.json(null, {
    status: 405,
  });
}
