import type React from 'react';
import { categories } from '../../../../models/demos/fire-kitchen/categories';

type Props = {
    selectedCategory: string | null;
    onSelect: (slug: string | null, name: string | null) => void;
};

const Categories: React.FC<Props> = ({ selectedCategory, onSelect }) => {
    const clickHandler = (slug: string, name: string) => {
        if (selectedCategory === slug) {
            onSelect(null, null);
        } else {
            onSelect(slug, name);
        }
    };

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
            {categories.map(category => (
                <button
                    key={category.slug}
                    onClick={() => clickHandler(category.slug, category.name)}
                    className={`text-center font-bold rounded-lg px-3 py-2 font-merienda transition-all cursor-pointer hover:bg-firekitchenprimary hover:text-black
            ${selectedCategory === category.slug
                            ? 'bg-firekitchenprimary text-black'
                            : 'bg-black text-white'}
          `}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default Categories;
