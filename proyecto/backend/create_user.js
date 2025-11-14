const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbConfig = {
    host: 'localhost', user: 'root', password: '', database: 'escuela_db'
};
const saltRounds = 10;

async function createUser() {
    let connection;
    try {
        // --- ¡Personaliza tu usuario aquí! ---
        const username = 'admin';
        const password = 'admin'; // ¡IMPORTANTE! Cambia esto por una contraseña segura
        const nombre = 'Administrador';
        // ------------------------------------

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        connection = await mysql.createConnection(dbConfig);

        const sql = `INSERT INTO usuarios (username, password, nombre) VALUES (?, ?, ?)`;
        await connection.execute(sql, [username, hashedPassword, nombre]);

        console.log(`✅ Usuario '${username}' creado exitosamente.`);
        console.log(`   (La contraseña para iniciar sesión es: ${password})`);

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.error(`❌ Error: El usuario '${error.sqlMessage.split("'")[1]}' ya existe.`);
        } else {
            console.error('❌ Error al crear el usuario:', error);
        }
    } finally {
        if (connection) await connection.end();
    }
}

createUser();
