import API_BASE_URL from "@/constants";

export async function getWinePairing(wine) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;
  try {
    const response = await fetch(`${API_BASE_URL}/food/wine/dishes?apiKey=${apiKey}&wine=${wine}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error getting wine pairing", errorData);
      throw new Error(errorData.msg || "Failed to get wine pairing");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Failed to get wine pairing");
  }
}
