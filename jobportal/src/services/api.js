import axios from "axios";

const api = axios.create({
  baseURL: "https://job-portal-backend-1-xh6q.onrender.com"
});

export default api;
