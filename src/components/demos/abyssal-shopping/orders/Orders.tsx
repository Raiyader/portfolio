import React, { useEffect, useState } from "react";
import Pagination from "../UI/Pagination";
import OrderItem from "./OrderItem";
import { useSearchParams } from "react-router-dom";

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discountPercent?: number;
}

interface Order {
  id: string;
  orders: CartItem[];
  date: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const itemsPerPage = 10;
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const email = localStorage.getItem("abyssalshopping");
    if (!email) return;

    const raw = localStorage.getItem(`abyssalshopping/${email}`);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    const orderData: Order[] = Array.isArray(parsed.orders) ? parsed.orders : [];
    setOrders(orderData);
  }, []);

  const paginatedOrders = orders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto min-h-screen p-4 my-10">
      <h1 className="text-2xl font-bold mb-10">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-neutral-500">You have no orders yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {paginatedOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>

          <div className="mt-10">
            <Pagination totalItems={orders.length} perPage={itemsPerPage} />
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
