
# 📖 Dokumentasi API Kedai Wartiyem

Ini adalah dokumentasi lengkap untuk API backend **Kedai Wartiyem**.  
API ini mencakup otentikasi pengguna, manajemen makanan, keranjang belanja, dan pemesanan.

## 🌐 URL Dasar
```
http://localhost:4000/api
```

---

## 🔐 1. Otentikasi

### 📌 Registrasi Pengguna

**Endpoint:** `POST /user/register`  
**Deskripsi:** Mendaftarkan pengguna baru.

**Body Request:**
```json
{
  "nama": "Nama Pengguna",
  "email": "email@contoh.com",
  "password": "kata_sandi_rahasia"
}
```

**Response:**
```json
{
  "message": "Pengguna berhasil didaftarkan.",
  "user": {
    "id": 1,
    "nama": "Nama Pengguna",
    "email": "email@contoh.com",
    "role": "pelanggan",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 🔑 Login Pengguna

**Endpoint:** `POST /user/login`  
**Deskripsi:** Login dan mendapatkan token.

**Body Request:**
```json
{
  "email": "email@contoh.com",
  "password": "kata_sandi_rahasia"
}
```

**Response:**
```json
{
  "message": "Login berhasil.",
  "token": "<jwt_token>",
  "role": "pelanggan"
}
```

---

## 🍽️ 2. Manajemen Makanan (Admin Only)

### ➕ Tambah Makanan

**Endpoint:** `POST /food/add`  
**Deskripsi:** Menambah makanan baru.  
**Authorization:** `Bearer <admin_token>`  
**Content-Type:** `multipart/form-data`

**Fields:**
- `nama`
- `deskripsi`
- `harga`
- `kategori`
- `gambar` (file)

**Response:**
```json
{
  "message": "Makanan berhasil ditambahkan.",
  "food": { "id": 1, "nama": "Nasi Goreng", ... }
}
```

### 📋 Lihat Semua Makanan

**Endpoint:** `GET /food`  
**Deskripsi:** Menampilkan semua daftar makanan.

**Response:**
```json
[
  { "id": 1, "nama": "Nasi Goreng", ... },
  { "id": 2, "nama": "Mie Ayam", ... }
]
```

### ✏️ Update Makanan

**Endpoint:** `PUT /food/:id`  
**Deskripsi:** Update makanan berdasarkan ID.  
**Authorization:** `Bearer <admin_token>`  
**Content-Type:** `multipart/form-data`

**Fields Opsional:** `nama`, `deskripsi`, `harga`, `kategori`, `gambar`

**Response:**
```json
{
  "message": "Makanan berhasil diperbarui.",
  "food": { "id": 1, "nama": "Nasi Goreng", ... }
}
```

### ❌ Hapus Makanan

**Endpoint:** `DELETE /food/:id`  
**Authorization:** `Bearer <admin_token>`

**Response:**
```json
{
  "message": "Makanan berhasil dihapus."
}
```

---

## 🛒 3. Keranjang Belanja (User Only)

### ➕ Tambah ke Keranjang

**Endpoint:** `POST /cart/add`  
**Deskripsi:** Menambahkan makanan ke keranjang.  
**Authorization:** `Bearer <user_token>`

**Body:**
```json
{
  "foodId": 1,
  "jumlah": 2
}
```

**Response:**
```json
{
  "message": "Item berhasil ditambahkan ke keranjang.",
  "cartItem": { ... }
}
```

### 📋 Lihat Keranjang

**Endpoint:** `GET /cart`  
**Authorization:** `Bearer <user_token>`

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "CartItems": [
    { "id": 1, "jumlah": 2, "Food": { "id": 1, "nama": "Nasi Goreng", ... } }
  ]
}
```

### 🗑️ Hapus Item dari Keranjang

**Endpoint:** `DELETE /cart/remove`  
**Authorization:** `Bearer <user_token>`

**Body:**
```json
{
  "foodId": 1
}
```

**Response:**
```json
{
  "message": "Item berhasil dihapus dari keranjang."
}
```

---

## 📦 4. Pemesanan

### 🛍️ Buat Pesanan

**Endpoint:** `POST /order/create`  
**Deskripsi:** Membuat pesanan dari keranjang.  
**Authorization:** `Bearer <user_token>`

**Response:**
```json
{
  "message": "Pesanan berhasil dibuat dari keranjang.",
  "order": { ... }
}
```

### 📜 Lihat Riwayat Pesanan

**Endpoint:** `GET /order/my-orders`  
**Authorization:** `Bearer <user_token>`

**Response:**
```json
[
  { "id": 1, "userId": 1, "OrderItems": [ ... ] },
  { "id": 2, "userId": 1, "OrderItems": [ ... ] }
]
```

### 📦 Lihat Semua Pesanan (Admin)

**Endpoint:** `GET /order/all-orders`  
**Authorization:** `Bearer <admin_token>`

**Response:**
```json
[
  { "id": 1, "userId": 1, "OrderItems": [ ... ] },
  { "id": 2, "userId": 2, "OrderItems": [ ... ] }
]
```

### 🔄 Update Status Pesanan

**Endpoint:** `PUT /order/:id/status`  
**Authorization:** `Bearer <admin_token>`

**Body:**
```json
{
  "status": "diproses"
}
```

**Status yang Valid:**
- `menunggu pembayaran`
- `diproses`
- `dikirim`
- `selesai`
- `dibatalkan`

**Response:**
```json
{
  "message": "Status pesanan berhasil diperbarui.",
  "order": { "id": 1, "status": "diproses", ... }
}
```

---

## 📝 Catatan

- Gunakan token otentikasi di Header:
```
Authorization: Bearer <token>
```
- Endpoint admin memerlukan token dengan role `admin`.
