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
  
  try {
    const conversas = await sequelize.query(
      'SELECT c.id, c.dt_criacao, user_to.apelido, user_to.nome_completo FROM conversas c ' +
      'JOIN usuarios user_to on user_to.id = c.fk_user_to ' +
      'JOIN usuarios user_from on user_from.id = c.fk_user_from ' +
      'WHERE user_to.token = :token OR user_from.token = :token;',
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

exports.getHistoricoConversaById = async (req, res) => {
  const token = req.query.token;
  const { idConversa } = req.params;

  try {
    const historico = await sequelize.query(
      'SELECT h.* ' +
      'FROM historicos h ' +
      'JOIN conversas c ON c.id = h.fk_conversa_id ' +
      'JOIN usuarios user_to ON user_to.id = c.fk_user_to ' +
      'JOIN usuarios user_from ON user_from.id = c.fk_user_from ' +
      'WHERE c.id = :idConversa AND (user_to.token = :token OR user_from.token = :token);',
      {
        replacements: { idConversa, token },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve historico' });
    console.log(error);
  }
};
