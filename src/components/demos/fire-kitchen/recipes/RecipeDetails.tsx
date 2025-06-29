import type { Recipe } from "../../../../models/demos/fire-kitchen/recipe";
import { useParams, Link } from "react-router-dom";
import data from "../../../../data/fire-kitchen/data.json";
import { useEffect, useState } from "react";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const found = (data as Recipe[]).find((r) => r.id === id);
    setRecipe(found || null);
    window.scrollTo(0, 0);
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center text-white py-20 font-merienda">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-merienda text-white">
      {/* Back */}
      <div className="mb-6">
        <Link
          to="/demo/fire-kitchen/recipes"
          className="text-firekitchenprimary hover:underline text-sm"
        >
          ← Back to all recipes
        </Link>
      </div>

      {/* Image */}
      <div className="rounded-lg overflow-hidden shadow-md mb-6">
        <img
          src={`/demos/firekitchen/recipeImages/${recipe.imageUrl}.webp`}
          alt={recipe.title}
          className="w-full h-64 sm:h-80 object-cover"
        />
      </div>

      {/* Title + Category */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <span className="inline-block bg-[#ff9933] text-black text-xs font-semibold px-3 py-1 rounded-full mt-2 sm:mt-0">
          {recipe.category.name}
        </span>
      </div>

      {/* Author */}
      <p className="text-sm text-neutral-400 mb-8">
        By <span className="text-white font-semibold">{recipe.author}</span>
      </p>

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-neutral-300">
          {recipe.ingredients
            .split("\n")
            .filter((item) => item.trim() !== "")
            .map((line, index) => (
              <li key={index}>{line}</li>
            ))}
        </ul>
      </section>

      {/* Instructions */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <div className="space-y-4 text-neutral-300 whitespace-pre-line">
          {recipe.instructions}
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
