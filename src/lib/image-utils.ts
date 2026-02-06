/**
 * Compress and resize image before upload
 */
export const compressImage = (
  file: File,
  maxWidth = 400,
  maxHeight = 400,
  quality = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not create blob"));
              return;
            }
            const compressedFile = new File([blob], file.name, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject(new Error("Could not load image"));
    };
    reader.onerror = () => reject(new Error("Could not read file"));
  });
};

/**
 * Upload file to Supabase storage with progress tracking
 */
export const uploadWithProgress = (
  supabaseUrl: string,
  supabaseKey: string,
  bucket: string,
  fileName: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Construct public URL
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
        resolve(publicUrl);
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.message || "Upload failed"));
        } catch {
          reject(new Error("Upload failed"));
        }
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload aborted"));
    });

    // Open connection to Supabase storage
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${fileName}`;
    xhr.open("POST", uploadUrl);
    
    // Set headers
    xhr.setRequestHeader("Authorization", `Bearer ${supabaseKey}`);
    xhr.setRequestHeader("x-upsert", "true");
    
    // Send the file
    xhr.send(file);
  });
};