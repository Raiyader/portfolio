export interface Word {
    id: string,
    category: {
        name: string,
        slug: string
    },
    article: "der" | "die" | "das";
    word: string;
    plural: string;
    case_name: "Nominativ" | "Akkusativ" | "Dativ" | "Genitiv";
    articleByCase?: "der" | "die" | "das" | "den" | "dem" | "des";
    wordByCase?: string;
    meaning: string;
    example: string;
    example_en: string;
}