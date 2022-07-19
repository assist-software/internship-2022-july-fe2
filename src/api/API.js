import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// login
export const login = async (email, password) => {
  try {
    const response = await axios.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get listing
export const getListings = async () => {
  try {
    const response = await axios.get("/listing");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get listing by id
export const getListingById = async (id) => {
  try {
    const response = await axios.get("/listing/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// add listing
export const addListing = async (data) => {
  try {
    const response = await axios.post("/listing", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get user by id
export const getUserById = async (id) => {
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
