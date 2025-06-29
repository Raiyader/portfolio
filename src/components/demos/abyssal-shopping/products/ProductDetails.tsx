import { useEffect, useRef, useState } from "react";
import type { Product } from "../../../../models/demos/abyssal-shopping/product";
import data from "../../../../data/abyssal-shopping/data.json";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "./ImageModal";
import { useCart } from "../../../../store/demos/abyssal-shopping/CartContext";
import LoadingSpinner from "../UI/LoadingSpinner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | undefined>("");
  const [sizeTouched, setSizeTouched] = useState(false);
  const sizeRef = useRef<HTMLSelectElement>(null)
  const cart = useCart()
  const navigate = useNavigate()

  const email = localStorage.getItem("abyssalshopping")
  const user = localStorage.getItem(`abyssalshopping/${email}`);

  useEffect(() => {
    const found = (data as Product[]).find((r) => r.id === id);
    setProduct(found || null);
    setShowSizeSelector(found?.category.slug === "clothing" && found.category.subCategory.slug !== "accessories")
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <LoadingSpinner />
    );
  }

  const selectedCartItem = cart.cartItems.find((item) => item.id === product.id);
  const isClothing = product.category.slug === "clothing" && product.category.subCategory.slug !== "accessories";
  const stockForSelectedSize = isClothing
    ? typeof product.stock === "object"
      ? product.stock[selectedSize || ""] || 0
      : 0
    : typeof product.stock === "number"
      ? product.stock
      : 0;
  const maxAvailable = stockForSelectedSize - (selectedCartItem?.quantity || 0);
  const maxNumberCanBeAdded = 10
  const limit = maxAvailable > maxNumberCanBeAdded ? maxNumberCanBeAdded : maxAvailable

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < limit ? prev + 1 : prev));
  };
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCartHandler = () => {
    if (!user) {
      navigate("/demo/abyssal-shopping/auth?mode=login")
      return
    }
    if (!maxAvailable || quantity < 1) return;

    if (showSizeSelector && !selectedSize) {
      setSizeTouched(true);
      return;
    }

    if (
      showSizeSelector &&
      selectedSize &&
      typeof product.stock === "object" &&
      product.stock[selectedSize] < quantity
    ) {
      alert(`Sorry, ${selectedSize} size is out of stock or not enough in stock.`);
      return;
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);

    if (id && email) {
      cart.updateCart(id, quantity, email, selectedSize);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    if (isNaN(val) || e.target.value === "") return;

    const clamped = Math.max(1, Math.min(limit, val));
    setQuantity(clamped);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
    setSizeTouched(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 min-h-[60vh] text-neutral-900">
      {isModalOpen && <ImageModal imageUrl={product.imageUrl} onClose={() => setIsModalOpen(false)} />}
      <div className="flex flex-col md:flex-row gap-10">

        <div className="md:w-1/2 flex justify-center items-center border-2 border-abyssalternative rounded-lg bg-neutral-100 shadow-md p-4">
          {product.imageUrl ? (
            <img
              src={`/demos/abyssalshopping/productImages/${product.imageUrl}.webp`}
              alt={product.title}
              className="max-h-96 object-contain rounded"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            <div className="w-full h-64 flex justify-center items-center text-neutral-400 bg-neutral-100 rounded">
              No Image Available
            </div>
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold mb-3">{product.title}</h1>

            <p className="text-sm text-neutral-600 mb-6">
              {product.category.name} &gt; {product.category.subCategory.name}
            </p>

            <p className="mb-6 text-neutral-700 whitespace-pre-line">{product.description}</p>

            {showSizeSelector && (
              <div className="mb-6">
                <label htmlFor="size" className="block text-sm font-medium text-neutral-700 mb-1">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  className={`w-full sm:w-48 ${sizeTouched && !selectedSize
                    ? "border-2 border-rose-500"
                    : "border border-neutral-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  defaultValue=""
                  ref={sizeRef}
                  onChange={handleSizeChange}
                >
                  <option value="" disabled>
                    Choose a size
                  </option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            )}

            <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 inline-flex items-center gap-4 mb-6 shadow-sm">
              {product.onSale && product.discountPercent ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-sm line-through text-neutral-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      ${(product.price * (1 - product.discountPercent / 100)).toFixed(2)}
                    </span>
                  </div>
                  <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-lg shadow-sm">
                    -{product.discountPercent}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-neutral-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {maxAvailable <= 10 && maxAvailable > 0 && (
              <p className="text-red-600 font-semibold mb-6">
                Hurry up! Only {maxAvailable} left in stock.
              </p>
            )}

            {typeof product.stock !== "object" && product.stock === 0 && (
              <p className="text-red-600 font-semibold mb-6">
                Out of stock
              </p>
            )}

            {showSizeSelector &&
              selectedSize &&
              typeof product.stock === "object" &&
              product.stock[selectedSize] < quantity && (<p className="text-red-600 font-semibold mb-6">{selectedSize} size is out of stock.</p>)}

            {/* {maxAvailable === 0 && (
              <p className="text-red-600 font-semibold mb-6">
                You've reached the maximum quantity available in stock.
              </p>
            )} */}
          </div>

          {user !== product.addedBy ? (
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex border border-neutral-300 rounded overflow-hidden w-max">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 text-xl text-neutral-600 hover:bg-neutral-100 transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="text"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center text-lg font-medium focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 text-xl text-neutral-600 hover:bg-neutral-100 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={addToCartHandler}
                disabled={isAdded || !(!!stockForSelectedSize) || !(!!maxAvailable)}
                className={`bg-purple-700 text-white font-semibold rounded px-6 py-2 shadow hover:bg-purple-800 transition disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isAdded ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>
          ) : (
            user === product.addedBy && (
              <p className="italic text-neutral-500 mt-4">You are the owner of this product.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
