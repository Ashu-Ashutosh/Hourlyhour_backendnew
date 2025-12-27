import api from "./api";
export const sectionService = {
  async getAllSections() {
    const res = await api.get("/section");
    return res.data;
  },

  async getSectionById(id) {
    const res = await api.get(`/section/${id}`);
    return res.data;
  },

  async createSection(data) {
    const res = await api.post("/section", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  async updateSection(id, data) {
    const res = await api.put(`/section/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  async deleteSection(id) {
    const res = await api.delete(`/section/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },
};
