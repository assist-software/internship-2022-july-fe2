import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// login
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

// forgotpwd
export const forgotpwd = async (email) => {
  try {
    const response = await axios.post("/user/reset/password?email=" + email);
    return response;
  } catch (error) {
    console.log(error);
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
    return response;
  } catch (error) {
    console.error(error);
  }
};

// update user
export const updateUser = async (data) => {
  try {
    const response = await axios.put("/user/" + data.id, data);
    return response;
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
