const Sequelize = require("sequelize");

const sequelize = require("../database");

const expenses = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = expenses;