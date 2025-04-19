"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

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
    fetch(`/api/categories/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy danh mục!");
        return res.json();
      })
      .then((data) => setName(data.name || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại!");
      router.push("/admin/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div>
      <h1>Sửa danh mục sản phẩm</h1>
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
        <button type="submit" disabled={saving}>{saving ? "Đang lưu..." : "Lưu"}</button>
        <button type="button" style={{marginLeft: 8}} onClick={() => router.push("/admin/categories")}>Huỷ</button>
      </form>
    </div>
  );
}

