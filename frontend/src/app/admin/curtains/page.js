'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { getCurtains, deleteCurtain } from '@/lib/api';

export default function CurtainsList() {
  const [curtains, setCurtains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurtains();
  }, []);

  const fetchCurtains = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurtains();
      setCurtains(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching curtains:', error);
      setError('Không thể tải dữ liệu rèm cửa. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteCurtain(id);
        // Cập nhật danh sách sau khi xóa thành công
        fetchCurtains();
        alert('Xóa sản phẩm thành công!');
      } catch (error) {
        console.error('Error deleting curtain:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm');
      }
    }
  };

  const filteredCurtains = curtains.filter(curtain => 
    curtain.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (typeof curtain.category === 'object' ? curtain.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) : curtain.category?.toLowerCase().includes(searchTerm.toLowerCase()))
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
      ) : error ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchCurtains}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Thử lại
          </button>
        </div>
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
                              src={curtain.image || '/placeholder-curtain.jpg'} 
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
                        <div className="text-sm text-gray-900">{typeof curtain.category === 'object' ? curtain.category?.name : curtain.category}</div>
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