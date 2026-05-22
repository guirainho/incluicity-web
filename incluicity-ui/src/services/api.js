import axios from "axios";

const API_BASE_URL = "http://32.193.203.94:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

api.interceptors.request.use(
  (config) => {
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      config.url?.includes(route)
    );

    if (!isPublicRoute) {
      const token = localStorage.getItem("@IncluiCity:token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@IncluiCity:token");
      localStorage.removeItem("@IncluiCity:user");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;