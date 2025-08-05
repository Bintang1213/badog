// server.js
import express from "express";
import "dotenv/config";
import sequelize from "./config/db.js";
import cors from "cors"; 

import User from "./models/user.js";
import Food from "./models/food.js";
import Cart from "./models/cart.js";
import CartItem from "./models/cartItem.js";
import Order from "./models/order.js";
import OrderItem from "./models/orderItem.js";

import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Gunakan middleware cors di sini, sebelum router lainnya
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Kedai Wartiyem sedang berjalan!");
});

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil."); // Sinkronisasi model, pastikan semua model di-import

    await sequelize.sync({ alter: true }); // Menggunakan alter:true untuk update tabel
    console.log("Semua model telah disinkronkan.");

    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Gagal menghubungkan atau menyinkronkan database:", error);
    process.exit(1);
  }
};

startServer();
