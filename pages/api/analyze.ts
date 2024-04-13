export const runtime = "edge";

type Data = {
  result: {
    label: string;
    score: number;
  }[];
  success: boolean;
};

const MODEL = "huggingface/distilbert-sst-2-int8";

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
        text,
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
