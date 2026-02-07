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
 * Includes timeout and better error handling
 */
export const uploadWithProgress = (
  supabaseUrl: string,
  supabaseKey: string,
  bucket: string,
  fileName: string,
  file: File,
  onProgress: (progress: number) => void,
  timeoutMs = 60000 // 60 second timeout
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let lastProgress = 0;
    let progressTimeout: ReturnType<typeof setTimeout>;
    
    // Reset progress timeout on each progress update
    const resetProgressTimeout = () => {
      clearTimeout(progressTimeout);
      progressTimeout = setTimeout(() => {
        xhr.abort();
        reject(new Error("Upload timed out - no progress for 30 seconds"));
      }, 30000); // 30 second stall timeout
    };
    
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        // Only update if progress actually changed
        if (progress > lastProgress) {
          lastProgress = progress;
          onProgress(progress);
          resetProgressTimeout();
        }
      }
    });

    xhr.addEventListener("load", () => {
      clearTimeout(progressTimeout);
      if (xhr.status >= 200 && xhr.status < 300) {
        // Construct public URL
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
        resolve(publicUrl);
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.message || error.error || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener("error", () => {
      clearTimeout(progressTimeout);
      reject(new Error("Network error during upload. Please check your connection."));
    });

    xhr.addEventListener("abort", () => {
      clearTimeout(progressTimeout);
      reject(new Error("Upload was cancelled"));
    });

    xhr.addEventListener("timeout", () => {
      clearTimeout(progressTimeout);
      reject(new Error("Upload timed out"));
    });

    // Set overall timeout
    xhr.timeout = timeoutMs;

    // Open connection to Supabase storage
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${fileName}`;
    xhr.open("POST", uploadUrl);
    
    // Set headers
    xhr.setRequestHeader("Authorization", `Bearer ${supabaseKey}`);
    xhr.setRequestHeader("x-upsert", "true");
    
    // Start progress timeout
    resetProgressTimeout();
    
    // Send the file
    xhr.send(file);
  });
};