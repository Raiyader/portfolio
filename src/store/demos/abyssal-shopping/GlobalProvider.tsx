import React from "react";
import { CartProvider } from "./CartContext";
import { OrderProvider } from "./OrderContext";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <CartProvider>
            <OrderProvider>
                {children}
            </OrderProvider>
        </CartProvider>
    );
};
