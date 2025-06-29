import { useEffect, useState } from "react";
import type { Product } from "../../../../models/demos/abyssal-shopping/product";
import data from "../../../../data/abyssal-shopping/data.json";
import CartModal from "./CartModal";
import { useCart } from "../../../../store/demos/abyssal-shopping/CartContext";
import { useOrder } from "../../../../store/demos/abyssal-shopping/OrderContext";
import CartItem from "./CartItem";
import NoticeModal from "./NoticeModal";
import { Link } from "react-router-dom";

type CartItemType = {
  id: string;
  quantity: number;
  size?: string
};

const Cart = () => {
  const products = data as Product[];
  const cart = useCart();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { addOrder } = useOrder();

  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const getProduct = (id: string) => products.find(p => p.id === id);

  const calculateItemTotal = (product: Product, quantity: number) => {
    const unitPrice = product.onSale && product.discountPercent
      ? product.price * (1 - product.discountPercent / 100)
      : product.price;
    return unitPrice * quantity;
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = getProduct(item.id);
    if (!product) return sum;
    return sum + calculateItemTotal(product, item.quantity);
  }, 0);

  const handleCheckout = () => {
    const outOfStockItem = cartItems.find((item) => {
      const product = getProduct(item.id);

      if (!product) return true;

      const isClothing =
        product.category.slug === "clothing" &&
        product.category.subCategory.slug !== "accessories";

      if (isClothing) {
        const stockObj = product.stock as Record<string, number>;
        const size = item.size;
        if (!size || typeof stockObj[size] !== "number") return true;
        return stockObj[size] < item.quantity;
      } else {
        const stockNum = product.stock as number;
        return stockNum < item.quantity;
      }
    });

    if (outOfStockItem) {
      setShowWarning(true);
      return;
    }

    const email = localStorage.getItem("abyssalshopping");
    if (!email) return;

    const detailedCartItems = cartItems.map((item) => {
      const product = getProduct(item.id)!;
      const isOnSale = product.onSale && product.discountPercent;
      const originalPrice = product.price;
      const discountPercent = isOnSale ? product.discountPercent : undefined;
      const price = isOnSale
        ? originalPrice * (1 - discountPercent! / 100)
        : originalPrice;

      return {
        id: item.id,
        title: product.title,
        quantity: item.quantity,
        size: item.size,
        price: parseFloat(price.toFixed(2)),
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discountPercent,
      };
    });

    addOrder(detailedCartItems, email);
    cart.clearCart();
    setShowSuccess(true);
  };

  return (
    <div className="max-w-3xl min-h-[50vh] mx-auto my-10 p-6">
      <NoticeModal />
      <h1 className="text-2xl font-bold mb-10 mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-neutral-700 mb-4">Your cart is empty</p>
          <Link to="/demo/abyssal-shopping/products?page=1"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded shadow"
          >
            Back to Shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4 max-h-[60vh] mt-10 overflow-y-auto">
            {cartItems.map((item) => {
              const product = getProduct(item.id);
              if (!product) return null;
              return (
                <CartItem
                  key={`${item.id}${item.size}`}
                  item={item}
                  product={product}
                  calculateItemTotal={calculateItemTotal}
                />
              );
            })}
          </ul>

          <div className="flex justify-between mt-10 border-t pt-4">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg text-purple-700">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}

      <CartModal type="warning" isOpen={showWarning} onClose={() => setShowWarning(false)} title="Stock Error">
        <p className="text-red-600 font-medium">Some items in your cart are out of stock or insufficient quantity available.</p>
      </CartModal>
      <CartModal type="success" isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Success">
        <p className="text-green-600 font-medium">Your order has been successfully placed!</p>
      </CartModal>
    </div>
  );
};

export default Cart;
