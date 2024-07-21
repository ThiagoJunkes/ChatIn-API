const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ChatIn', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
