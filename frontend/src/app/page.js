'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { getCurtains } from '@/lib/api';
import CurtainCard from '@/components/CurtainCard';

export default function Home() {
  const [featuredCurtains, setFeaturedCurtains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await getCurtains();
        setFeaturedCurtains(data.slice(0, 3)); // Lấy 3 sản phẩm đầu tiên
      } catch (err) {
        setError('Không thể tải sản phẩm nổi bật.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-curtain.jpg"
            alt="Rèm cửa cao cấp"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rèm Cửa Cao Cấp Cho Không Gian Của Bạn</h1>
            <p className="text-xl mb-8">
              Khám phá bộ sưu tập rèm cửa đa dạng với chất lượng tốt nhất và giá cả hợp lý
            </p>
            <Link href="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold inline-flex items-center">
              Xem sản phẩm <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Danh Mục Sản Phẩm</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/blackout-curtains.jpg"
                  alt="Rèm cửa chống nắng"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Rèm Chống Nắng</h3>
                <p className="text-gray-600 mb-4">Bảo vệ không gian của bạn khỏi ánh nắng gay gắt và tia UV có hại</p>
                <Link href="/products?category=Blackout" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                  Xem thêm <FaArrowRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/sheer-curtains.jpg"
                  alt="Rèm voan"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Rèm Voan</h3>
                <p className="text-gray-600 mb-4">Tạo không gian nhẹ nhàng, thoáng đãng và đầy ánh sáng tự nhiên</p>
                <Link href="/products?category=Sheer" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                  Xem thêm <FaArrowRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/roller-curtains.jpg"
                  alt="Rèm cuốn"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Rèm Cuốn</h3>
                <p className="text-gray-600 mb-4">Giải pháp hiện đại, tiết kiệm không gian cho mọi căn phòng</p>
                <Link href="/products?category=Roller" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                  Xem thêm <FaArrowRight className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tại Sao Chọn Chúng Tôi?</h2>
              <p className="text-gray-600 mb-8">
                Với hơn 10 năm kinh nghiệm, chúng tôi tự hào cung cấp các sản phẩm rèm cửa 
                chất lượng cao, được thiết kế để nâng tầm không gian sống của bạn.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3" />
                  <span>Chất liệu cao cấp, bền đẹp theo thời gian</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3" />
                  <span>Đa dạng mẫu mã, phù hợp với mọi phong cách</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3" />
                  <span>Dịch vụ tư vấn, đo đạc và lắp đặt tận nhà</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3" />
                  <span>Bảo hành dài hạn và hỗ trợ sau bán hàng</span>
                </li>
              </ul>
            </div>
            
            <div className="relative h-96">
              <Image
                src="/images/living-room-curtains.jpg"
                alt="Rèm cửa phòng khách"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Sản phẩm nổi bật */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sản Phẩm Nổi Bật</h2>
          {loading ? (
            <div className="text-center text-gray-500">Đang tải...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCurtains.map(curtain => (
                <CurtainCard key={curtain._id} curtain={curtain} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Làm Mới Không Gian Của Bạn?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold">
              Liên hệ ngay
            </Link>
            <Link href="/products" className="bg-transparent hover:bg-indigo-600 border-2 border-white px-6 py-3 rounded-md font-semibold">
              Khám phá sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
