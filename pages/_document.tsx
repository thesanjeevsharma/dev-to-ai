import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>DEV AI ✨</title>
        <meta
          name="description"
          content="Unofficial AI app for DEV readers and creators."
        />
      </Head>
      <body className="min-h-screen bg-zinc-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
