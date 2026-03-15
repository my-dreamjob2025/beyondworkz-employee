import api, { getAccessToken } from "./api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const MAX_SIZE_MB = 10;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const avatarService = {
  getPresign: async (fileName, contentType, fileSize) => {
    const { data } = await api.post("/employee/avatar/presign", {
      fileName,
      contentType,
      fileSize,
    });
    return data;
  },

  uploadToS3: async (uploadUrl, file) => {
    const res = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    if (!res.ok) {
      const err = new Error("Failed to upload image to storage");
      err.response = { status: res.status };
      throw err;
    }
  },

  confirmAvatar: async (key, url, size, contentType) => {
    const { data } = await api.post("/employee/avatar/confirm", {
      key,
      url,
      size,
      contentType,
    });
    return data;
  },

  uploadDirect: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const token = getAccessToken();
    const res = await fetch(`${BASE_URL}/employee/avatar/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    let json;
    try {
      json = await res.json();
    } catch {
      json = {};
    }
    if (!res.ok) {
      const err = new Error(json?.message || "Upload failed");
      err.response = { status: res.status, data: json };
      throw err;
    }
    return json;
  },

  uploadAvatar: async (file) => {
    if (!file) throw new Error("No file selected");
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Only JPEG, PNG, and WebP images are allowed");
    }
    if (file.size > MAX_BYTES) {
      throw new Error(`Image too large. Max ${MAX_SIZE_MB}MB`);
    }

    try {
      const presignRes = await avatarService.getPresign(
        file.name,
        file.type,
        file.size
      );
      if (presignRes?.useDirectUpload || presignRes?.success === false) {
        return avatarService.uploadDirect(file);
      }
      const { uploadUrl, key, url } = presignRes;

      await avatarService.uploadToS3(uploadUrl, file);

      return avatarService.confirmAvatar(
        key,
        url,
        file.size,
        file.type
      );
    } catch (err) {
      if (
        err.response?.status === 503 ||
        err.response?.data?.useDirectUpload ||
        err.message === "USE_DIRECT"
      ) {
        return avatarService.uploadDirect(file);
      }
      throw err;
    }
  },

  /** Update avatar metadata in User model (key, url) - e.g. after upload or profile save */
  updateAvatar: async (avatarData) => {
    const { data } = await api.patch("/employee/avatar", avatarData);
    return data;
  },

  deleteAvatar: async () => {
    const { data } = await api.delete("/employee/avatar");
    return data;
  },
};
