import api from "./api";

const AppSettingService = {
  get: () => api.get("/settings"),

  save: (data) => api.post("/settings", data),

  remove: () => api.delete("/settings"),
};

export default AppSettingService;
