import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
    id: string;
    quantity: number;
    price: number;
    originalPrice: number;
    discountPercent?: number;
}

interface OrderItem {
    id: string;
    orders: CartItem[];
    date: string;
    total: number;
}

interface OrderContextType {
    orders: OrderItem[];
    addOrder: (cartItems: CartItem[], email: string) => void;
    getOrderById: (id: string) => OrderItem | undefined;
    syncOrders: (email: string) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const email = localStorage.getItem("abyssalshopping");

    useEffect(() => {
        if (email) syncOrders(email);
    }, [email]);

    const syncOrders = (email: string) => {
        const user = localStorage.getItem(`abyssalshopping/${email}`);
        if (!user) return;
        const parsed = JSON.parse(user);
        const validOrders: OrderItem[] = Array.isArray(parsed.orders) ? parsed.orders : [];
        setOrders(validOrders);
    };

    const addOrder = (cartItems: CartItem[], email: string) => {
        const user = localStorage.getItem(`abyssalshopping/${email}`);
        if (!user) return;

        const parsed = JSON.parse(user);
        const oldOrders: OrderItem[] = Array.isArray(parsed.orders) ? parsed.orders : [];

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const generateId = (): string => {
            return (
                Date.now().toString(36) +
                Math.random().toString(36).substring(2, 9)
            );
        };

        const orderId = generateId()

        const newOrder: OrderItem = {
            id: orderId,
            orders: cartItems,
            date: new Date().toISOString(),
            total
        };

        const updatedOrders = [newOrder, ...oldOrders];
        const updatedUser = { ...parsed, orders: updatedOrders };

        localStorage.setItem(`abyssalshopping/${email}`, JSON.stringify(updatedUser));
        setOrders(updatedOrders);
        syncOrders(email)
    };

    const getOrderById = (id: string): OrderItem | undefined => {
        return orders.find((order) => order.id === id);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, getOrderById, syncOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error("useOrder must be used within OrderProvider");
    return ctx;
};
