"use client";

import { useState } from 'react';

const ImageUploader = ({ onImageSelected, currentImage }) => {
  const [uploadType, setUploadType] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage || '');

  // Handle upload type selection
  const handleSelectUploadType = (type) => {
    setUploadType(type);
    setError('');
  };

  // Handle URL input change
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setError('');
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');

      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image from device
  const uploadFromDevice = async () => {
    if (!selectedFile) {
      setError('Vui lòng chọn một tệp ảnh');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/upload/from-device`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Lỗi khi tải lên ảnh');
      }

      const data = await response.json();
      onImageSelected(data.url);
      setUploadType(null);
    } catch (err) {
      setError('Lỗi khi tải lên ảnh: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Save image from URL
  const saveFromUrl = async () => {
    if (!imageUrl) {
      setError('Vui lòng nhập URL ảnh');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/upload/from-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Lỗi khi lưu URL ảnh');
      }

      const data = await response.json();
      onImageSelected(data.url);
      setUploadType(null);
    } catch (err) {
      setError('Lỗi khi lưu URL ảnh: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Cancel upload
  const handleCancel = () => {
    setUploadType(null);
    setSelectedFile(null);
    setImageUrl('');
    setError('');
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setPreview('');
    setSelectedFile(null);
    setError('');
    // Notify parent component that image has been removed
    onImageSelected('');
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Ảnh</label>

      {/* Preview image with remove button */}
      {preview && (
        <div className="mb-2 relative">
          <div className="relative inline-block">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-40 h-24 object-cover rounded border"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              onClick={handleRemoveImage}
              title="Xóa ảnh"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Upload type selection */}
      {!uploadType && (
        <div className="flex space-x-2 mb-2">
          <button
            type="button"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => handleSelectUploadType('device')}
          >
            Tải lên từ thiết bị
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={() => handleSelectUploadType('cloud')}
          >
            Tải lên từ cloud
          </button>
        </div>
      )}

      {/* Upload from device form */}
      {uploadType === 'device' && (
        <div className="mb-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              onClick={uploadFromDevice}
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? 'Đang tải...' : 'Tải lên'}
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded border"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Upload from cloud form */}
      {uploadType === 'cloud' && (
        <div className="mb-2">
          <input
            type="text"
            placeholder="Nhập URL ảnh"
            value={imageUrl}
            onChange={handleUrlChange}
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              onClick={saveFromUrl}
              disabled={isUploading || !imageUrl}
            >
              {isUploading ? 'Đang lưu...' : 'Lưu URL'}
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded border"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default ImageUploader;
