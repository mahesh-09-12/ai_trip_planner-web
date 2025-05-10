import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchPlaceImage = async (place) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query: place, per_page: 1 },
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (response.data.photos.length > 0) {
      return response.data.photos[0].src.original;
    }
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
  }
};
