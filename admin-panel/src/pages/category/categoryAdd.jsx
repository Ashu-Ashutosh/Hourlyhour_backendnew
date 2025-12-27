import { useState } from "react";
import { CategoryService } from "../../services/category.service";
import { CommonService } from "../../services/common.service";

export default function CategoryForm({ open, onClose, data, reload }) {
  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [image, setImage] = useState(data?.image || "");
  const [filePreview, setFilePreview] = useState(data?.image || "");
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilePreview(URL.createObjectURL(file)); // preview

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await CommonService.uploadfile(formData);
      const uploadedUrl = res.data.url; // backend returns url

      setImage(uploadedUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const payload = { name, description, image };

    if (data?.id) {
      payload.id = data.id;
      await CategoryService.updateCategory(payload);
    } else {
      await CategoryService.addCategory(payload);
    }

    reload();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {data ? "Edit Category" : "Add Category"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            className="border rounded-md p-2"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border rounded-md p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="border rounded-md p-2"
            onChange={handleFileSelect}
          />

          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              className="w-24 h-24 rounded-md object-cover border"
            />
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-blue-300"
          >
            {loading ? "Uploading..." : data ? "Update" : "Add"}
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-300 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
