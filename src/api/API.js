import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// get listing
export const getListings = async () => {
  try {
    const response = await axios.get("/listings");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
