'use client';

import Image from 'next/image';
import Link from 'next/link';
import {FaEye, FaShoppingCart, FaHeart} from 'react-icons/fa';
import { useState } from 'react';

export default function CurtainCard({curtain}) {
    const {_id, name, price, mainImage, image, category, color} = curtain;
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    
    // Sử dụng mainImage hoặc fallback vào image cho tương thích ngược
    const displayImage = mainImage || image || '/images/curtain-placeholder.jpg';
    
    // Xử lý trường hợp category có thể là object hoặc string
    const categoryName = typeof category === 'object' ? category?.name : category;

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    return (
        <div 
            className="bg-white rounded-lg overflow-hidden shadow-md card-hover"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-64 w-full group">
                <Image
                    src={displayImage}
                    alt={name}
                    fill
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    className={`${isHovered ? 'scale-110' : 'scale-100'}`}
                />
                
                {/* Overlay with actions on hover */}
                <div 
                    className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Link
                        href={`/products/${_id}`}
                        className="bg-white text-primary hover:bg-primary hover:text-white p-3 rounded-full transition-colors duration-300"
                        title="Xem chi tiết"
                    >
                        <FaEye size={18} />
                    </Link>
                    <button
                        className="bg-white text-primary hover:bg-primary hover:text-white p-3 rounded-full transition-colors duration-300"
                        title="Thêm vào giỏ hàng"
                        onClick={(e) => {
                            e.preventDefault();
                            // Thêm logic để thêm vào giỏ hàng ở đây
                        }}
                    >
                        <FaShoppingCart size={18} />
                    </button>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-2 left-2">
                    <span className="bg-white bg-opacity-90 text-primary text-xs px-2 py-1 rounded-md">
                        {categoryName}
                    </span>
                </div>
                
                {/* Favorite button */}
                <button 
                    className="absolute top-2 right-2 z-10 bg-white bg-opacity-90 p-1.5 rounded-full text-gray-700 hover:text-red-500"
                    onClick={toggleFavorite}
                    title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                >
                    <FaHeart size={16} className={isFavorite ? "text-red-500" : ""} />
                </button>
            </div>
            
            <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 truncate">{name}</h3>
                <div className="flex justify-between items-center">
                    <p className="font-bold text-primary">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(price)}
                    </p>
                    <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color?.toLowerCase() }}
                        title={color}
                    />
                </div>
            </div>
        </div>
    );
} 