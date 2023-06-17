import { requestInstance } from "./axiosConfig";

export const signIn = async (email, password) => {
  try {
    const res = await requestInstance.post("users/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signUp = async (name, email, password) => {
  try {
    const res = await requestInstance.post("users/", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProfile = async (token) => {
  try {
    const res = await requestInstance.get("users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProfile = async (obj, token) => {
  try {
    const res = await requestInstance.patch("users/me", obj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteAccount = async (token) => {
  try {
    const res = await requestInstance.delete("users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const SignOut = async (token) => {
  try {
    const res = await requestInstance.post(
      "users/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const SignOutAll = async (token) => {
  try {
    const res = await requestInstance.post(
      "users/logoutAll",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
