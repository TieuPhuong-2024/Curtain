'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function BannerSlider({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!banners || banners.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [banners]);

  // Handle manual navigation
  const goToPrevious = () => {
    if (!banners || banners.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    if (!banners || banners.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // If no banners, show a fallback
  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-curtain.jpg"
            alt="Rèm cửa cao cấp"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="cozy-img w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl cozy-card bg-opacity-90">
            <h1 className="cozy-title mb-4 text-4xl md:text-5xl">Rèm Cửa Cao Cấp Cho Không Gian Của Bạn</h1>
            <p className="text-xl mb-8">
              Khám phá bộ sưu tập rèm cửa đa dạng với chất lượng tốt nhất và giá cả hợp lý
            </p>
            <Link href="/products" className="cozy-btn font-semibold inline-flex items-center">
              Xem sản phẩm <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative h-[70vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={currentBanner.image || "/images/hero-curtain.jpg"}
          alt={currentBanner.title || "Banner"}
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="cozy-img w-full h-full transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-2xl cozy-card bg-opacity-90">
          <h1 className="cozy-title mb-4 text-4xl md:text-5xl">{currentBanner.title}</h1>
          {currentBanner.description && (
            <p className="text-xl mb-8">{currentBanner.description}</p>
          )}
          {currentBanner.link && (
            <Link href={currentBanner.link} className="cozy-btn font-semibold inline-flex items-center">
              Xem thêm <FaArrowRight className="ml-2" />
            </Link>
          )}
        </div>
      </div>
      
      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full z-20 transition-all"
            aria-label="Previous banner"
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full z-20 transition-all"
            aria-label="Next banner"
          >
            <FaArrowRight />
          </button>
        </>
      )}
      
      {/* Indicator dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
