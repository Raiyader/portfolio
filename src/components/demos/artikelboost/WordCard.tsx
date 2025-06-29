import React, { useState } from "react";
import { artikelColors } from "../../../util/artikelboost/colors";
import type { Word } from "../../../models/demos/artikelboost/word";

const WordCard: React.FC<{ noun: Word }> = ({ noun }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    article,
    word,
    plural,
    case_name,
    articleByCase,
    wordByCase,
    meaning,
    example,
    example_en,
  } = noun;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 mb-4 w-full md:w-[75%] mx-auto">
        <div
          className="flex justify-between items-center select-none"
          onClick={toggleOpen}
        >
          <div>
            <p className="flex items-center">
              <span
                className={`text-xl font-bold ${artikelColors[article]?.[case_name] || "text-neutral-800"
                  }`}
              >
                {case_name == "Nominativ"
                  ? `${article} ${word}`
                  : `${articleByCase} ${wordByCase}`}
              </span>
              <span className="inline-flex items-center px-2 py-1 ml-2 text-sm italic rounded-full text-neutral-400 bg-neutral-100">
                {case_name}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              <span className="font-medium text-neutral-800">{meaning}</span>
            </p>
          </div>

          <div className="mt-2 sm:mt-0 flex items-center gap-3">
            <button
              onClick={toggleOpen}
              className="text-sm font-medium text-rose-600 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                  }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 text-sm text-neutral-700 space-y-2">
            <p>
              <span className="font-semibold">Plural:</span> {plural}
            </p>
            <p>
              <span className="font-semibold">Example:</span> {example}
            </p>
            <p>
              <span className="italic text-neutral-500">{example_en}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WordCard;
