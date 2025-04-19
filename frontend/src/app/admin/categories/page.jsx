"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi lấy danh mục!");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    router.push("/admin/categories/add");
  };

  const handleEdit = (id) => {
    router.push(`/admin/categories/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa thất bại!");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Quản lý danh mục sản phẩm</h1>
      <button onClick={handleAdd} style={{marginBottom: 16}}>+ Thêm danh mục</button>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : (
        <table border="1" cellPadding="8" style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr><td colSpan={2}>Không có danh mục nào</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id || cat}>
                  <td>{cat.name || cat}</td>
                  <td>
                    <button onClick={() => handleEdit(cat._id || cat)}>Sửa</button>
                    <button onClick={() => handleDelete(cat._id || cat)} style={{marginLeft: 8, color: 'red'}}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
