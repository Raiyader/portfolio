import { Link } from "react-router-dom";

const UserRecipes = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={"/demo/fire-kitchen/share"}
        className="inline-block mt-4 px-4 py-2 border-2 bg-firekitchenprimary border-firekitchenprimary text-black font-semibold rounded-lg font-merienda
              hover:bg-[#ff3333] hover:border-[#ff3333] hover:text-neutral-50 transition-colors duration-300"
      >Share Recipe
      </Link>
      <p className="text-center my-60 text-white font-merienda">No recipes found</p>
    </div>
  );
};

export default UserRecipes;
