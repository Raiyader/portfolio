import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface CartItem {
    id: string;
    title: string,
    quantity: number;
    price: number;
    size?: string,
    originalPrice: number;
    discountPercent?: number;
}

interface OrderItem {
    id: string;
    orders: CartItem[];
    date: string;
}

const OrderDetails: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const [order, setOrder] = useState<OrderItem | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("abyssalshopping");
        if (!email) {
            navigate("/demo/abyssal-shopping/orders");
            return;
        }

        const raw = localStorage.getItem(`abyssalshopping/${email}`);
        if (!raw) {
            navigate("/demo/abyssal-shopping/orders");
            return;
        }

        const parsed = JSON.parse(raw);
        const orders: OrderItem[] = Array.isArray(parsed.orders) ? parsed.orders : [];

        const foundOrder = orders.find(o => o.id === orderId) || null;
        if (!foundOrder) {
            navigate("/demo/abyssal-shopping/orders");
            return;
        }

        setOrder(foundOrder);
    }, [orderId, navigate]);

    if (!order) {
        return <p className="text-center mt-10 text-neutral-600">Loading order details...</p>;
    }

    const totalPrice = order.orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-4 mt-30 mb-10 min-h-[50vh] bg-white rounded shadow-md">
            <header className="flex items-center mb-6 border-b pb-4">
                <div className="w-16 h-16 mr-4 flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 64 64"
                        className="w-full h-full"
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="30"
                            stroke="#55017d"
                            strokeWidth="4"
                            fill="#55017d"
                        />
                        <text
                            x="32"
                            y="37"
                            textAnchor="middle"
                            fontSize="20"
                            fill="#59dbdb"
                            fontWeight="bold"
                            fontFamily="Pacifico"
                            className="underline font-light"
                        >
                            Abyss
                        </text>
                    </svg>
                </div>

                <div>
                    <h1 className="text-2xl font-bold">Order Invoice</h1>
                    <p className="text-neutral-600">Order ID: {order.id}</p>
                    <p className="text-neutral-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
            </header>

            <div className="space-y-4 mt-4">
                {order.orders.map((item) => (
                    <div
                        key={`${item.id}${item.size}`}
                        className="border-b border-neutral-100 p-4 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold text-abyssalternative">{item.title} {item.size && `(${item.size})`}</h3>
                            <div className="text-sm font-normal text-neutral-600 mt-1">
                                Qty: <span className="font-medium">{item.quantity}</span>
                                <span className="mx-2">|</span>
                                Unit: <span className="font-medium">${item.originalPrice.toFixed(2)}</span>
                                {item.discountPercent && (
                                    <span className="ml-1 p-0.5 text-white bg-red-500">{item.discountPercent}% off</span>
                                )}
                            </div>
                        </div>

                        <div className="text-right text-purple-700 font-semibold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}

                <div className="text-right mt-6 font-bold text-xl text-purple-800">
                    Total: ${totalPrice.toFixed(2)}
                </div>
            </div>

        </div>
    );
};

export default OrderDetails;
