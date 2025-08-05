import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Food = sequelize.define('Food', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
  },
  harga: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
  },
  kategori: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'foods'
});

export default Food;