import type { Category } from "./categories";

export interface Recipe {
    id: string,
    title: string,
    category: Category,
    imageUrl: string,
    ingredients: string,
    instructions: string,
    author: string,
    authorId: string,
}