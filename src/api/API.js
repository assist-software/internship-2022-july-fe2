import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// get listing
export const getListings = async () => {
  try {
    const response = await axios.get("/listing");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get user
export const getUser = async (id) => {
  try {
    const response = await axios.get("/user/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// deactivate user
export const deactivateUser = async (id) => {
  try {
    const response = await axios.delete("/deactivate/", id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// delete user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete("/user/", id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
