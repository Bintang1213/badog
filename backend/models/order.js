import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total_harga: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('menunggu pembayaran', 'diproses', 'dikirim', 'selesai', 'dibatalkan'),
    defaultValue: 'menunggu pembayaran',
  },
  // Kolom untuk Foreign Key ke tabel User
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  }
}, {
  tableName: 'orders'
});

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;