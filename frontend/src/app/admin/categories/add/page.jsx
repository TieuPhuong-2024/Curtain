"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Thêm danh mục thất bại!");
      router.push("/admin/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Thêm danh mục sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 12}}>
          <label>Tên danh mục:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{width: 300, padding: 8}}
            placeholder="Nhập tên danh mục"
          />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Đang lưu..." : "Lưu"}</button>
        <button type="button" style={{marginLeft: 8}} onClick={() => router.push("/admin/categories")}>Huỷ</button>
      </form>
    </div>
  );
}
