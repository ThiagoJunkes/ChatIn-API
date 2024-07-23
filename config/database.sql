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
    p_username VARCHAR,
    p_senha VARCHAR
)
RETURNS VARCHAR AS $$
DECLARE
    v_count INT;
    v_user_id INT;
    v_random_string VARCHAR;
    p_token VARCHAR;
BEGIN
    -- Verificar se o login e senha correspondem a um usuário na tabela
    SELECT COUNT(*), id INTO v_count, v_user_id
    FROM usuarios
    WHERE username = p_username AND senha = p_senha;

    -- Se o usuário for encontrado, gerar um token
    IF v_count = 1 THEN
        -- Gerar uma string aleatória de 8 caracteres
        v_random_string = SUBSTRING(MD5(RANDOM()::TEXT), 1, 8);

        -- Criar o token no formato "username-hash"
        p_token = CONCAT(p_username, '-', v_random_string);

        -- Atualizar a tabela usuarios com o novo token
        UPDATE usuarios
        SET token = p_token
        WHERE id = v_user_id;

        RETURN p_token;
    ELSE
        -- Se o usuário não for encontrado, retornar NULL
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql;