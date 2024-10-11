import { useState } from 'react';
import { Upload, Trash2 } from 'lucide-react'; // Assuming you're using lucide-react for icons

export const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Upload a file</label>
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center justify-center border border-gray-300 rounded-lg p-4 w-full">
          {selectedFile ? (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              {selectedFile.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="File preview"
                  className="max-h-24 border border-gray-200 rounded"
                />
              )}
              <button
                className="text-red-500 mt-2 hover:text-red-700 flex items-center"
                onClick={removeFile}
              >
                <Trash2 size={18} className="mr-1" />
                Remove
              </button>
            </div>
          ) : (
            <>
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center space-x-2"
              >
                <Upload size={24} className="text-gray-400" />
                <span className="text-gray-600 text-sm">Click to upload</span>
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};