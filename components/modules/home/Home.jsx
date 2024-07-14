import Hero from "./Hero";
import LatestRecipes from "./LatestRecipes";
import RecipeSearch from "./RecipeSearch";
import Wine from "./Wine";

const Home = () => {
  return (
    <div>
      <Hero />
      <RecipeSearch />
      <LatestRecipes />
      <Wine />
    </div>
  );
};

export default Home;
