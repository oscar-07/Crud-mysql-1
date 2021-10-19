CREATE  DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    usuario VARCHAR(16) NOT NULL,
    sexo INT(1) NOT NULL,
    telefono INT(10) NOT NULL,
    correo VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    comentarios VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD KEY PRYMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

CREATE TABLE datos(
    id INT(11) NOT NULL,
    titulo VARCHAR(16) NOT NULL,
    url VARCHAR(115) NOT NULL,
    descripcion TEXT NOT NULL,
    user_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);