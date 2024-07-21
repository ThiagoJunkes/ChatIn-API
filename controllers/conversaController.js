const { Conversa } = require('../models');

exports.createConversa = async (req, res) => {
  const { dt_criacao, fk_user_to, fk_user_from } = req.body;
  try {
    const newConversa = await Conversa.create({ dt_criacao, fk_user_to, fk_user_from });
    res.status(201).json(newConversa);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversa' });
  }
};

exports.getConversas = async (req, res) => {
  try {
    const conversas = await Conversa.findAll();
    res.status(200).json(conversas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve conversas' });
  }
};
