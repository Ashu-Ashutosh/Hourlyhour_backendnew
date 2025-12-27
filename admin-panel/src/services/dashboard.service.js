import api from "./api";
export const adminDashboard = {
  // CREATE
  getDashboard: async (data) => {
    return await api.post("/dashboard/admin/dashboard", data);
  },
};
