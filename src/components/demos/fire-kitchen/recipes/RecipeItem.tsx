import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

type RecipeItemProps = {
  id: string;
  title: string;
  category: string;
  author: string;
  imageUrl: string;
};

const RecipeItem: React.FC<RecipeItemProps> = ({
  id,
  title,
  category,
  author,
  imageUrl,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`${id}`}
      className="no-underline mx-auto mb-4 block"
      onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
      style={{ breakInside: "avoid", marginBottom: "1rem" }}
    >
      <div className="bg-black rounded-md overflow-hidden shadow-md group transition hover:shadow-lg">
        <div className="w-full overflow-hidden relative">
          {/* Skeleton placeholder */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center text-white text-sm z-10 h-60">
              Loading image...
            </div>
          )}
          <img
            src={`/demos/firekitchen/recipeImages/${imageUrl}.webp`}
            alt={title}
            loading="lazy"
            className={`w-full h-auto object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110 ${isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className="p-4">
          <h5 className="text-lg font-bold text-white">{title}</h5>
          <h6 className="inline-flex bg-[#ff9933] text-black text-xs font-semibold px-2 py-0.5 rounded-full mt-1 items-center justify-center">
            {category}
          </h6>
          <h6 className="text-sm text-neutral-400 mt-1">By {author}</h6>
        </div>
      </div>
    </Link>
  );
};

export default RecipeItem;
