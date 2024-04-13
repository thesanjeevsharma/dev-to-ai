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
              "You are an experienced tech blog writer. When given an idea for a blog post, you have to generate a rough plan for the article in not more than 200 words. It should also list a few topics to cover. Output should be in bullet points or in an easy-to-read format.",
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    });

    const data = await response.json();
    return Response.json(data, { status: 200 });
  }

  return Response.json(null, { status: 405 });
}
