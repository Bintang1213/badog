import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Kolom untuk Foreign Key ke tabel User
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    unique: true 
  }
}, {
  tableName: 'carts'
});

// Definisikan relasi: Satu User punya satu Cart
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;