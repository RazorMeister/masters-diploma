const mysql = require("mysql2/promise");

let db;

const initDb = async () => {
  // Create the connection to database
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 5_000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      namedPlaceholders: true,
      timezone: "+00:00",
    });

    console.log(`Connected to database ${process.env.DB_DATABASE}`);
  } catch (e) {
    console.error(e);
  }
};

const getDb = () => db;

const getComments = async (postId) => {
  const [comments] = await db.query(
    "SELECT * FROM comments WHERE post_id = ? ORDER BY id DESC",
    [postId],
  );

  return comments;
};

const insertComment = async (postId, content) => {
  await db.query(
    "INSERT INTO comments (post_id, content) VALUES (:postId, :content)",
    {
      postId,
      content,
    },
  );
};

module.exports = {
  getDb,
  initDb,
  getComments,
  insertComment,
};
