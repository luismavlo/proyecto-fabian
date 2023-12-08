import { DataTypes } from 'sequelize';
import sequelize from '../config/database/database.js';


const Guest = sequelize.define('guest', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'class_id'
    },
});

export default Guest;