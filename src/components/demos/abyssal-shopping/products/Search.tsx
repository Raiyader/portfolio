import React from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const Search: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="w-full px-4 md:px-0">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Products..."
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
    );
};

export default Search;
