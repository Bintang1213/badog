import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Order from './order.js';
import Food from './food.js';

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Kolom untuk Foreign Key ke tabel Order
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    allowNull: false,
  },
  // Kolom untuk Foreign Key ke tabel Food
  foodId: {
    type: DataTypes.INTEGER,
    references: {
      model: Food,
      key: 'id',
    },
    allowNull: false,
  }
}, {
  tableName: 'order_items'
});

// Definisikan relasi: Satu Order bisa punya banyak OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Definisikan relasi: Satu Food bisa ada di banyak OrderItem
Food.hasMany(OrderItem, { foreignKey: 'foodId' });
OrderItem.belongsTo(Food, { foreignKey: 'foodId' });

export default OrderItem;