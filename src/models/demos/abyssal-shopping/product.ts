type Stock = number | Record<string, number>;

export interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    onSale?: boolean,
    discountPercent?: number,
    stock: Stock,
    category: {
        name: string,
        slug: string,
        subCategory: {
            name: string,
            slug: string
        }
    },
    imageUrl: string,
    addedBy: string,
}
