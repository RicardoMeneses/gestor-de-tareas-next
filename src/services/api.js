import axios from "axios";

const api = axios.create({
  credentials: true,
  baseURL: `${process.env.BASE_API_URL}`,
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
  params: {
    token: "ricardo_mm",
  },
});
export default api;

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
  }
);
