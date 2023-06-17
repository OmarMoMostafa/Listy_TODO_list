import { requestInstance } from "./axiosConfig";

export const getAllTasks = async (token) => {
  try {
    const res = await requestInstance.get("tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addTask = async (title, token) => {
  try {
    const res = await requestInstance.post(
      "tasks",
      { title },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTask = async (id, token) => {
  try {
    const res = await requestInstance.delete(`tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTask = async (id, newTask, token) => {
  try {
    const res = await requestInstance.patch(`tasks/${id}`, newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
