import { CKOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME } from "@/constants";
import { ResponseProps } from "@/types/types";
import axios from "axios";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const uploadToCloudinary = async (
  fileUrl: string,
  folderName: string
): Promise<ResponseProps> => {
  try {
    if (!fileUrl)
      return { success: false, msg: "No file provided", data: null };
    if (typeof fileUrl === "string") {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUrl,
        type: "image/jpeg",
        name: fileUrl.split("/").pop() || "upload.jpg",
      } as any);
      formData.append("upload_preset", CKOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        msg: "File Uploaded successfully",
        data: response?.data?.secure_url,
      };
    }
    return { success: false, data: null };
  } catch (err: any) {
    console.error("Cloudinary upload failed:", err);
    return { success: false, msg: "Upload failed", data: null };
  }
};

export const getAvatarPath = (file: any, isGroup = false) => {
  if (file && typeof file === "string") {
    return file;
  }
  if (file && typeof file === "object") {
    return file.uri;
  }
  if (isGroup) {
    return require("@/assets/images/defaultGroupAvatar.png");
  }

  return require("@/assets/images/defaultAvatar.png");
};
