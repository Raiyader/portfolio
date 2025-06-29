import { Link } from "react-router-dom";

const MyProducts = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={"/demo/abyssal-shopping/add-product"}
        className="mt-4 px-6 py-3 text-lg rounded-lg font-medium transition-colors bg-gradient-to-b from-abyssalternative to-[rgb(35,1,45)] hover:from-[rgb(158,2,220)] text-white"
      >Add Product
      </Link>
      <p className="text-center my-60 text-black font-semibold">No products found</p>
    </div>
  );
}

export default MyProducts;
