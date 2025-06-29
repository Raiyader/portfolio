import React from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discountPercent?: number;
}

interface OrderItemProps {
  order: {
    id: string;
    orders: CartItem[];
    date: string;
  };
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const navigate = useNavigate();

  const calculateTotal = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <li className="border border-abyssalternative p-2 md:p-4 rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="font-semibold">Order ID: <span className="text-abyssalternative">{order.id}</span></p>
        <p className="text-md text-neutral-500">Date: {new Date(order.date).toLocaleString()}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-purple-700">
          ${calculateTotal(order.orders)}
        </p>
        <button
          onClick={() => navigate(`/demo/abyssal-shopping/orders/${order.id}`)}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-2 md:px-4 py-1 rounded"
        >
          View Details
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
