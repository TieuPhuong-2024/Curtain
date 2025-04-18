'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

export default function CurtainsList() {
  const [curtains, setCurtains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCurtains();
  }, []);

  const fetchCurtains = async () => {
    try {
      setLoading(true);
      // Trong thực tế, sẽ gọi API backend để lấy dữ liệu
      // const response = await axios.get('/api/curtains');
      // setCurtains(response.data);
      
      // Dữ liệu mẫu
      setCurtains([
        {
          _id: '1',
          name: 'Rèm cửa chống nắng',
          category: 'Blackout',
          price: 850000,
          color: 'Xám',
          inStock: true,
          image: 'https://example.com/curtain1.jpg'
        },
        {
          _id: '2',
          name: 'Rèm Roman cao cấp',
          category: 'Roman',
          price: 1200000,
          color: 'Xanh navy',
          inStock: true,
          image: 'https://example.com/curtain2.jpg'
        },
        {
          _id: '3',
          name: 'Rèm vải mỏng',
          category: 'Sheer',
          price: 550000,
          color: 'Trắng',
          inStock: false,
          image: 'https://example.com/curtain3.jpg'
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching curtains:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        // Trong thực tế sẽ gọi API
        // await axios.delete(`/api/curtains/${id}`);
        setCurtains(curtains.filter(curtain => curtain._id !== id));
        alert('Xóa sản phẩm thành công!');
      } catch (error) {
        console.error('Error deleting curtain:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm');
      }
    }
  };

  const filteredCurtains = curtains.filter(curtain => 
    curtain.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    curtain.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Rèm Cửa</h1>
        <Link 
          href="/admin/curtains/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Thêm Mới
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc danh mục..."
            className="w-full p-3 pl-10 rounded-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Đang tải dữ liệu...</div>
      ) : (
        <>
          {filteredCurtains.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCurtains.map((curtain) => (
                    <tr key={curtain._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={curtain.image} 
                              alt={curtain.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{curtain.name}</div>
                            <div className="text-sm text-gray-500">{curtain.color}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{curtain.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(curtain.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          curtain.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {curtain.inStock ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link 
                            href={`/admin/curtains/edit/${curtain._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(curtain._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
} 