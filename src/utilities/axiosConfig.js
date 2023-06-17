import axios from "axios";
export const requestInstance = axios.create({
  baseURL: "https://task-manager-api-1ona.onrender.com/",
});
