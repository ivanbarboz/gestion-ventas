const mysql = require("mysql2/promise");

const validPool = mysql.createPool({
  host: "switchyard.proxy.rlwy.net",
  user: "root",
  password: "DcJqlLrDnySjhFiWqDzBpTCWzZATsoWZ",
  database: "railway",
  port: 36026,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection(pool) {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
}

describe("Test 01: Pruebas de conexión con la base de datos", () => {
  it("Debería conectar exitosamente a la base de datos", async () => {
    const result = await testConnection(validPool);
    expect(result).toBe(true);
  });

  it("Debería fallar la conexión si los datos son incorrectos", async () => {
    const invalidPool = mysql.createPool({
      host: "switchyard.proxy.rlwy.net",
      user: "usuario_invalido",
      password: "contraseña_invalida",
      database: "railway",
      port: 36026,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const result = await testConnection(invalidPool);
    expect(result).toBe(false);

    await invalidPool.end();
  });

  afterAll(() => {
    validPool.end();
  });
});
