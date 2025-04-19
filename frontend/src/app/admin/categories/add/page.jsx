"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createCategory} from "@/lib/api";

export default function AddCategoryPage() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await createCategory({name});
            router.push("/admin/categories");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: 500,
            margin: '40px auto',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #eee',
            padding: 32
        }}>
            <h1 style={{fontSize: 24, fontWeight: 700, marginBottom: 18, color: '#4f46e5', textAlign: 'center'}}>Thêm
                danh mục sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: 22}}>
                    <label style={{display: 'block', marginBottom: 8, fontWeight: 600, color: '#444'}}>Tên danh
                        mục:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                            fontSize: 16,
                            outline: 'none',
                            transition: 'border .2s',
                            background: '#fafbff'
                        }}
                        placeholder="Nhập tên danh mục"
                        autoFocus
                    />
                </div>
                {error && <div style={{
                    background: '#fee2e2',
                    color: '#b91c1c',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 16,
                    textAlign: 'center',
                    fontWeight: 500
                }}>{error}</div>}
                <div style={{display: 'flex', justifyContent: 'center', gap: 12}}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: '#4f46e5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            padding: '10px 28px',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >{loading ? (
                        <span>
              <span className="loader" style={{
                  marginRight: 8,
                  border: '3px solid #eee',
                  borderTop: '3px solid #4f46e5',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  animation: 'spin 1s linear infinite'
              }}></span>
              Đang lưu...
              <style>{`@keyframes spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}</style>
            </span>
                    ) : "Lưu"}</button>
                    <button
                        type="button"
                        style={{
                            background: '#e5e7eb',
                            color: '#444',
                            border: 'none',
                            borderRadius: 6,
                            padding: '10px 24px',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: 'pointer'
                        }}
                        onClick={() => router.push("/admin/categories")}
                    >Huỷ
                    </button>
                </div>
            </form>
        </div>
    );
}

