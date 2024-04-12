// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

const MODEL = "bytedance/stable-diffusion-xl-lightning";

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
        prompt: text,
      }),
    });

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const base64String = buffer.toString("base64");

    return Response.json(
      { image: `data:image/png;base64,${base64String}`, success: true },
      { status: 200 }
    );
  }

  return Response.json(null, { status: 405 });
}
