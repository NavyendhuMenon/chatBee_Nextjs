import axios from "axios";

const axiosJSON = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  // no explicit content-type header here
});

export { axiosJSON, axiosForm };
