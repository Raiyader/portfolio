import { Link } from "react-router-dom";

interface ProductItemProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  onSale?: boolean;
  discountPercent?: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  imageUrl,
  price,
  onSale = false,
  discountPercent = 0,
}) => {
  const discountedPrice = onSale
    ? price * (100 - discountPercent) / 100
    : price;

  return (
    <li className="bg-neutral-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/demo/abyssal-shopping/products/${id}`} className="block">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={`/demos/abyssalshopping/productImages/${imageUrl}.webp`}
            alt={title}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-neutral-800 truncate">{title}</h3>
          <div className="mt-2 flex items-center gap-2">
            {onSale && discountPercent > 0 ? (
              <>
                <span className="text-neutral-400 line-through">${price.toFixed(2)}</span>
                <span className="text-purple-600 font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded">
                  -{discountPercent}%
                </span>
              </>
            ) : (
              <span className="text-neutral-900 font-semibold">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
