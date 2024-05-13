import Sequelize from "sequelize";
import sequelize from "../config/db.config.js";

const Contact = sequelize.define("contact", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Contact;
