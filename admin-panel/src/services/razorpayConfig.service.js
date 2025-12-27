import api from "./api";

const RazorpayConfigService = {
  get: () => api.get("/payment-cred"),

  save: (data) => api.post("/payment-cred", data),

  remove: () => api.delete("/payment-cred"),
};

export default RazorpayConfigService;
