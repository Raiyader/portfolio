import React, { useState } from "react";
import Sorter from "./Sorter";
import { artikelColors } from "../../../util/artikelboost/colors";
import type { Article } from "../../../util/artikelboost/articles";
import type { Case } from "../../../util/artikelboost/cases";

type SortProps = { name: string, list: Article[] | Case[], selectedArticle: Article, selectedCase: Case, sortHandler: (article: string) => void }

const SortDropdown: React.FC<SortProps> = ({ name, list, selectedArticle, selectedCase, sortHandler }) => {
  const [open, setOpen] = useState(false);
  const [selected] = useState<string>(name);
  const closeHandler = () => {
    setOpen(false);
  };

  const getColor = () => {
    if (selected == "Article") {
      return artikelColors[selectedArticle]?.["Nominativ"]
    }
    return "text-neutral-800"
  }

  return (
    <div className={`relative group ${name == "Case" && "w-[15rem]"}`}>
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-full flex items-center justify-end md:justify-center gap-2 px-4 py-2 text-neutral-800 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
      >
        Sort by {name}:{" "}
        <span
          className={`font-semibold ${getColor()}`}
        >
          {selected == "Article" ? (selectedArticle == "all" ? "—" : selectedArticle) : (selectedCase == "all" ? "—" : selectedCase)}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`
    absolute  transform
     z-50 bg-neutral-100 rounded-lg shadow-lg overflow-y-auto
    transition-all duration-200 ease-in-out
    ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          } w-full
  `}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {" "}
        <Sorter
          list={list}
          selected={selected == "Article" ? selectedArticle : selectedCase}
          onSort={sortHandler}
          onClicked={closeHandler}
        />
      </div>
    </div>
  );
};

export default SortDropdown;
