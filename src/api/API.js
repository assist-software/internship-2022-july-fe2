import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// ---------------------------- FAVORITES ----------------------------------
// add to favorites
export const addFavorite = async (userId, listingId) => {
  try {
    const response = await axios.post("/favorite/addtofavorites", {
      userId,
      listingId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get favorites
export const getFavorite = async (userId) => {
  try {
    const response = await axios.get("/favorite/" + userId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// delete favorites
export const deleteFavorite = async (favoriteId) => {
  try {
    const response = await axios.delete("/favorite/" + favoriteId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//delete favorite by userid and listing id
export const deleteFavoriteById = async (userId, listingId) => {
  try {
    const response = await axios.delete(
      "/favorite/" + userId + "/" + listingId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
// ---------------------------- LISTINGS ----------------------------------
// add listing
export const createListing = async (data) => {
  try {
    const response = await axios.post("/listing/create", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// put listing by id
export const putListingById = async (data) => {
  try {
    const response = await axios.put("/listing/" + data.id, data);
    return response;
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

// delete listing
export const deleteListingById = async (id) => {
  try {
    const response = await axios.delete("/listing/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get sort
export const getListingsSort = async (url) => {
  try {
    const response = await axios.get(`/Listing/sort?${url}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// ---------------------------- MAIL ----------------------------------
// post MAIL
export const postMail = async (data) => {
  try {
    const response = await axios.post("/mail/send", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------- MESSAGES ----------------------------------
// post new message
export const newMessage = async (data) => {
  try {
    const response = await axios.post("/message/new", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get message by listing id
export const getMessage = async (listingId) => {
  try {
    const response = await axios.get("/message/" + listingId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get message by user id
export const getMessageByUserId = async (userId) => {
  try {
    const response = await axios.get("/message/getby/" + userId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// delete all messages by listing id
export const deleteAllMessages = async (listingId) => {
  try {
    const response = await axios.delete("/message/deleteall/" + listingId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//delete one message by message id
export const deleteMessage = async (messageId) => {
  try {
    const response = await axios.delete("/message/" + messageId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------- USER ----------------------------------
// login  authenticate
export const login = async (email, password) => {
  try {
    const response = await axios.post("/user/authenticate", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// register
export const register = async (email, password) => {
  try {
    const response = await axios.post(
      "/user/register?email=" + email + "&password=" + password
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// reset password
export const resetPassword = async (email) => {
  try {
    const response = await axios.post("/user/reset/password?email=" + email); //posibil sa trebuiasca /user/reset/password/
    return response;
  } catch (error) {
    console.log(error);
  }
};

// update user
export const updateUser = async (id, data) => {
  try {
    const response = await axios.put("/user/" + id, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// get user by id
export const getUserById = async (id) => {
  try {
    const response = await axios.get("/user/" + id);
    return response;
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

// get user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get("/user/search/" + email);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get users
export const getUsers = async (data) => {
  try {
    const response = await axios.get("/user", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// update password
export const updatePassword = async (id, data) => {
  try {
    const response = await axios.put("/user/update/password/" + id, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// ------------------------------MOCK-------------------------------------
// add listing    Nu exista
export const addListing = async (data) => {
  try {
    const response = await axios.post("/listing", data);
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

// get user by email and password as JSON
// export const login = async (data) => {
//   try {
//     const response = await axios
//       .post("/User/Authenticate", {
//         email: data.email,
//         password: data.password,
//       })
//       .then((res) => {
//         const token = res.data.token;
//         localStorage.setItem("token", token);
//         if (res.data.role === 0) {
//           localStorage.setItem("role", 0);
//         } else if (res.data.role === 1) {
//           localStorage.setItem("role", 1);
//         }
//       });
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
// user - 0, admin - 1
