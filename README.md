# Curtain Shop - Ứng dụng Web bán Rèm Cửa

Đây là ứng dụng web cửa hàng rèm cửa sử dụng:
- **Frontend**: Next.js, TailwindCSS, React Icons
- **Backend**: Node.js, Express, MongoDB

## Cấu trúc dự án

```
/
├── backend/              # Server Node.js với Express
│   ├── src/              # Mã nguồn backend
│   │   ├── config/       # Cấu hình
│   │   ├── controllers/  # Các xử lý logic
│   │   ├── models/       # Mô hình dữ liệu
│   │   ├── routes/       # Định tuyến API
│   │   └── index.js      # Điểm khởi chạy server
│   ├── .env              # Biến môi trường backend
│   └── package.json      # Danh sách gói backend
│
└── frontend/             # Ứng dụng Next.js
    ├── src/              # Mã nguồn frontend
    │   ├── app/          # Các trang của ứng dụng
    │   ├── components/   # Các thành phần UI tái sử dụng
    │   └── lib/          # Tiện ích và hàm trợ giúp
    ├── public/           # Tài nguyên tĩnh
    ├── .env.local        # Biến môi trường frontend
    └── package.json      # Danh sách gói frontend
```

## Cài đặt và chạy ứng dụng

### Yêu cầu

- Node.js (v14.0.0 hoặc cao hơn)
- MongoDB

### Backend

1. Di chuyển vào thư mục backend:
   ```
   cd backend
   ```

2. Cài đặt các gói phụ thuộc:
   ```
   npm install
   ```

3. Tạo file .env với nội dung:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/curtainapp
   ```

4. Khởi chạy server:
   ```
   npm run dev
   ```

### Frontend

1. Di chuyển vào thư mục frontend:
   ```
   cd frontend
   ```

2. Cài đặt các gói phụ thuộc:
   ```
   npm install
   ```

3. Tạo file .env.local với nội dung:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Khởi chạy ứng dụng:
   ```
   npm run dev
   ```

## Tính năng

- Hiển thị danh sách sản phẩm rèm cửa
- Lọc sản phẩm theo danh mục, màu sắc, giá
- Xem chi tiết sản phẩm
- Liên hệ với cửa hàng
- Quản lý sản phẩm (API)

## API Endpoints

- `GET /api/curtains`: Lấy danh sách tất cả rèm cửa
- `GET /api/curtains/:id`: Lấy thông tin chi tiết một rèm cửa
- `POST /api/curtains`: Tạo mới rèm cửa
- `PUT /api/curtains/:id`: Cập nhật thông tin rèm cửa
- `DELETE /api/curtains/:id`: Xóa rèm cửa 