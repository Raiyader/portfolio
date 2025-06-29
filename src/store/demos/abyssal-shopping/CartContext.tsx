import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
    id: string;
    quantity: number;
    size?: string
}

interface CartContextType {
    cartItems: CartItem[];
    totalQuantity: number;
    updateCart: (productId: string, quantity: number, email: string, size?: string) => void;
    clearCart: () => void
    removeFromCart: (id: string) => void
    syncWithLocalStorage: (email: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const email = localStorage.getItem("abyssalshopping");

    useEffect(() => {
        if (email) {
            const user = localStorage.getItem(`abyssalshopping/${email}`);
            const parsed = JSON.parse(user || '{}');
            const validCart = Array.isArray(parsed.cart) ? parsed.cart : [];
            setCartItems(validCart);
        }
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setTotalQuantity(total);
    }, [cartItems]);

    const syncWithLocalStorage = (email: string) => {
        const user = localStorage.getItem(`abyssalshopping/${email}`);
        if (!user) return;

        const parsed = JSON.parse(user);
        const updatedCart: CartItem[] = Array.isArray(parsed.cart) ? parsed.cart : [];
        setCartItems(updatedCart);
    };

    const updateCart = (
        productId: string,
        quantity: number,
        email: string,
        size?: string
    ) => {
        const userData = localStorage.getItem(`abyssalshopping/${email}`);
        if (!userData) return;

        const parsed = JSON.parse(userData);
        const existingCart: CartItem[] = Array.isArray(parsed.cart) ? parsed.cart : [];

        const existingItemIndex = existingCart.findIndex(
            (item) => item.size ? item.id === productId && item.size === size : item.id === productId
        );

        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            existingCart.push({ id: productId, quantity, ...(size && { size }) });
        }

        const updatedData = {
            ...parsed,
            cart: existingCart,
        };

        localStorage.setItem(`abyssalshopping/${email}`, JSON.stringify(updatedData));
        syncWithLocalStorage(email);
    };

    const removeFromCart = (id: string) => {
        if (!email) return;

        const user = localStorage.getItem(`abyssalshopping/${email}`);
        if (!user) return;

        const parsed = JSON.parse(user);
        const existingCart: CartItem[] = Array.isArray(parsed.cart) ? parsed.cart : [];
        const updatedCart = existingCart.filter((item: CartItem) => item.id !== id);

        parsed.cart = updatedCart;
        localStorage.setItem(`abyssalshopping/${email}`, JSON.stringify(parsed));
        syncWithLocalStorage(email)
    }

    const clearCart = () => {
        if (email) {
            const user = localStorage.getItem(`abyssalshopping/${email}`);
            if (!user) return;

            const parsed = JSON.parse(user);
            const updatedUser = {
                ...parsed,
                cart: []
            };

            localStorage.setItem(`abyssalshopping/${email}`, JSON.stringify(updatedUser));
            setCartItems([]);
            setTotalQuantity(0);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, totalQuantity, updateCart, removeFromCart, clearCart, syncWithLocalStorage }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
