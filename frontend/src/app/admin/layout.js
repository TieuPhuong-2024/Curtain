import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for Curtain Management',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link href="/admin" className="block py-2 px-4 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/banners" className="block py-2 px-4 hover:bg-gray-700">
                Banner
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="block py-2 px-4 hover:bg-gray-700">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/curtains" className="block py-2 px-4 hover:bg-gray-700">
                Quản lý Rèm
              </Link>
            </li>
            <li>
              <Link href="/" className="block py-2 px-4 hover:bg-gray-700">
                Về Trang Chính
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 