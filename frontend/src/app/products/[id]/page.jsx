'use client';

import '../../styles/cozy-theme.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCurtainById } from '@/lib/api';
import { FaArrowLeft, FaShoppingCart, FaRuler, FaPalette, FaTag } from 'react-icons/fa';

export default function ProductDetailPage({ params }) {
  const id = params.id;
  
  const [curtain, setCurtain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchCurtain = async () => {
      try {
        setLoading(true);
        const data = await getCurtainById(id);
        setCurtain(data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurtain();
  }, [id]);
  
  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
    // Implement cart functionality
  };
  
  if (loading) {
    return (
      <div className="cozy-bg min-h-screen py-8">
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a67c52]"></div>
        </div>
      </div>
    );
  }
  
  if (error || !curtain) {
    return (
      <div className="cozy-bg min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="cozy-card overflow-hidden">
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              {error || 'Không tìm thấy sản phẩm'}
            </div>
            <div className="mt-4">
              <Link href="/products" className="cozy-link font-medium flex items-center">
                <FaArrowLeft className="mr-2" /> Quay lại danh sách sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const { name, description, price, category, material, color, size, image, inStock } = curtain;
  
  return (
    <div className="cozy-bg min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link href="/products" className="cozy-link font-medium flex items-center">
            <FaArrowLeft className="mr-2" /> Quay lại danh sách sản phẩm
          </Link>
        </div>
        <div className="cozy-card overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full">
                <Image
                  src={image || '/images/curtain-placeholder.jpg'}
                  alt={name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="cozy-img w-full h-full"
                  priority
                />
              </div>
            </div>
            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="cozy-title mb-2">{name}</h1>
                <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                  {category}
                </span>
              </div>
              <div className="text-2xl font-bold text-[#a67c52] mb-4">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
              </div>
              <div className="mb-6">
                <p className="text-[#5b4636] mb-4">{description}</p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaPalette className="text-[#a67c52] mr-2" />
                    <span className="text-[#5b4636]">Màu sắc: </span>
                    <div className="flex items-center ml-2">
                      <div 
                        className="w-5 h-5 rounded-full mr-2 border border-[#e7cba9]" 
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></div>
                      <span>{color}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaTag className="text-[#a67c52] mr-2" />
                    <span className="text-[#5b4636]">Chất liệu: </span>
                    <span className="ml-2">{material}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRuler className="text-[#a67c52] mr-2" />
                    <span className="text-[#5b4636]">Kích thước: </span>
                    <span className="ml-2">{size.width}cm x {size.height}cm</span>
                  </div>
                </div>
              </div>
              {inStock ? (
                <div className="mb-4">
                  <span className="text-green-700 flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Còn hàng
                  </span>
                </div>
              ) : (
                <div className="mb-4">
                  <span className="text-red-600 flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Hết hàng
                  </span>
                </div>
              )}
              {inStock && (
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="cozy-btn px-3 py-1 border-r"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="cozy-btn px-3 py-1 border-l"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="cozy-btn flex items-center"
                  >
                    <FaShoppingCart className="mr-2" /> Thêm vào giỏ hàng
                  </button>
                </div>
              )}
              <div className="cozy-divider pt-4">
                <h3 className="text-lg font-semibold mb-2">Dịch vụ của chúng tôi:</h3>
                <ul className="space-y-1 text-[#5b4636]">
                  <li>✓ Tư vấn, đo đạc tận nhà miễn phí</li>
                  <li>✓ Giao hàng tận nơi</li>
                  <li>✓ Lắp đặt chuyên nghiệp</li>
                  <li>✓ Bảo hành 12 tháng</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}