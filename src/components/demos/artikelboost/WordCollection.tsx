import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import WordCard from "./WordCard";
import Search from "./Search";
import { categories } from "../../../util/artikelboost/categories";
import { articles, type Article } from "../../../util/artikelboost/articles";
import { cases, type Case } from "../../../util/artikelboost/cases";
import SortDropdown from "./SortDropdown";
import Loading from "./Loading";
import type { Word } from "../../../models/demos/artikelboost/word";
//import artikelBoostData from "../../../data/artikelboost/data.json"

const WordCollection = () => {
  const [collection, setCollection] = useState<Word[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article>("all");
  const [selectedCase, setSelectedCase] = useState<Case>("all");
  const [categoryName, setCategoryName] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(8);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { category } = useParams();

  const lastItemRef = useCallback(
    (node: Element | null) => {
      if (isDataLoading) return;
      if (limit === null) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prev) => prev + limit);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isDataLoading, hasMore, limit]
  );

  useEffect(() => {
    if (offset === 0) return;
    fetchData();
  }, [offset]);

  useEffect(() => {
    setSearch(false);
    setSearchTerm("");
    setSelectedArticle("all");
    setSelectedCase("all");
    if (category !== undefined) {
      const selectedCategory = categories.find((c) => c.slug === category);
      setCategoryName(selectedCategory ? selectedCategory.name : "");
    }
  }, [category]);

  const fetchData = async (isInitial = false) => {
    if (isInitial) {
      setIsLoading(true);
      setIsDataLoading(false);
      setOffset(0);
    } else {
      setIsLoading(false);
      setIsDataLoading(true);
    }

    let data: Word[] = (await import("../../../data/artikelboost/data.json")).default as Word[];

    if (category != undefined) {
      data = data.filter((item) => item.category.slug === category);
    }

    if (selectedArticle !== "all" || selectedCase !== "all") {
      data = data.filter(
        (item) =>
          (selectedArticle === "all" || item.article === selectedArticle) &&
          (selectedCase === "all" || item.case_name === selectedCase)
      );
    }

    if (debouncedSearchTerm.trim()) {
      data = data.filter((item) =>
        item.word.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    const paginated = data.slice(offset, offset + limit);

    if (isInitial) {
      setCollection(paginated);
    } else {
      setCollection((prev) => [...prev, ...paginated]);
    }

    setHasMore(offset + limit < data.length);
    setIsLoading(false);
    setIsDataLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    setOffset(0);
    if (debouncedSearchTerm) {
      fetchData(true);
    } else {
      fetchData(true);
    }
  }, [category, selectedArticle, selectedCase, debouncedSearchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0 && searchTerm.trim()) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }, [searchTerm]);

  const searchHandler = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const sortHandler = (article: string) => {
    if (selectedArticle == article) {
      return;
    }
    setOffset(0);
    setSearch(false);
    setSearchTerm("");
    setSelectedArticle(article);
    setCollection(collection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortCaseHandler = (c: string) => {
    if (selectedCase == c) {
      return;
    }
    setOffset(0);
    setSearch(false);
    setSearchTerm("");
    setSelectedCase(c);
    setCollection(collection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className={`max-w-4xl mx-auto mt-40 min-h-screen/2 w-full px-6 md:py-10`}
    >
      <div
        className={`bg-artikelboostbg flex flex-col md:flex-row items-end sm:flex-wrap border-b border-neutral-200 bg-bground z-10 flex justify-end mb-4 transition`}
      >
        <SortDropdown
          name="Article"
          list={articles}
          selectedArticle={selectedArticle}
          selectedCase={selectedCase}
          sortHandler={sortHandler}
        />
        <SortDropdown
          name="Case"
          list={cases}
          selectedArticle={selectedArticle}
          selectedCase={selectedCase}
          sortHandler={sortCaseHandler}
        />
      </div>
      <div className="flex items-center justify-around mt-8 md:mt-2 mb-6">
        <h1
          className={`mx-auto text-5xl font-bold font-nanum underline text-neutral-800`}
        >
          {search && <span className="font-nanum text-rose-600">Filtered</span>}{" "}
          {category ? categoryName : "Collection"}
        </h1>
      </div>
      <Search value={searchTerm} onSearch={searchHandler} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ul className="space-y-3">
            {collection.map((word, i) => {
              if (i === collection.length - 1) {
                return (
                  <li ref={lastItemRef} key={i}>
                    <WordCard noun={word} />
                  </li>
                );
              }
              return (
                <li key={i}>
                  <WordCard noun={word} />
                </li>
              );
            })}
          </ul>
          {isDataLoading && <Loading />}
          {search && collection.length == 0 && (
            <span className="flex justify-center text-4xl font-bold my-10 font-nanum mx-auto text-rose-600">
              No data found
            </span>
          )}
        </>
      )}
    </section>
  );
};

export default WordCollection;
