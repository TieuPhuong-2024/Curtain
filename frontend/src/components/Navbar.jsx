'use client';

import Link from 'next/link';
import {useState, useEffect} from 'react';
import {FaBars, FaHome, FaInfoCircle, FaPhone, FaShoppingCart, FaTimes, FaSearch, FaUser, FaHeart, FaSignInAlt, FaSignOutAlt, FaBlog} from 'react-icons/fa';
import { useAuth } from '@/lib/AuthContext';

// Action Button Component
const ActionButton = ({href, icon, label, badge, onClick}) => {
    return (
        <div className="relative">
            {onClick ? (
                <button 
                    onClick={onClick}
                    className="flex flex-col items-center justify-center p-2 text-text-primary hover:text-primary transition-colors"
                >
                    <span className="text-xl">{icon}</span>
                    <span className="text-xs mt-1 whitespace-nowrap">{label}</span>
                    {badge > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {badge}
                        </span>
                    )}
                </button>
            ) : (
                <Link href={href} className="flex flex-col items-center justify-center p-2 text-text-primary hover:text-primary transition-colors">
                    <span className="text-xl">{icon}</span>
                    <span className="text-xs mt-1 whitespace-nowrap">{label}</span>
                    {badge > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {badge}
                        </span>
                    )}
                </Link>
            )}
        </div>
    );
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, userRole, logout, isAdmin } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Effect để theo dõi cuộn và thay đổi style navbar
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm
        console.log('Searching for:', searchQuery);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' 
                : 'bg-white py-4'
        }`}>
            <div className="container-custom">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link 
                            href="/" 
                            className="text-2xl font-bold text-gradient mr-6"
                        >
                            Curtain Shop
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-5">
                            <Link href="/" className="text-text-primary hover:text-primary transition-colors whitespace-nowrap">
                                Trang chủ
                            </Link>
                            <Link href="/about" className="text-text-primary hover:text-primary transition-colors whitespace-nowrap">
                                Giới thiệu
                            </Link>
                            <Link href="/products" className="text-text-primary hover:text-primary transition-colors whitespace-nowrap">
                                Sản phẩm
                            </Link>
                            <Link href="/posts" className="text-text-primary hover:text-primary transition-colors whitespace-nowrap">
                                Blog
                            </Link>
                            <Link href="/contact" className="text-text-primary hover:text-primary transition-colors whitespace-nowrap">
                                Liên hệ
                            </Link>
                            {isAdmin && (
                                <Link href="/admin" className="text-text-primary hover:text-primary transition-colors whitespace-nowrap">
                                    Quản trị
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Desktop Right Side (Search & Actions) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search form */}
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-64 pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring focus:border-blue-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FaSearch />
                            </button>
                        </form>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-2">
                            <ActionButton href="/favorites" icon={<FaHeart />} label="Yêu thích" badge={0} />
                            <ActionButton href="/cart" icon={<FaShoppingCart />} label="Giỏ hàng" badge={0} />
                            
                            {user ? (
                                <>
                                    <ActionButton 
                                        href="/account" 
                                        icon={<FaUser />} 
                                        label={userRole === 'admin' ? 'Admin' : 'Tài khoản'} 
                                    />
                                    <ActionButton 
                                        onClick={handleLogout}
                                        icon={<FaSignOutAlt />} 
                                        label="Đăng xuất" 
                                    />
                                </>
                            ) : (
                                <ActionButton 
                                    href="/login" 
                                    icon={<FaSignInAlt />} 
                                    label="Đăng nhập" 
                                />
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:text-primary focus:outline-none transition-colors"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">{isOpen ? 'Đóng menu' : 'Mở menu'}</span>
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
                <div className="px-4 py-2 space-y-1">
                    <Link href="/" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaHome className="mr-2" /> Trang chủ</span>
                    </Link>
                    <Link href="/about" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaInfoCircle className="mr-2" /> Giới thiệu</span>
                    </Link>
                    <Link href="/products" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaShoppingCart className="mr-2" /> Sản phẩm</span>
                    </Link>
                    <Link href="/posts" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaBlog className="mr-2" /> Blog</span>
                    </Link>
                    <Link href="/contact" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaPhone className="mr-2" /> Liên hệ</span>
                    </Link>
                    {isAdmin && (
                        <Link href="/admin" className="block py-2 text-text-primary hover:text-primary">
                            <span className="inline-flex items-center"><FaUser className="mr-2" /> Quản trị</span>
                        </Link>
                    )}
                    {user ? (
                        <>
                            <Link href="/account" className="block py-2 text-text-primary hover:text-primary">
                                <span className="inline-flex items-center"><FaUser className="mr-2" /> Tài khoản</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left block py-2 text-text-primary hover:text-primary"
                            >
                                <span className="inline-flex items-center"><FaSignOutAlt className="mr-2" /> Đăng xuất</span>
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="block py-2 text-text-primary hover:text-primary">
                            <span className="inline-flex items-center"><FaSignInAlt className="mr-2" /> Đăng nhập</span>
                        </Link>
                    )}
                    
                    <Link href="/favorites" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaHeart className="mr-2" /> Yêu thích</span>
                    </Link>
                    <Link href="/cart" className="block py-2 text-text-primary hover:text-primary">
                        <span className="inline-flex items-center"><FaShoppingCart className="mr-2" /> Giỏ hàng</span>
                    </Link>
                </div>
                
                {/* Mobile search */}
                <div className="px-4 py-3 border-t">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring focus:border-blue-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
} 