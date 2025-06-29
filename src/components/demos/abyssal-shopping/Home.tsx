import { useState } from "react";
import { useNavigate } from "react-router-dom";
import safety from "/demos/abyssalshopping/safety.png";
import delivery from "/demos/abyssalshopping/fast-delivery.png";
import Carousel from "./UI/Carousel";

const Home = () => {
  const [isAuth,] = useState(false);
  const [color, setColor] = useState("rgb(35, 1, 45)");
  const navigate = useNavigate();

  const colorChangeHandler = () => setColor("rgb(85, 1, 125)");
  const resetStateHandler = () => setColor("rgb(35, 1, 45)");
  const clickHandler = () => navigate("products");

  return (
    <>
      {/* Carousel */}
      <section className="flex items-center justify-center w-full h-[54vh] z-0">
        <Carousel />
      </section>

      {/* Welcome */}
      <section className="flex flex-col items-center justify-center font-roboto text-center w-full h-[46vh]">
        <p className="text-4xl font-roboto mx-4">
          Dive into the{" "}
          <span
            style={{ color: isAuth ? "rgb(85,1,125)" : color }}
            className="font-pacifico"
          >
            Abyss
          </span>
          {" "}of Shopping
        </p>
        <em className="text-sm text-neutral-500 mt-4 mb-2">Explore curated products tailored to your taste.</em>
        {!isAuth && (
          <button
            onMouseOver={colorChangeHandler}
            onMouseOut={resetStateHandler}
            onClick={clickHandler}
            className="text-black text-2xl mt-4 px-4 py-2 border-2 border-abyssalternative rounded-lg hover:bg-abyssalternative hover:text-white cursor-pointer"
          >
            Products
          </button>
        )}
      </section>

      {/* Safety */}
      <section className="flex flex-col items-center justify-center w-full h-[65vh] bg-gradient-to-l from-[#59dbdb] to-[#55017d] text-white z-0">
        <div className="flex items-center justify-center mb-4">
          <img src={safety} alt="Safety" className="w-full h-[20vh]" />
        </div>
        <h3 className="text-2xl pb-16 px-4 mt-4">Secure Shopping, Peace of Mind</h3>
        <p className="text-2xl pb-20 px-4 text-center">
          We protect your data and your deliveries.
        </p>
      </section>

      {/* Discover */}
      <section className="flex flex-col items-center justify-center text-center w-full h-[20vh]">
        <p className="font-[Pacifico] text-[2rem] text-[#55017d]">
          Discover the Abyss
        </p>
      </section>

      {/* Delivery */}
      <section className="flex flex-col xl:flex-row items-center justify-center w-full h-[40vh] bg-gradient-to-r from-[#59dbdb] to-[#55017d] text-white z-0 px-4">
        <div className="flex flex-col items-center xl:items-start justify-center text-center xl:text-left px-4 mb-6 xl:mb-0">
          <h3 className="italic text-xl md:text-2xl pb-4 mt-10 xl:mt-0">Faster, faster, faster...</h3>
          <p className="text-lg sm:text-xl md:text-2xl">Your lightning-fast delivery partner.</p>
        </div>
        <div className="flex items-center justify-center xl:pl-40">
          <img
            src={delivery}
            alt="Delivery"
            className="w-full h-[30vh] xl:h-[40vh]"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
