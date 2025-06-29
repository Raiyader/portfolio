import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../../models/demos/abyssal-shopping/product";
import { useCart } from "../../../../store/demos/abyssal-shopping/CartContext";

interface Props {
  item: {
    id: string;
    quantity: number;
    size?: string
  };
  product: Product;
  calculateItemTotal: (product: Product, quantity: number) => number;
}

const CartItem: React.FC<Props> = ({ item, product, calculateItemTotal }) => {
  const cart = useCart();

  return (
    <Link
      to={`/demo/abyssal-shopping/products/${item.id}`}
      key={item.id}
      className="flex justify-between border-b py-2 my-2 hover:bg-neutral-200 relative"
    >
      <div>
        <h2 className="font-semibold">{product.title} {item.size && `(${item.size})`}</h2>
        <p className="text-sm font-medium text-neutral-600">Qty: {item.quantity}</p>
        {product.onSale && (
          <p className="text-sm font-medium text-red-500">On Sale: {product.discountPercent}% off</p>
        )}
      </div>

      <div className="text-right flex flex-row items-center">
        <div className="px-4">
          <p className="text-sm font-medium text-neutral-500 line-through">
            {product.onSale && `$${product.price.toFixed(2)}`}
          </p>
          <p className="text-lg font-semibold text-purple-800">
            ${calculateItemTotal(product, item.quantity).toFixed(2)}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            cart.removeFromCart(item.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default CartItem;
