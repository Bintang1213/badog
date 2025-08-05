import Cart from '../models/cart.js';
import CartItem from '../models/cartItem.js';
import Food from '../models/food.js';

// Fungsi untuk mendapatkan atau membuat keranjang untuk user
const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        cart = await Cart.create({ userId });
    }
    return cart;
};

// Menambah atau mengedit item di keranjang
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { foodId, jumlah } = req.body;

        if (!foodId || !jumlah || jumlah <= 0) {
            return res.status(400).json({ message: 'foodId dan jumlah harus valid.' });
        }

        const food = await Food.findByPk(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Makanan tidak ditemukan.' });
        }

        const cart = await getOrCreateCart(userId);
        let cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                foodId
            }
        });

        if (cartItem) {
            cartItem.jumlah += jumlah;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                cartId: cart.id,
                foodId,
                jumlah
            });
        }

        res.json({ message: 'Item berhasil ditambahkan ke keranjang.', cartItem });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Melihat isi keranjang
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                include: [Food] // Mengambil detail makanan
            }]
        });

        if (!cart) {
            return res.json({ message: 'Keranjang kosong.', items: [] });
        }

        res.json(cart);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Menghapus item dari keranjang
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { foodId } = req.body;

        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Keranjang tidak ditemukan.' });
        }

        const deleted = await CartItem.destroy({
            where: {
                cartId: cart.id,
                foodId
            }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Item tidak ditemukan di keranjang.' });
        }

        res.json({ message: 'Item berhasil dihapus dari keranjang.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};