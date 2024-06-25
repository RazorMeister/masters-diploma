require("dotenv").config();

const { initDb } = require("./db.js");
const { initExpress } = require("./express.js");

(async () => {
  await initDb();
  await initExpress();
})();
