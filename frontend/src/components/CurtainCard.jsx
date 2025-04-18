'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaShoppingCart } from 'react-icons/fa';

export default function CurtainCard({ curtain }) {
  const { _id, name, price, image, category, color } = curtain;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={image || '/images/curtain-placeholder.jpg'}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">{category}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div 
            className="w-4 h-4 rounded-full mr-2" 
            style={{ backgroundColor: color.toLowerCase() }}
            title={color}
          />
          <span className="text-sm text-gray-600">{color}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
          </span>
          
          <div className="flex space-x-2">
            <Link
              href={`/products/${_id}`} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded transition-colors"
              title="Xem chi tiết"
            >
              <FaEye />
            </Link>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded transition-colors"
              title="Thêm vào giỏ hàng"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 