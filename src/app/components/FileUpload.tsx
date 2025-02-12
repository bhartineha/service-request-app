import { useState } from "react";
import { uploadData } from "aws-amplify/storage";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      await uploadData({
        data: arrayBuffer,
        path: `picture-submissions/${file.name}`
      });
      console.log("File uploaded successfully:", file.name);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="px-6 py-1 mt-4 border-2 text-gray rounded-md hover:bg-gray-600 hover:text-white">Upload</button>
    </div>
  );
}
