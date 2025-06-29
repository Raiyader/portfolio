export interface Category {
    name: string;
    slug: string;
    subCategory?: {
        name: string;
        slug: string;
    }[];
}

export const categories: Category[] = [
    {
        name: "Automotive",
        slug: "automotive",
        subCategory: [
            { name: "Car Accessories", slug: "car-accessories" },
            { name: "Car Electronics", slug: "car-electronics" },
            { name: "Tools & Equipment", slug: "tools-equipment" }
        ]
    },
    {
        name: "Beauty & Health",
        slug: "beauty-health",
        subCategory: [
            { name: "Makeup", slug: "makeup" },
            { name: "Personal Care", slug: "personal-care" },
            { name: "Skincare", slug: "skincare" },
            { name: "Supplements", slug: "supplements" }
        ]
    },
    {
        name: "Books & Media",
        slug: "books-media",
        subCategory: [
            { name: "Books", slug: "books" },
            { name: "Magazines", slug: "magazines" },
            { name: "Movies", slug: "movies" },
            { name: "Music", slug: "music" },
        ]
    },
    {
        name: "Clothing",
        slug: "clothing",
        subCategory: [
            { name: "Accessories", slug: "accessories" },
            { name: "Kids", slug: "kids" },
            { name: "Men", slug: "men" },
            { name: "Women", slug: "women" },
        ]
    },
    {
        name: "Electronics",
        slug: "electronics",
        subCategory: [
            { name: "Audio", slug: "audio" },
            { name: "Cameras", slug: "cameras" },
            { name: "Laptops", slug: "laptops" },
            { name: "Mobile Phones", slug: "mobile-phones" },
            { name: "Wearables", slug: "wearables" }
        ]
    },
    {
        name: "Food & Grocery",
        slug: "food-grocery",
        subCategory: [
            { name: "Beverages", slug: "beverages" },
            { name: "Breakfast", slug: "breakfast" },
            { name: "Organic", slug: "organic" },
            { name: "Snacks", slug: "snacks" },
        ]
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        subCategory: [
            { name: "Decor", slug: "decor" },
            { name: "Furniture", slug: "furniture" },
            { name: "Garden", slug: "garden" },
            { name: "Kitchen", slug: "kitchen" },
        ]
    },
    {
        name: "Office Supplies",
        slug: "office-supplies",
        subCategory: [
            { name: "Printers", slug: "printers" },
            { name: "Stationery", slug: "stationery" },
        ]
    },
    {
        name: "Toys & Games",
        slug: "toys-games",
        subCategory: [
            { name: "Action Figures", slug: "action-figures" },
            { name: "Board Games", slug: "board-games" },
            { name: "Educational", slug: "educational" },
            { name: "Puzzles", slug: "puzzles" },
        ]
    },
    {
        name: "Sports & Outdoors",
        slug: "sports-outdoors",
        subCategory: [
            { name: "Camping", slug: "camping" },
            { name: "Cycling", slug: "cycling" },
            { name: "Fitness", slug: "fitness" },
            { name: "Team Sports", slug: "team-sports" }
        ]
    },
];
