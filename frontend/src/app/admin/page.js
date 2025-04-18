'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWindowMaximize, FaShoppingCart } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCurtains: 0,
    lowStock: 0
  });

  useEffect(() => {
    // Giả lập dữ liệu thống kê
    // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu thống kê thực tế
    setStats({
      totalCurtains: 24,
      lowStock: 3
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bảng Điều Khiển</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FaWindowMaximize className="text-blue-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Tổng Số Rèm</p>
              <h3 className="text-2xl font-bold">{stats.totalCurtains}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FaShoppingCart className="text-yellow-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Hàng Sắp Hết</p>
              <h3 className="text-2xl font-bold">{stats.lowStock}</h3>
            </div>
          </div>
        </div>
        
        <Link href="/admin/curtains" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50">
          <div className="flex justify-center items-center h-full">
            <span className="text-blue-600 font-medium">Quản Lý Sản Phẩm →</span>
          </div>
        </Link>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Thao Tác Nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/curtains/add" className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold text-lg">+</span>
              </div>
              <div>
                <h3 className="font-medium">Thêm Sản Phẩm Mới</h3>
                <p className="text-sm text-gray-500">Tạo mẫu rèm mới trong hệ thống</p>
              </div>
            </div>
          </Link>
          
          <Link href="/admin/curtains" className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-lg">↻</span>
              </div>
              <div>
                <h3 className="font-medium">Cập Nhật Kho</h3>
                <p className="text-sm text-gray-500">Quản lý tình trạng sản phẩm</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 