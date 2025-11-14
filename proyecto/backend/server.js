const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3002;

// Middlewares
app.use(express.json());
app.use(cors());

// Configuración del Pool de Conexiones a MySQL para mayor rendimiento
const dbConfig = {
  host: "localhost",
  user: "root", // Usuario por defecto en XAMPP
  password: "", // Contraseña por defecto en XAMPP
  database: "escuela_db", // El nombre que le diste a tu BD
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// --- Rutas de Autenticación ---
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos." });
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM usuarios WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    // No enviar la contraseña de vuelta al cliente
    const { password: hashedPassword, ...userData } = user;
    res.json({ message: "Login exitoso", user: userData });
  } catch (err) {
    console.error("Error en el login:", err);
    res.status(500).json({ message: "Error en el servidor durante el login." });
  }
});

// --- Rutas API para Alumnos ---

// Función de ayuda para limpiar datos vacíos
const sanitizeData = (data) => {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sanitized[key] === "") {
      sanitized[key] = null;
    }
  }
  return sanitized;
};

app.get("/api/alumnos", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM alumnos ORDER BY nombre ASC");
    // El frontend espera un campo `_id`. MySQL usa `id`. Hacemos el mapeo.
    const alumnos = rows.map((alumno) => ({ ...alumno, _id: alumno.id }));
    res.json(alumnos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener los alumnos" });
  }
});

app.post("/api/alumnos", async (req, res) => {
  try {
    const alumnoData = sanitizeData(req.body);
    const fields = Object.keys(alumnoData);
    const values = Object.values(alumnoData);
    const placeholders = fields.map(() => "?").join(", ");

    const sql = `INSERT INTO alumnos (${fields.join(", ")}) VALUES (${placeholders})`;

    const [result] = await pool.execute(sql, values);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("Error en POST /api/alumnos:", err);
    res.status(500).json({ message: "Error al agregar el alumno" });
  }
});

app.put("/api/alumnos/:id", async (req, res) => {
  try {
    const alumnoId = req.params.id;
    const { _id, ...requestBody } = req.body;
    const alumnoData = sanitizeData(requestBody);

    const fieldsToUpdate = Object.keys(alumnoData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(alumnoData), alumnoId];

    const sql = `UPDATE alumnos SET ${fieldsToUpdate} WHERE id = ?`;

    const [result] = await pool.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.json({ message: "Alumno actualizado correctamente" });
  } catch (err) {
    console.error("Error en PUT /api/alumnos:", err);
    res.status(500).json({ message: "Error al actualizar el alumno" });
  }
});

app.delete("/api/alumnos/:id", async (req, res) => {
  try {
    const alumnoId = req.params.id;
    const [result] = await pool.execute("DELETE FROM alumnos WHERE id = ?", [alumnoId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.json({ message: "Alumno eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el alumno" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend con MySQL corriendo en http://localhost:${PORT}`);
  // Verifica la conexión al pool
  pool.getConnection()
    .then(connection => {
      console.log("✅ Conectado a MySQL a través del pool.");
      connection.release();
    })
    .catch(err => console.error("❌ Error de conexión al pool de MySQL:", err.message));
});
