'use client'

import { useEffect, useState } from 'react';
import { favoriteService } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Nếu chưa đăng nhập và đã load xong trạng thái auth thì chuyển hướng sang /login
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchFavorites();
    }
    // eslint-disable-next-line
  }, [user, authLoading]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      // Sửa endpoint thành /api/favorites
      const res = await favoriteService.getFavorites();
      // Đảm bảo luôn setFavorites là array
      let data = res.data;
      if (!Array.isArray(data)) {
        if (Array.isArray(data.data)) data = data.data;
        else data = [];
      }
      setFavorites(data);
    } catch (err) {
      setFavorites([]);
    }
    setLoading(false);
  };

  const handleToggleFavorite = async (productId, isFavorite) => {
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(productId);
      } else {
        await favoriteService.addFavorite(productId);
      }
      fetchFavorites();
    } catch (err) {}
  };

  if (authLoading) return <div>Đang tải...</div>;
  if (!user) return <div>Bạn cần đăng nhập để sử dụng tính năng này. <button onClick={() => router.push('/login')} style={{color: 'blue', textDecoration: 'underline'}}>Đăng nhập</button></div>;
  if (loading) return <div>Đang tải...</div>;
  if (!Array.isArray(favorites) || favorites.length === 0) return <div>Bạn chưa yêu thích sản phẩm nào.</div>;

  return (
    <div>
      <h1>Sản phẩm yêu thích</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {favorites.map(product => (
          <div key={product._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, width: 260 }}>
            <img src={product.images?.[0]?.url || '/no-image.png'} alt={product.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 4 }} />
            <h3>{product.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => handleToggleFavorite(product._id, true)} style={{ color: 'red', fontWeight: 'bold' }}>Bỏ yêu thích ♥</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
