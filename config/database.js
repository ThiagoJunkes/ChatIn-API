const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ChatIn', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });
  
module.exports = sequelize;
