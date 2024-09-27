-- Inserção de usuários
INSERT INTO usuarios (username, senha, nome_completo, apelido) VALUES
('joao', 'senha123', 'João Silva', 'Jão'),
('maria', 'senha123', 'Maria Oliveira', 'Mari'),
('thiago', 'senha123', 'Thiago Souza', 'Thi');

-- Inserção de conversas
INSERT INTO conversas (fk_user_to, fk_user_from) VALUES
((SELECT id FROM usuarios WHERE username = 'joao'), (SELECT id FROM usuarios WHERE username = 'maria')),
((SELECT id FROM usuarios WHERE username = 'maria'), (SELECT id FROM usuarios WHERE username = 'thiago'));

-- Inserção de mensagens para a primeira conversa
INSERT INTO historicos (mensagem, fk_user, fk_conversa_id) VALUES
('Olá Maria!', (SELECT id FROM usuarios WHERE username = 'joao'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'joao') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'maria'))),
('Olá João! Como você está?', (SELECT id FROM usuarios WHERE username = 'maria'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'joao') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'maria'))),
('Estou bem, obrigado!', (SELECT id FROM usuarios WHERE username = 'joao'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'joao') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'maria')));

-- Inserção de mensagens para a segunda conversa
INSERT INTO historicos (mensagem, fk_user, fk_conversa_id) VALUES
('Oi Thiago!', (SELECT id FROM usuarios WHERE username = 'maria'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'maria') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'thiago'))),
('Oi Maria! Tudo bem?', (SELECT id FROM usuarios WHERE username = 'thiago'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'maria') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'thiago'))),
('Tudo ótimo, e você?', (SELECT id FROM usuarios WHERE username = 'maria'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'maria') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'thiago')));

-- Inserção de um novo usuário
INSERT INTO usuarios (username, senha, nome_completo, apelido) VALUES
('carlos', 'senha123', 'Carlos Pereira', 'Carlão');

-- Inserção de uma nova conversa entre Carlos e Thiago
INSERT INTO conversas (fk_user_to, fk_user_from) VALUES
((SELECT id FROM usuarios WHERE username = 'carlos'), (SELECT id FROM usuarios WHERE username = 'thiago'));

-- Inserção de mensagens para a conversa entre Carlos e Thiago
INSERT INTO historicos (mensagem, fk_user, fk_conversa_id) VALUES
('Oi Thiago!', (SELECT id FROM usuarios WHERE username = 'carlos'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'carlos') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'thiago'))),
('Oi Carlos! Como vai?', (SELECT id FROM usuarios WHERE username = 'thiago'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'carlos') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'thiago'))),
('Tudo bem, e você?', (SELECT id FROM usuarios WHERE username = 'carlos'), (SELECT id FROM conversas WHERE fk_user_to = (SELECT id FROM usuarios WHERE username = 'carlos') AND fk_user_from = (SELECT id FROM usuarios WHERE username = 'thiago')));
