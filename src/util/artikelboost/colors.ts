import type { Article } from "./articles";

type ArtikelColors = {
  [key in Article]: {
    Nominativ: string;
    Akkusativ: string;
    Dativ: string;
    Genitiv: string;
  };
};

export const artikelColors: ArtikelColors = {
  all: {
    Nominativ: "text-neutral-800",
    Akkusativ: "text-neutral-800",
    Dativ: "text-neutral-800",
    Genitiv: "text-neutral-800",
  },
  der: {
    Nominativ: "text-blue-500",
    Akkusativ: "text-blue-300",
    Dativ: "text-blue-700",
    Genitiv: "text-sky-400",
  },
  die: {
    Nominativ: "text-rose-500",
    Akkusativ: "text-rose-300",
    Dativ: "text-rose-700",
    Genitiv: "text-pink-400",
  },
  das: {
    Nominativ: "text-green-600",
    Akkusativ: "text-green-400",
    Dativ: "text-emerald-700",
    Genitiv: "text-lime-500",
  },
  plural: {
    Nominativ: "text-rose-500",
    Akkusativ: "text-rose-500",
    Dativ: "text-rose-500",
    Genitiv: "text-rose-500",
  },
} as const;
