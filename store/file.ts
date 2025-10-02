// stores/file.ts
import { defineStore } from "pinia";
import axios from "axios";

export const useFileStore = defineStore("file", {
  actions: {
    async uploadFile(file: File) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post("/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    },
  },
});
