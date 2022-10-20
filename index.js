const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const oracledb = require("oracledb");
const app = express();
const PORT = 8080;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
let conn;

// async function connect() {
//   try {
//     conn = await oracledb.getConnection({
//       user: "hr",
//       password: "hr",
//       connectionString: "localhost/orcl",
//     });
//     const data = await connn.execute("SELECT * FROM tabela");
//     console.log(data.rows);
//   } catch (err) {
//     console.log(err);
//   }
// }

// connect();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

app.post("/", (req, res) => {
  const id = req.body.id;
  const date = Date.now();
  const hour = Date.hour();
  console.log(date);
  // conn.execute(`INSERT INTO tabela VALUES(5, rafael)`);
});

app.listen(PORT, () => {
  console.log("Porta rodando na " + PORT);
});
