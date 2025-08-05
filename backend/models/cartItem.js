import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Cart from './cart.js';
import Food from './food.js';

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'cart_items'
});

// Definisikan relasi: Satu Cart bisa punya banyak CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Definisikan relasi: Satu Food bisa ada di banyak CartItem
Food.hasMany(CartItem, { foreignKey: 'foodId' });
CartItem.belongsTo(Food, { foreignKey: 'foodId' });

export default CartItem;