import React, { useState } from "react";

interface PriceSortingProps {
    sortOrder: "asc" | "desc" | "";
    onSortChange: (order: "asc" | "desc" | "") => void;
}

const PriceSorter: React.FC<PriceSortingProps> = ({ sortOrder, onSortChange }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

    return (
        <>
            {/* Desktop & Tablet */}
            <div className="hidden md:flex justify-end w-full items-center">
                <label htmlFor="priceSort" className="mr-2 font-semibold text-sm">
                    Sort by Price:
                </label>
                <select
                    id="priceSort"
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value as "asc" | "desc" | "")}
                    className="border border-neutral-300 rounded px-2 py-1 cursor-pointer"
                >
                    <option value="">None</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {/* Mobile */}
            <div className="md:hidden relative">
                <button
                    onClick={toggleMobileMenu}
                    aria-label="Toggle sorting menu"
                    className="p-2 border border-neutral-300 rounded-full bg-white hover:bg-neutral-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                    </svg>
                </button>

                {mobileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-300 rounded shadow-md z-50">
                        <select
                            value={sortOrder}
                            onChange={(e) => {
                                onSortChange(e.target.value as "asc" | "desc" | "");
                                setMobileOpen(false);
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                            className="w-full p-2 bg-neutral-100 cursor-pointer"
                        >
                            <option value="">None</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>
                )}
            </div>
        </>
    );
};

export default PriceSorter;
