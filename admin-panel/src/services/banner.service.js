const API_URL = "/api/banners";
import api from "./api";

const BannerService = {
  getAll: () => api.get("banners"),

  getById: (id) => api.get(`banners/${id}`),

  create: (data) => api.post("/banners", data),

  update: (id, data) => api.put(`banners/${id}`, data),

  remove: (id) => api.delete(`banners/${id}`),
};

export default BannerService;
