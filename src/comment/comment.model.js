import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Comment = sequelize.define("comments", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "user_id",
  },
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "guest_id",
  },
  publicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "publication_id",
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

export default Comment;
