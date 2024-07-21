const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Usuario = require('./Usuario')(sequelize, DataTypes);
const Conversa = require('./Conversa')(sequelize, DataTypes);
const Historico = require('./Historico')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Usuario,
  Conversa,
  Historico,
};
