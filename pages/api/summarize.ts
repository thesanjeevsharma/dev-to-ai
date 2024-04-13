export const runtime = "edge";

const MODEL = "facebook/bart-large-cnn";

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
        input_text: text,
        max_length: 4000,
      }),
    });

    const data = await response.json();
    return Response.json(data, { status: 200 });
  }

  return Response.json(null, { status: 405 });
}
