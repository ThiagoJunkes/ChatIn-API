-- Criação da tabela 'usuarios'
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    nome_completo VARCHAR(100) NOT NULL,
    apelido VARCHAR(50),
    token VARCHAR(255)
);

-- Criação da tabela 'conversas'
CREATE TABLE conversas (
    id SERIAL PRIMARY KEY,
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_to INT NOT NULL,
    fk_user_from INT NOT NULL,
    FOREIGN KEY (fk_user_to) REFERENCES usuarios(id),
    FOREIGN KEY (fk_user_from) REFERENCES usuarios(id)
);

-- Criação da tabela 'historicos'
CREATE TABLE historicos (
    id SERIAL PRIMARY KEY,
    mensagem TEXT NOT NULL,
    fk_user INT NOT NULL,
    fk_conversa_id INT NOT NULL,
    dt_msg_send TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_msg_received TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (fk_user) REFERENCES usuarios(id),
    FOREIGN KEY (fk_conversa_id) REFERENCES conversas(id)
);

-- Função para gerar token de login
CREATE OR REPLACE FUNCTION gerar_token(
    p_username VARCHAR(50),
    p_senha VARCHAR(255)
) RETURNS VARCHAR(255) AS $$
DECLARE
    v_user_id INT;
    v_random_string VARCHAR(8);
    p_token VARCHAR(255);
BEGIN
    -- Tentar buscar o ID do usuário com o login e senha fornecidos
    SELECT id INTO v_user_id
    FROM usuarios
    WHERE username = p_username AND senha = p_senha
    LIMIT 1;

    -- Se o usuário for encontrado (v_user_id não for nulo), gerar um token
    IF v_user_id IS NOT NULL THEN
        -- Gerar uma string aleatória de 8 caracteres
        v_random_string := SUBSTRING(MD5(RANDOM()::TEXT), 1, 8);

        -- Criar o token no formato "username-hash"
        p_token := p_username || '-' || v_random_string;

        -- Atualizar a tabela usuarios com o novo token
        UPDATE usuarios
        SET token = p_token
        WHERE id = v_user_id;
    ELSE
        -- Se o usuário não for encontrado, retornar NULL
        p_token := NULL;
    END IF;

    -- Retornar o token gerado ou NULL
    RETURN p_token;
END;
$$ LANGUAGE plpgsql;
