import api from "./api";

export const BookingService = {
  getAll: (params) => api.get("/service/all-bookings", { params }),
  getBookingDetail: async (id) => {
    const { data } = await api.get(`/service/booking/${id}`);
    return { data };
  },

  assignProvider: async (id, providerId) => {
    const { data } = await api.post(`/service/booking/${id}/assign-provider`, {
      providerId,
    });
    return data;
  },
  updateStatus: async (id, status) => {
    return await api.put(`/service/booking/${id}/status`, { status });
  },
};
