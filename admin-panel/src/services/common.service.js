import api from "./api";

export const CommonService = {
  uploadfile: async (formData) => {
    return await api.post("/upload-media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
