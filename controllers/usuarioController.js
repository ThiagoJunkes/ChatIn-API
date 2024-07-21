const { sequelize } = require('../models');

exports.login = async (req, res) => {
    let { username, senha } = req.body;

    username = username.toLowerCase();
    try {
    const [results] = await sequelize.query(
        'SELECT id, username, senha, nome_completo, apelido FROM usuarios ' +
        'WHERE username = :username AND senha = :senha;',
        {
          replacements: { username, senha },
          type: sequelize.QueryTypes.SELECT
        }
      );
    if (results) {
        res.json({ message: 'Login realizado com sucesso', nome_completo: results.nome_completo, apelido: results.apelido });
    } else {
        res.status(401).json({ error: 'Usuario ou senha invalida!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  let { username, senha, nome_completo, apelido } = req.body;

  if (!username || !senha || !nome_completo || !apelido) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  username = username.toLowerCase();
  try {
    // Verifica se o username já existe
    const [validaUser] = await sequelize.query(
      'SELECT id FROM usuarios WHERE username = :username;',
      {
        replacements: { username },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (validaUser) {
      return res.status(402).json({ error: 'Username já existe' });
    }

    // Insere o novo usuário
    const [insert] = await sequelize.query(
      'INSERT INTO usuarios (username, senha, nome_completo, apelido) VALUES (:username, :senha, :nome_completo, :apelido);',
      {
        replacements: { username, senha, nome_completo, apelido },
        type: sequelize.QueryTypes.INSERT
      }
    );

    if (!insert) {
      return res.status(402).json({ error: 'Erro ao criar usuario' });
    }

    // Redireciona para a rota de login após o registro bem-sucedido
    res.status(201).json({ message: 'Usuário criado com sucesso.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
    try {
      const usuarios = await sequelize.query(
        'SELECT id, nome_completo, apelido FROM usuarios',
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
  
      if (usuarios.length > 0) {
        return res.status(200).json({ usuarios: usuarios });
      } else {
        return res.status(404).json({ message: 'Nenhum usuário encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
