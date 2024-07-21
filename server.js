const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const userRoutes = require('./routes/user');
//const historicoRoutes = require('./routes/historico');
const conversaRoutes = require('./routes/conversa');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/user', userRoutes);
//app.use('/historico', historicoRoutes);
app.use('/conversa', conversaRoutes);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });