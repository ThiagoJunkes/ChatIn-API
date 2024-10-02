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
      'WHERE c.id = :idConversa AND (user_to.token = :token OR user_from.token = :token) ' +
      'ORDER BY h.dt_msg_send;',
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

exports.postHistoricoConversa = async (req, res) => {
  const token = req.query.token;
  const { idConversa } = req.params;
  const { mensagem } = req.body;

  const decodedMessage = decodeURIComponent(mensagem); // Decodifica a mensagem recebida

  try {
    const verificacao = await sequelize.query(
      'SELECT user_to.id AS idTo, user_from.id AS idFrom ' +
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

    if(!verificacao || verificacao.length === 0) return res.status(401).json({ error: 'Failed to retrieve historico' });

    const [idUser] = await sequelize.query(
      'SELECT id ' +
      'FROM usuarios ' +
      'WHERE token = :token;',
      {
        replacements: { token },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const userId = idUser.id;
    // Função para obter a data atual formatada
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0') + "000"; // Para 6 dígitos
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const data = getCurrentDateTime();

    const insertHistorico = await sequelize.query(
      'INSERT INTO historicos (mensagem, fk_user, fk_conversa_id, dt_msg_send) ' +
      'VALUES (:decodedMessage, :userId, :idConversa, :data);',
      {
        replacements: { decodedMessage, userId, idConversa, data},
        type: sequelize.QueryTypes.INSERT
      }
    );

    res.status(200).json({ status: 'Mensagem enviado com sucesso!' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve historico' });
    console.log(error);
  }
};
