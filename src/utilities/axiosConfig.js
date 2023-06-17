import axios from "axios";
export const requestInstance = axios.create({
  baseURL: "http://localhost:8000/",
});
