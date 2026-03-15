import api from "./api";

const MAX_SIZE_MB = 5;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf"];

export const resumeService = {
  /**
   * 1. Get presigned URL from backend
   */
  getPresign: async (fileName, contentType, fileSize) => {
    const { data } = await api.post("/employee/resume/presign", {
      fileName,
      contentType,
      fileSize,
    });
    return data;
  },

  /**
   * 2. Upload file directly to S3 using presigned URL
   */
  uploadToS3: async (uploadUrl, file) => {
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
  },

  /**
   * 3. Confirm upload with backend (saves resume metadata to profile)
   */
  confirmResume: async (key, url, size, contentType) => {
    const { data } = await api.post("/employee/resume/confirm", {
      key,
      url,
      size,
      contentType,
    });
    return data;
  },

  /**
   * Direct upload to server (when S3 not configured - local dev)
   */
  uploadDirect: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    const { data } = await api.post("/employee/resume/upload", formData, {
      headers: {
        "Content-Type": false,
      },
    });
    return data;
  },

  /**
   * Full upload flow: tries S3 presign first, falls back to direct upload
   */
  uploadResume: async (file) => {
    if (!file) throw new Error("No file selected");
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Only PDF files are allowed");
    }
    if (file.size > MAX_BYTES) {
      throw new Error(`File too large. Max ${MAX_SIZE_MB}MB`);
    }

    try {
      const presignRes = await resumeService.getPresign(
        file.name,
        file.type,
        file.size
      );
      if (presignRes?.useDirectUpload || presignRes?.success === false) {
        throw new Error("USE_DIRECT");
      }
      const { uploadUrl, key, url } = presignRes;

      await resumeService.uploadToS3(uploadUrl, file);

      const result = await resumeService.confirmResume(
        key,
        url,
        file.size,
        file.type
      );
      return result;
    } catch (err) {
      if (
        err.response?.status === 503 ||
        err.response?.data?.useDirectUpload ||
        err.message === "USE_DIRECT"
      ) {
        return resumeService.uploadDirect(file);
      }
      throw err;
    }
  },

  getDownloadUrl: async () => {
    const { data } = await api.get("/employee/resume/download");
    return data;
  },

  deleteResume: async () => {
    const { data } = await api.delete("/employee/resume");
    return data;
  },
};
