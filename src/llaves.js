module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: 'tusojosnegros',
        database: 'Usuarios'
    }
};

/*
Ejecute la siguiente consulta en MYSQL Workbench
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
Donde root como su usuario localhost como su URL y password como su contraseña
Luego ejecute esta consulta para actualizar los privilegios:
flush privileges;
Intente conectarse usando el nodo después de hacerlo.
Si eso no funciona, inténtelo sin @'localhost'.
*/