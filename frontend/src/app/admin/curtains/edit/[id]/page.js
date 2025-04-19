'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { getCurtainById, updateCurtain } from '@/lib/api';

export default function EditCurtain({ params }) {
  const router = useRouter();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    material: '',
    color: '',
    width: '',
    height: '',
    image: '',
    inStock: true
  });
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCurtainData();
  }, [id]);

  const fetchCurtainData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const curtainData = await getCurtainById(id);
      
      // Cập nhật state với dữ liệu lấy được
      setFormData({
        name: curtainData.name,
        description: curtainData.description,
        price: curtainData.price,
        category: curtainData.category,
        material: curtainData.material,
        color: curtainData.color,
        width: curtainData.size?.width || '',
        height: curtainData.size?.height || '',
        image: curtainData.image || '',
        inStock: curtainData.inStock
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching curtain data:', error);
      setIsLoading(false);
      setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.material ||
      !formData.color ||
      !formData.width ||
      !formData.height
    ) {
      setError('Vui lòng điền đầy đủ thông tin sản phẩm');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Chuẩn bị dữ liệu gửi đến API
      const curtainData = {
        ...formData,
        price: parseFloat(formData.price),
        size: {
          width: parseFloat(formData.width),
          height: parseFloat(formData.height)
        }
      };
      
      // Gọi API để cập nhật sản phẩm
      await updateCurtain(id, curtainData);
      
      setIsSubmitting(false);
      alert('Cập nhật sản phẩm thành công!');
      router.push('/admin/curtains');
      
    } catch (error) {
      console.error('Error updating curtain:', error);
      setIsSubmitting(false);
      setError('Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại sau.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={fetchCurtainData} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Thử lại
        </button>
        <Link 
          href="/admin/curtains" 
          className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/curtains" 
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Chỉnh Sửa Rèm Cửa</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên sản phẩm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Danh mục */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Giá */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá (VND) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            
            {/* Chất liệu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chất liệu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="material"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.material}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Màu sắc */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Màu sắc <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="color"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Kích thước - Chiều rộng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chiều rộng (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="width"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.width}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            
            {/* Kích thước - Chiều cao */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chiều cao (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="height"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.height}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            
            {/* Hình ảnh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Hình ảnh
              </label>
              <input
                type="text"
                name="image"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            
            {/* Tình trạng */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="inStock"
                id="inStock"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={formData.inStock}
                onChange={handleChange}
              />
              <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                Còn hàng
              </label>
            </div>
          </div>
          
          {/* Mô tả sản phẩm */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Link
              href="/admin/curtains"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Hủy
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 