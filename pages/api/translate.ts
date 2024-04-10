// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: {
    summary: string;
  };
  success: boolean;
};

const MODEL = "meta/m2m100-1.2b";

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
        source_lang: "en",
        target_lang: "es",
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  }

  return res.status(405);
}
