import Order from '../models/order.js';
import OrderItem from '../models/orderItem.js';
import Food from '../models/food.js';
import Cart from '../models/cart.js';
import CartItem from '../models/cartItem.js';

// Fungsi untuk membuat pesanan baru (dari item di keranjang pelanggan)
export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Temukan keranjang pengguna
        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                include: [Food]
            }]
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: 'Keranjang belanja Anda kosong. Tidak dapat membuat pesanan.' });
        }

        // 2. Hitung total harga dari item di keranjang
        let total_harga = 0;
        const orderItemsData = cart.CartItems.map(cartItem => {
            const subtotal = cartItem.Food.harga * cartItem.jumlah;
            total_harga += subtotal;
            return {
                foodId: cartItem.foodId,
                jumlah: cartItem.jumlah,
                subtotal: subtotal
            };
        });

        // 3. Buat pesanan utama
        const newOrder = await Order.create({
            userId,
            total_harga,
            status: 'menunggu pembayaran'
        });

        // 4. Buat item-item pesanan dari data keranjang
        const createdOrderItems = orderItemsData.map(item => ({
            ...item,
            orderId: newOrder.id
        }));
        await OrderItem.bulkCreate(createdOrderItems);

        // 5. Hapus semua item dari keranjang setelah pesanan berhasil
        await CartItem.destroy({ where: { cartId: cart.id } });

        res.status(201).json({ message: 'Pesanan berhasil dibuat dari keranjang.', order: newOrder });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk melihat riwayat pesanan (oleh pelanggan)
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.findAll({
            where: { userId },
            include: [{
                model: OrderItem,
                include: [Food] // Mengambil detail makanan dari setiap item pesanan
            }]
        });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk admin melihat semua pesanan
export const getAllOrders = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa melihat semua pesanan.' });
    }
    try {
        const orders = await Order.findAll({
            include: [{
                model: OrderItem,
                include: [Food]
            }]
        });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk admin memperbarui status pesanan
export const updateOrderStatus = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa memperbarui status pesanan.' });
    }
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }

        // Periksa apakah status yang diberikan valid
        const validStatuses = ['menunggu pembayaran', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Status tidak valid.' });
        }

        await order.update({ status });
        res.json({ message: 'Status pesanan berhasil diperbarui.', order });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};