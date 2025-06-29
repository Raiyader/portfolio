import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import RecipeItem from "./RecipeItem";
import type { Recipe } from "../../../../models/demos/fire-kitchen/recipe";
import Categories from "./Categories";
import fireKitchenData from "../../../../data/fire-kitchen/data.json";
import Search from "./Search";

const BATCH_SIZE = 10;

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [columnCount, setColumnCount] = useState(4);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const data = fireKitchenData as Recipe[];
    setAllRecipes(data);
    setDisplayedRecipes(data.slice(0, BATCH_SIZE));
    setIsPending(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500 &&
        hasMore
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedRecipes, hasMore, searchTerm, selectedCategory]);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(1);
      else if (width < 1024) setColumnCount(2);
      else if (width < 1280) setColumnCount(3);
      else setColumnCount(4);
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const applyFilters = (): Recipe[] => {
    let filtered = [...allRecipes];

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchTerm) ||
          r.author.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (r) => r.category.slug === selectedCategory
      );
    }

    return filtered;
  };

  const loadMore = () => {
    setIsPending(true)
    const filtered = applyFilters();
    const currentLength = displayedRecipes.length;
    const nextBatch = filtered.slice(currentLength, currentLength + BATCH_SIZE);
    setDisplayedRecipes((prev) => [...prev, ...nextBatch]);
    if (currentLength + BATCH_SIZE >= filtered.length) {
      setHasMore(false);
    }
    setIsPending(false)
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = allRecipes.filter((r) => {
        const matchesSearch = searchTerm
          ? r.title.toLowerCase().includes(searchTerm) ||
          r.author.toLowerCase().includes(searchTerm)
          : true;
        const matchesCategory = selectedCategory
          ? r.category.slug === selectedCategory
          : true;
        return matchesSearch && matchesCategory;
      });

      setDisplayedRecipes(filtered.slice(0, BATCH_SIZE));
      setHasMore(filtered.length > BATCH_SIZE);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory, allRecipes]);

  const categorySelectHandler = (slug: string | null, name: string | null) => {
    setSelectedCategory(slug);
    setSelectedCategoryName(name);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Categories selectedCategory={selectedCategory} onSelect={categorySelectHandler} />

      {(searchTerm || selectedCategory) && (
        <h1 className="text-2xl text-white font-semibold text-center mb-4 font-merienda">
          {selectedCategory ? selectedCategoryName : "Filtered Recipes"}
        </h1>
      )}

      <Search onSearch={setSearchTerm} />

      <div
        style={{
          columnCount: columnCount,
          columnGap: "1rem",
          rowGap: "2rem",
        }}
        className="max-w-6xl mx-auto"
      >
        {displayedRecipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            category={recipe.category.name}
            author={recipe.author}
            imageUrl={recipe.imageUrl}
          />
        ))}
      </div>
      {isPending && <Loading />}
      {displayedRecipes.length == 0 && <p className="text-center font-merienda font-semibold text-xl text-neutral-300 my-10">Nothing to taste here... yet!</p>}
      {!hasMore && displayedRecipes.length > 0 && (
        <p className="text-center font-merienda text-neutral-300 mt-10">No more recipes</p>
      )}
    </div>
  );
};

export default Recipes;
