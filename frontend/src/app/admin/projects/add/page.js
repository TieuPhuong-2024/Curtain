'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ImageUploader from '@/components/ImageUploader';

export default function AddProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        type: '',
        images: [],
        videos: []
    });
    
    const [videoUrl, setVideoUrl] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleAddVideo = () => {
        if (!videoUrl) return;
        
        setFormData({
            ...formData,
            videos: [...formData.videos, videoUrl]
        });
        setVideoUrl('');
    };
    
    const handleRemoveVideo = (index) => {
        const newVideos = [...formData.videos];
        newVideos.splice(index, 1);
        setFormData({ ...formData, videos: newVideos });
    };
    
    const handleImageUpload = (uploadedImages) => {
        setFormData({
            ...formData,
            images: [...formData.images, ...uploadedImages]
        });
    };
    
    const handleRemoveImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.images.length === 0) {
            toast.error('Vui lòng thêm ít nhất một hình ảnh!');
            return;
        }
        
        try {
            setLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, formData);
            toast.success('Thêm công trình thành công!');
            router.push('/admin/projects');
        } catch (error) {
            console.error('Error adding project:', error);
            toast.error('Lỗi khi thêm công trình!');
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Thêm Công Trình Mới</h1>
                <Link href="/admin/projects" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <FaArrowLeft className="mr-2" /> Quay lại
                </Link>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên công trình <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên công trình"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Địa điểm <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập địa điểm công trình"
                        />
                    </div>
                </div>
                
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại công trình <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ví dụ: Biệt thự, Chung cư, Văn phòng, Khách sạn..."
                    />
                </div>
                
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mô tả chi tiết về công trình"
                        rows={4}
                    />
                </div>
                
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hình ảnh <span className="text-red-500">*</span>
                    </label>
                    <ImageUploader onUpload={handleImageUpload} />
                    
                    {/* Display uploaded images */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((img, index) => (
                            <div key={index} className="relative group rounded-md overflow-hidden border">
                                <img
                                    src={img}
                                    alt={`Project image ${index + 1}`}
                                    className="w-full h-32 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video (Youtube embed URL)
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://www.youtube.com/embed/..."
                        />
                        <button
                            type="button"
                            onClick={handleAddVideo}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            <FaPlus />
                        </button>
                    </div>
                    
                    {/* Display added videos */}
                    <div className="mt-4 space-y-2">
                        {formData.videos.map((video, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <div className="truncate flex-1">{video}</div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveVideo(index)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-2 rounded-md flex items-center hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                                Đang xử lý...
                            </>
                        ) : (
                            <>
                                <FaSave className="mr-2" /> Lưu công trình
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}