import React from "react";
import Image from "next/image";

import { isDesktop } from "@/utils";

import { Article } from "@/types";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  const isD = isDesktop();

  return (
    <div className="flex bg-zinc-900 p-2 rounded">
      {article.cover_image && (
        <Image
          alt={article.title}
          className="rounded mr-2"
          src={article.cover_image}
          width={isD ? 200 : 100}
          height={isD ? 180 : 80}
        />
      )}
      <div>
        <h3 className="text-white text-md md:text-lg">{article.title}</h3>
        <p className="text-white text-xs md:text-md">{article.user.name}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
