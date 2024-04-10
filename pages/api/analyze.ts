// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

type Data = {
  result: {
    label: string;
    score: number;
  }[];
  success: boolean;
};

const MODEL = "huggingface/distilbert-sst-2-int8";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { text } = req.body;

    const response = await fetch(`${process.env.CF_WORKER_AI}/${MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
      body: JSON.stringify({
        text,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  }

  return res.status(405);
}
