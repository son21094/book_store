# 📚 Tiệm Sách Hư Vô

Ứng dụng bán sách trực tuyến full-stack xây dựng bằng **MERN Stack** (MongoDB, Express, React, Node.js).

---

## ✨ Tính năng

### 👤 Người dùng
- Đăng ký / đăng nhập bằng Email hoặc Google (Firebase Auth)
- Duyệt & tìm kiếm sách theo danh mục
- Giỏ hàng, đặt hàng, theo dõi trạng thái đơn hàng
- Áp dụng mã giảm giá (coupon)
- Hệ thống điểm thưởng (reward points)
- Hệ thống hạng thành viên (Đồng / Bạc / Vàng / Kim cương)
- Gửi yêu cầu liên hệ theo chủ đề
- Nhận thông báo khi đơn hàng cập nhật / yêu cầu được phản hồi

### 🛠️ Admin
- Dashboard thống kê tổng quan
- Quản lý sách (thêm, sửa, xóa)
- Quản lý đơn hàng & cập nhật trạng thái
- Quản lý người dùng
- Quản lý mã giảm giá
- Quản lý yêu cầu liên hệ (lọc theo chủ đề, trạng thái)
- Quản lý hạng thành viên

---

## 🏗️ Tech Stack

| Phần | Công nghệ |
|------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| State Management | Redux Toolkit, RTK Query |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | Firebase Authentication |
| Deployment | Vercel (cả frontend & backend) |

---

## 📁 Cấu trúc thư mục

```
book_store/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Shared components
│   │   ├── context/        # React context (Auth, Notifications)
│   │   ├── firebase/       # Firebase config
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Pages (home, books, dashboard, user)
│   │   ├── redux/          # Redux store & RTK Query APIs
│   │   └── utils/          # Helper functions
│   └── public/
│       └── book.json       # Static book data
│
└── backend/                # Node.js + Express API
    ├── src/
    │   ├── books/          # Sách (CRUD)
    │   ├── contacts/       # Liên hệ
    │   ├── coupons/        # Mã giảm giá
    │   ├── middleware/     # Auth middleware
    │   ├── notifications/  # Thông báo
    │   ├── orders/         # Đơn hàng
    │   ├── ranks/          # Hạng thành viên
    │   ├── stats/          # Thống kê admin
    │   └── users/          # Người dùng
    └── index.js            # Entry point
```

---

## 🚀 Cài đặt & Chạy local

### Yêu cầu
- Node.js >= 18
- MongoDB (local hoặc Atlas)
- Firebase project

### 1. Clone repo

```bash
git clone https://github.com/son21094/book_store.git
cd book_store
```

### 2. Cài đặt backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/` (xem mẫu ở `backend/.env.example`):

```env
DB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
JWT_SECRET_KEY=your_super_secret_jwt_key_generate_a_random_one
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Khởi động backend:

```bash
npm run start:dev   # development (nodemon)
npm start           # production
```

### 3. Cài đặt frontend

```bash
cd frontend
npm install
```

Tạo file `.env` trong thư mục `frontend/` (xem mẫu ở `frontend/.env.example`):

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Khởi động frontend:

```bash
npm run dev
```

### 4. Dữ liệu hạng thành viên

Backend tự khởi tạo dữ liệu ranks khi kết nối MongoDB lần đầu (`autoInitializeRanks()` trong `src/ranks/rank.init.js`) — **không bắt buộc chạy script**. Nếu muốn chạy thủ công:

```bash
cd backend
npm run init-ranks          # chỉ tạo khi DB chưa có rank
npm run init-ranks:force    # xóa rank cũ rồi tạo lại
```

### 5. Tạo tài khoản admin (lần đầu)

Đăng ký một tài khoản bình thường qua app, sau đó vào MongoDB đổi `role` của user đó thành `"admin"`. Từ đó có thể đăng nhập tại `/api/auth/admin` và tạo thêm admin khác qua `POST /api/auth/create-admin` (yêu cầu token admin).

---

## 🌐 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/books` | Lấy danh sách sách | ❌ |
| POST | `/api/orders` | Tạo đơn hàng | ✅ |
| GET | `/api/orders/email/:email` | Đơn hàng theo email | ✅ |
| POST | `/api/contacts` | Gửi yêu cầu liên hệ | ❌ |
| GET | `/api/contacts` | Lấy tất cả liên hệ | Admin |
| GET | `/api/notifications/:email` | Thông báo người dùng | ✅ |
| GET | `/api/ranks` | Danh sách hạng | ❌ |
| POST | `/api/auth/admin` | Đăng nhập admin | ❌ |

---

## 📦 Deploy lên Vercel

Dự án đã có sẵn `vercel.json` ở cả thư mục gốc, `backend/` và `frontend/`, nên có thể import trực tiếp repo vào Vercel:

1. Tạo 2 project Vercel: một cho `frontend` (Vite) và một cho `backend` (serverless function).
2. Khai báo biến môi trường trên Vercel giống với 2 file `.env` ở phần cài đặt bên trên.
3. Trỏ `VITE_API_URL` của frontend về domain backend, và `FRONTEND_URL` của backend về domain frontend (để CORS hoạt động).

---

## 🔑 Đăng nhập Admin

- Trang đăng nhập admin nằm ở `frontend/src/components/AdminLogin.jsx`, gọi API `POST /api/auth/admin`.
- Tài khoản phải có `role: "admin"` trong collection `users` (xem bước 5 ở phần cài đặt).
