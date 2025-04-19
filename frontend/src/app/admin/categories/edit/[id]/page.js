"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCategories, updateCategory } from '@/lib/api';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getCategories(id)
      .then((data) => setName(data.name || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateCategory(id, { name });
      router.push("/admin/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 48 }}>
      <div className="loader" style={{margin: '0 auto 12px', border: '4px solid #eee', borderTop: '4px solid #4f46e5', borderRadius: '50%', width: 36, height: 36, animation: 'spin 1s linear infinite'}}></div>
      <div style={{color: '#666'}}>Đang tải dữ liệu...</div>
      <style>{`@keyframes spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}</style>
    </div>
  );
  if (error) return <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 16, borderRadius: 8, textAlign: 'center', fontWeight: 500 }}>{error}</div>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 32 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 18, color: '#4f46e5', textAlign: 'center' }}>Sửa danh mục sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#444' }}>Tên danh mục:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, outline: 'none', transition: 'border .2s', background: '#fafbff' }}
            placeholder="Nhập tên danh mục"
            autoFocus
          />
        </div>
        {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            type="submit"
            disabled={saving}
            style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
          >{saving ? (
            <span>
              <span className="loader" style={{marginRight: 8, border: '3px solid #eee', borderTop: '3px solid #4f46e5', borderRadius: '50%', width: 18, height: 18, display: 'inline-block', verticalAlign: 'middle', animation: 'spin 1s linear infinite'}}></span>
              Đang lưu...
              <style>{`@keyframes spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}</style>
            </span>
          ) : "Lưu"}</button>
          <button
            type="button"
            style={{ background: '#e5e7eb', color: '#444', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
            onClick={() => router.push("/admin/categories")}
          >Huỷ</button>
        </div>
      </form>
    </div>
  );
}


