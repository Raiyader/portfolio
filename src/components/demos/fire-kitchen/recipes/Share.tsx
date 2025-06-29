import hero from "../../../../assets/demos/fire-kitchen/sergey-kotenev-unsplash.webp";
import RecipeForm from "./RecipeForm";

const Share = () => {
  return (
    <div className="relative w-full min-h-screen bg-black font-merienda">
      <div
        className="block absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${hero})` }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 drop-shadow-md">
          Share your recipe!
        </h2>
        <div className="w-full max-w-3xl">
          <RecipeForm />
        </div>
      </div>
    </div>
  );
};

export default Share;
