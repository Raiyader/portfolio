const Search: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
    return <div className="flex justify-center mb-6">
        <input
            type="search"
            placeholder="Search by title or author"
            onChange={(e) => onSearch(e.target.value.toLowerCase().trim())}
            className="w-full sm:w-3/4 md:w-1/2 px-4 py-2 border-2 border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-firekitchenprimary focus:border-firekitchenprimary font-merienda text-white"
        />
    </div>
}

export default Search