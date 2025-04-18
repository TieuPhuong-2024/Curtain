'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function AddCurtain() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  const categories = [
    'Blackout', 'Sheer', 'Roller', 'Vertical', 
    'Roman', 'Bamboo', 'Venetian', 'Honeycomb'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.material ||
      !formData.color ||
      !formData.width ||
      !formData.height ||
      !formData.image
    ) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Trong thực tế, sẽ gọi API để thêm sản phẩm
      // const response = await axios.post('/api/curtains', {
      //   ...formData,
      //   price: parseFloat(formData.price),
      //   size: {
      //     width: parseFloat(formData.width),
      //     height: parseFloat(formData.height)
      //   }
      // });
      
      // Giả lập gọi API thành công
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Thêm sản phẩm thành công!');
        router.push('/admin/curtains');
      }, 1000);
      
    } catch (error) {
      console.error('Error adding curtain:', error);
      setIsSubmitting(false);
      alert('Có lỗi xảy ra khi thêm sản phẩm');
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/curtains" 
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Thêm Rèm Cửa Mới</h1>
      </div>
      
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
                URL Hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="image"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.image}
                onChange={handleChange}
                required
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
          
          {/* Submit button */}
          <div className="mt-8 flex justify-end">
            <Link 
              href="/admin/curtains"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Hủy
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 