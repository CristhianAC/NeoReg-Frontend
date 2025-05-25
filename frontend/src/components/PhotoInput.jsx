import { useState, useEffect } from "react";
import { Trash2, Upload } from "lucide-react";
import '../assets/form.css'

export default function PhotoInput({ initialUrl, onFileSelect, onDelete }) {
  const [preview, setPreview] = useState(initialUrl);

  // if parent clears `initialUrl`, clear our preview
  useEffect(() => setPreview(initialUrl), [initialUrl]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    console.log(objectUrl)
    setPreview(objectUrl);
    onFileSelect(file);
  };

  return (
    <div className="relative w-32 h-32 border rounded-lg overflow-hidden group">
      {preview ? (
        <>
          <img src={preview} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
            <label className="cursor-pointer text-white">
              <Upload size={20} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
            <button
              type="button"
              onClick={onDelete}
              className="text-white"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center h-full text-gray-500 cursor-pointer">
          <Upload />
          <span className="text-xs">Subir foto</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      )}
    </div>
  );
}
