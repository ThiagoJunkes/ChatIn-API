const { sequelize } = require('../models');

exports.createConversa = async (req, res) => {
  const { dt_criacao, fk_user_to, fk_user_from } = req.body;
  try {
    const newConversa = await Conversa.create({ dt_criacao, fk_user_to, fk_user_from });
    res.status(201).json(newConversa);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversa' });
  }
};

exports.getConversasUsuario = async (req, res) => {
  const token = req.query.token;
  console.log("Entrou");
  try {
    const [conversas] = await sequelize.query(
      'SELECT c.id, c.dt_criacao, user_to.apelido, user_to.nome_completo FROM conversas c ' +
      'JOIN usuarios user_to on user_to.id = c.fk_user_to ' +
      'JOIN usuarios user_from on user_from.id = c.fk_user_from ' +
      'WHERE user_from.token = :token',
      {
        replacements: { token },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.status(200).json(conversas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve conversas' });
    console.log(error);
  }
};
