'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { favoriteService } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

export default function CurtainCard({ curtain }) {
    const { user } = useAuth();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { _id, name, price, mainImage, image, category, color } = curtain;
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);

    // Sử dụng mainImage hoặc fallback vào image cho tương thích ngược
    const displayImage = mainImage || image || '/images/curtain-placeholder.jpg';
    // Xử lý trường hợp category có thể là object hoặc string
    const categoryName = typeof category === 'object' ? category?.name : category;

    useEffect(() => {
        fetchFavoriteStatus();
        fetchFavoriteCount();
        // eslint-disable-next-line
    }, [_id]);

    // Kiểm tra sản phẩm này đã được user yêu thích chưa
    const fetchFavoriteStatus = async () => {
        try {
            const res = await favoriteService.getFavorites();
            const favoriteIds = res.data.map(f => f._id);
            setIsFavorite(favoriteIds.includes(_id));
        } catch (err) {
            setIsFavorite(false);
        }
    };

    // Lấy số lượt yêu thích
    const fetchFavoriteCount = async () => {
        try {
            const res = await favoriteService.countFavorites(_id);
            setFavoriteCount(res.data.count);
        } catch (err) {
            setFavoriteCount(0);
        }
    };

    // Thêm hoặc xoá khỏi yêu thích
    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            setShowLoginPopup(true);
            return;
        }
        try {
            if (isFavorite) {
                await favoriteService.removeFavorite(_id);
            } else {
                await favoriteService.addFavorite(_id);
            }
            setIsFavorite(!isFavorite);
            fetchFavoriteCount();
        } catch (err) {
            // handle error
        }
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
                        className="bg-white text-gray-700 px-3 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-100 transition-colors duration-300"
                        title="Xem chi tiết"
                    >
                        <FaEye size={18} />
                    </Link>
                    <button
                        className="bg-white text-gray-700 px-3 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-100 transition-colors duration-300"
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
                    className="absolute top-2 right-2 z-10 bg-white bg-opacity-90 p-1.5 rounded-full text-gray-700 hover:text-red-500 flex items-center"
                    onClick={toggleFavorite}
                    title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                >
                    <FaHeart size={16} className={isFavorite ? "text-red-500" : ""} />
                    <span className="ml-1 text-xs">{favoriteCount}</span>
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
            {/* Popup yêu cầu đăng nhập */}
            {showLoginPopup && (
                <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{background: 'white', padding: 24, borderRadius: 12, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                        <div style={{fontSize: 24, marginBottom: 12}}>Bạn cần đăng nhập để sử dụng tính năng Yêu thích!</div>
                        <button onClick={() => window.location.href = '/login'} style={{marginRight: 12, background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 'bold'}}>Đăng nhập</button>
                        <button onClick={() => setShowLoginPopup(false)} style={{background: '#eee', border: 'none', borderRadius: 6, padding: '8px 16px'}}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}
