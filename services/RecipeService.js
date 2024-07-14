import API_BASE_URL from "@/constants";

export async function getFoodRecipe(food) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;
  try {
    const response = await fetch(
      `${API_BASE_URL}/recipes/complexSearch?apiKey=${apiKey}&query=${food}&fillIngredients=${true}&addRecipeInformation=${true}&addRecipeInstructions=${true}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error getting recipe", errorData);
      throw new Error(errorData.msg || "Failed to get recipe");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Failed to get recipe");
  }
}

export async function getRandomRecipe() {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/random?apiKey=${apiKey}&number=${1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error getting recipe", errorData);
      throw new Error(errorData.msg || "Failed to get recipe");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Failed to get recipe");
  }
}
