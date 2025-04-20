'use client';

import Link from 'next/link';
import {useState, useEffect} from 'react';
import {FaBars, FaHome, FaInfoCircle, FaPhone, FaShoppingCart, FaTimes, FaSearch, FaUser, FaHeart} from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
                            className="text-2xl font-bold text-gradient mr-8"
                        >
                            Curtain Shop
                        </Link>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            <NavLink href="/" icon={<FaHome size={16} />} text="Trang chủ" />
                            <NavLink href="/products" icon={<FaShoppingCart size={16} />} text="Sản phẩm" />
                            <NavLink href="/about" icon={<FaInfoCircle size={16} />} text="Giới thiệu" />
                            <NavLink href="/contact" icon={<FaPhone size={16} />} text="Liên hệ" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search box */}
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-secondary py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all w-40 focus:w-60"
                            />
                            <button 
                                type="submit" 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark"
                            >
                                <FaSearch />
                            </button>
                        </form>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-3">
                            <ActionButton href="/favorites" icon={<FaHeart />} label="Yêu thích" badge={0} />
                            <ActionButton href="/cart" icon={<FaShoppingCart />} label="Giỏ hàng" badge={0} />
                            <ActionButton href="/account" icon={<FaUser />} label="Tài khoản" />
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

            {/* Mobile menu */}
            <div 
                className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}
                style={{ top: '64px' }} 
            >
                <div className="flex flex-col h-full">
                    {/* Search for mobile */}
                    <div className="p-4 border-b">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-secondary w-full py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none"
                            />
                            <button 
                                type="submit" 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                            >
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    {/* Nav Links for mobile */}
                    <div className="flex-1 overflow-y-auto py-4 px-8 space-y-6">
                        <MobileNavLink href="/" icon={<FaHome size={20} />} text="Trang chủ" onClick={toggleMenu} />
                        <MobileNavLink href="/products" icon={<FaShoppingCart size={20} />} text="Sản phẩm" onClick={toggleMenu} />
                        <MobileNavLink href="/about" icon={<FaInfoCircle size={20} />} text="Giới thiệu" onClick={toggleMenu} />
                        <MobileNavLink href="/contact" icon={<FaPhone size={20} />} text="Liên hệ" onClick={toggleMenu} />
                        <div className="border-t border-gray-200 my-6"></div>
                        <MobileNavLink href="/favorites" icon={<FaHeart size={20} />} text="Yêu thích" onClick={toggleMenu} />
                        <MobileNavLink href="/cart" icon={<FaShoppingCart size={20} />} text="Giỏ hàng" onClick={toggleMenu} />
                        <MobileNavLink href="/account" icon={<FaUser size={20} />} text="Tài khoản" onClick={toggleMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Component cho desktop navigation link
function NavLink({ href, icon, text }) {
    return (
        <Link 
            href={href} 
            className="flex items-center px-3 py-2 text-text-primary hover:text-primary relative group"
        >
            <span className="mr-1">{icon}</span> {text}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </Link>
    );
}

// Component cho mobile navigation link
function MobileNavLink({ href, icon, text, onClick }) {
    return (
        <Link 
            href={href} 
            className="flex items-center py-2 text-lg text-text-primary hover:text-primary transition-colors"
            onClick={onClick}
        >
            <span className="mr-3">{icon}</span> {text}
        </Link>
    );
}

// Component cho action buttons (giỏ hàng, yêu thích, tài khoản)
function ActionButton({ href, icon, label, badge }) {
    return (
        <Link 
            href={href} 
            className="relative p-2 text-text-primary hover:text-primary transition-colors rounded-full hover:bg-secondary"
            title={label}
        >
            {icon}
            {badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {badge}
                </span>
            )}
        </Link>
    );
} 