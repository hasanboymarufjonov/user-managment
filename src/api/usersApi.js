import { api } from "./api";

const baseURL = "https://user-managment-server.vercel.app";

export const getUsersApi = () => {
  const config = {
    method: "GET",
    url: `users`,
  };
  return api(config);
};

export const updateUserStatus = (id, status) => {
  const config = {
    method: "PUT",
    url: `users/${id}`,
    data: {
      status,
    },
  };
  return api(config);
};

export const deleteUserApi = (id) => {
  const config = {
    method: "DELETE",
    url: `users/${id}`,
  };
  return api(config);
};

export const loginApi = (email, password) => {
  const config = {
    method: "POST",
    url: `${baseURL}/signin`,
    data: {
      email,
      password,
    },
  };
  return api(config);
};

export const signUpApi = (name, email, password) => {
  const config = {
    method: "POST",
    url: `${baseURL}/signup`,
    data: {
      name,
      email,
      password,
    },
  };
  return api(config);
};
