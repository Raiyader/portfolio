import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./Search";
import ProductItem from "./ProductItem";
import type { Product } from "../../../../models/demos/abyssal-shopping/product";
import AbyssData from "../../../../data/abyssal-shopping/data.json";
import { categories } from "../../../../models/demos/abyssal-shopping/categories";
import Pagination from "../UI/Pagination";
import { useSearchParams } from "react-router-dom";
import PriceSorter from "./PriceSorter";

const Products: React.FC = () => {
  const data = AbyssData as Product[];
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const itemsPerPage = 12;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let filtered = data;

    if (selectedCategory) {
      filtered = filtered.filter((product) => {
        if (product.category.slug === selectedCategory) return true;
        if (product.category.subCategory) {
          return product.category.subCategory?.slug === selectedCategory;
        }
        return false;
      });
    }

    if (debouncedSearchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, debouncedSearchTerm, sortOrder, data]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
  const totalItems = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSubCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setSidebarOpen(false);
  };

  const handleMainCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobil toggle */}
      <div className="md:hidden fixed w-full top-[10vh] p-4 bg-white border-b border-neutral-300 flex justify-between items-center z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex justify-center items-center text-abyssalternative font-bold focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`${sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}`} />
          </svg>
        </button>

        {/* Mobile */}
        <div className="flex items-center w-full">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <PriceSorter sortOrder={sortOrder} onSortChange={setSortOrder} />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed border inset-y-0 left-0 z-40 mt-[18vh] md:mt-0 w-64 bg-white border-r border-neutral-300 p-4 overflow-y-auto
          transform md:translate-x-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0`}
      >
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onMainCategorySelect={handleMainCategorySelect}
          onSubCategorySelect={handleSubCategorySelect}
        />
      </aside>

      {/* Content */}
      <main className="mt-[8vh] md:mt-0 flex-1 p-4">
        <div className="hidden md:flex justify-between mb-4 items-center">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <PriceSorter sortOrder={sortOrder} onSortChange={setSortOrder} />
        </div>

        {paginatedProducts.length === 0 ? (
          <p className="text-center text-neutral-500 mt-10">No products found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                price={product.price}
                onSale={product.onSale}
                discountPercent={product.discountPercent}
              />
            ))}
          </ul>
        )}

        <Pagination totalItems={totalItems} perPage={itemsPerPage} />
      </main>
    </div>
  );
};

export default Products;
