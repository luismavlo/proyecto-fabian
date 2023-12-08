import Class from "./../../class/class.model.js";
import Comment from "./../../comment/comment.model.js";
import Guest from "./../../guest/guest.model.js";
import PublicationImg from "../../publication/publication-img.model.js";
import Publication from "../../publication/publication.model.js";
import User from "./../../user/user.model.js";

export const initModel = () => {
  User.hasMany(Publication, { foreignKey: "user_id" });
  Publication.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Comment, { foreignKey: "user_id" });
  Comment.belongsTo(User, { foreignKey: "user_id " });

  User.hasMany(Class, { foreignKey: "user_id" });
  Class.belongsTo(User, { foreignKey: "user_id" });

  Publication.hasMany(PublicationImg, { foreignKey: "publication_id" });
  PublicationImg.belongsTo(Publication, { foreignKey: "publication_id" });

  Publication.hasMany(Comment, { foreignKey: "publication_id" });
  Comment.belongsTo(Publication, { foreignKey: "publication_id" });

  Guest.hasMany(Comment, { foreignKey: "gest_Id" });
  Comment.belongsTo(Guest, { foreignKey: "guest_id" });

  Class.hasMany(Guest, { foreignKey: "class_id" });
  Guest.belongsTo(Class, { foreignKey: "class_id" });

  Class.hasMany(Publication, { foreignKey: "class_id" });
  Publication.belongsTo(Class, { foreignKey: "class_id" });
};
