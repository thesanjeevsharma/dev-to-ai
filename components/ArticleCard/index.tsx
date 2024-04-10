import React from "react";
import Image from "next/image";

import { Article } from "@/types";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  return (
    <div className="flex bg-zinc-900 p-2 rounded">
      {article.cover_image && (
        <Image
          alt={article.title}
          className="rounded mr-2"
          src={article.cover_image}
          width={100}
          height={80}
        />
      )}
      <div>
        <h3 className="text-white text-md">{article.title}</h3>
        <p className="text-white text-xs">{article.user.name}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
