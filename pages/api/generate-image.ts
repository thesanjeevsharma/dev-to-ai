export const runtime = "edge";

const MODEL = "stabilityai/stable-diffusion-xl-base-1.0";

export default async function handler(req: Request) {
  if (req.method === "POST") {
    const { text, style } = await req.json();

    const response = await fetch(`${process.env.CF_WORKER_AI}/${MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
      body: JSON.stringify({
        prompt: `Create a cover image for a tech blog post discussing ${text}. The style should be ${style}, reflecting the essence of the article's content.`,
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
