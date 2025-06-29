import React, { useState } from "react";

interface Category {
    name: string;
    slug: string;
    subCategory?: { name: string; slug: string }[];
}

interface SidebarProps {
    categories: Category[];
    selectedCategory: string;
    onMainCategorySelect: (slug: string) => void;
    onSubCategorySelect: (slug: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({
    categories,
    selectedCategory,
    onMainCategorySelect,
    onSubCategorySelect
}) => {
    const [openCategories, setOpenCategories] = useState<string[]>([]);

    const toggleCategory = (slug: string) => {
        setOpenCategories((prev) =>
            prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug]
        );
    };

    return (
        <aside className="w-auto h-screen">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2 h-auto w-full font-medium overflow-y-auto">
                <li
                    className={`cursor-pointer px-3 py-2 rounded ${selectedCategory === "" ? "bg-purple-200 font-bold" : "hover:bg-purple-100"
                        }`}
                    onClick={() => { onSubCategorySelect(""); toggleCategory(""); }}
                >
                    All
                </li>
                {categories.map((cat) => {
                    const isOpen = openCategories.includes(cat.slug);
                    return (
                        <li key={cat.slug} className="mb-2">
                            <div
                                className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded
                    ${selectedCategory === cat.slug
                                        ? "bg-purple-200 font-bold"
                                        : "hover:bg-purple-100"
                                    }`}
                                onClick={() => {
                                    toggleCategory(cat.slug);
                                    onMainCategorySelect(cat.slug);
                                }}
                            >
                                <span>{cat.name}</span>
                                {cat.subCategory && (
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                            </div>
                            {cat.subCategory && isOpen && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {cat.subCategory.map((sub) => (
                                        <li
                                            key={sub.slug}
                                            onClick={() => onSubCategorySelect(sub.slug)}
                                            className={`cursor-pointer px-2 py-1 rounded text-sm ${selectedCategory === sub.slug
                                                ? "bg-purple-300 font-semibold"
                                                : "hover:bg-purple-100"
                                                }`}
                                        >
                                            {sub.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
