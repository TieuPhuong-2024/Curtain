'use client';

import Image from 'next/image';
import Link from 'next/link';
import {FaEye, FaShoppingCart, FaHeart} from 'react-icons/fa';
import { useState } from 'react';

export default function CurtainCard({curtain}) {
    const {_id, name, price, image, category, color} = curtain;
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    
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
                    src={image || '/images/curtain-placeholder.jpg'}
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
                <div className="absolute top-2 left-2 z-10">
                    <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {categoryName}
                    </span>
                </div>
                
                {/* Favorite button */}
                <button 
                    className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
                    onClick={toggleFavorite}
                    title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                >
                    <FaHeart 
                        size={16} 
                        className={isFavorite ? "text-error" : "text-gray-400"} 
                    />
                </button>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-text-primary hover:text-primary transition-colors duration-300 truncate">
                    <Link href={`/products/${_id}`}>{name}</Link>
                </h3>

                <div className="flex items-center mb-3 opacity-80">
                    <div
                        className="w-4 h-4 rounded-full mr-2 border border-gray-200"
                        style={{backgroundColor: color?.toLowerCase() || '#FFF'}}
                        title={color}
                    />
                    <span className="text-sm text-text-secondary">{color || 'Không màu'}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gradient">
                        {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price)}
                    </span>

                    <button
                        className="btn-primary text-sm py-2 px-4 inline-flex items-center"
                    >
                        <FaShoppingCart className="mr-2" /> Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
} 