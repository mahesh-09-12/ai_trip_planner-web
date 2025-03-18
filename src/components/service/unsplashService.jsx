import axios from "axios";

const UNSPLASH_ACCESS_KEY = "_a0P89oEk9kgTMmlqCvRhw7UlkwKSfNCETkm8FPP_8I";

export const fetchPlaceImage = async (place) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: place, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    } else {
      return "https://via.placeholder.com/400";
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/400";
  }
};
