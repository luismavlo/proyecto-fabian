import { DataTypes } from 'sequelize';
import sequelize from '../config/database/database.js';


const PublicationImg = sequelize.define('publication_imgs', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'publication_id'
    }
});

export default PublicationImg;