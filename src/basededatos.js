const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./llaves');

        //tipo hilos
const pool = mysql.createPool(database);
    //aqui se llama a la conexion
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexion a la base de datos cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Demasiadas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Conexion a la base de datos rechazada');
        }
    }
    if (connection) connection.release();
    console.log('Conectado a la base de datos :)');



    return;    
});
        //aqui es el async await
        //callbacks en promesas
pool.query = promisify(pool.query);

module.exports = pool;