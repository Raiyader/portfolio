import burger from "../../../assets/demos/fire-kitchen/carousel/burger-with-melted-cheese.webp";
import pizza from "../../../assets/demos/fire-kitchen/carousel/pizza-salami-close-up.webp";
import pancakes from "../../../assets/demos/fire-kitchen/carousel/pouring-honey-on-pancakes.webp";
import baklava from "../../../assets/demos/fire-kitchen/carousel/traditional-turkish-baklava-dessert-detail.webp";
import chicken from "../../../assets/demos/fire-kitchen/carousel/close-up-of-butter-chicken-indian-dish.webp";
import noodle from "../../../assets/demos/fire-kitchen/carousel/plate-of-noodles-with-shrimps.webp";
import Carousel from "./UI/Carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateRecipesHandler = () => {
    window.scrollTo(0, 0);
    navigate("recipes");
  };

  const navigateShareHandler = () => {
    window.scrollTo(0, 0);
    navigate("share");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">

      <div className="flex flex-col md:flex-row">
        <Carousel source1={burger} source2={pizza} source3={pancakes} />
        <div className="flex flex-col justify-center items-center bg-black text-white px-6 py-10 md:w-1/2 w-full">
          <p
            className="text-center text-2xl md:text-3xl font-merienda w-3/4"
          >
            Craving something new? <br /> Discover fresh recipes!
          </p>
          <button
            onClick={navigateRecipesHandler}
            className="mt-5 px-4 py-2 border-2 border-firekitchenprimary text-firekitchenprimary font-semibold hover:bg-firekitchenprimary hover:text-black rounded-md transition"
          >
            Explore Recipes
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:flex-row-reverse">
        <Carousel source1={baklava} source2={chicken} source3={noodle} />
        <div className="flex flex-col justify-center items-center bg-black text-white px-6 py-10 md:w-1/2 w-full">
          <p
            className="text-center text-2xl md:text-3xl font-merienda w-3/4"
          >
            From your kitchen to the world!
          </p>
          <button
            onClick={navigateShareHandler}
            className="mt-5 px-4 py-2 border-2 border-firekitchenprimary text-firekitchenprimary font-semibold hover:bg-firekitchenprimary hover:text-black rounded-md transition"
          >
            Share Your Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
