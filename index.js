const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const oracledb = require("oracledb");
const { response } = require("express");
const app = express();
const PORT = 8080;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


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
  async function connect() {
    try {
     const conn = await oracledb.getConnection({
        user: "ebd1es822109",
        password: "Yqejp2",
        connectionString: "CEATUDB02",
      });
      const id = req.body.id;
      const data = new Date()
      //Data
      const dia = String(data.getDate()).padStart(2,'0')
      const mes = String(data.getMonth()).padStart(2,'0')
      const ano = String(data.getFullYear()).padStart(2,'0')
      //Hora
      const hora = data.getHours()
      const minutes = data.getMinutes()
      const seconds = data.getSeconds()

      const dataAtual = `${dia}/${mes}/${ano}`
      const horaAtual = `${hora}:${minutes}:${seconds}`
      
      conn.execute("insert into BILHETE values" + "(:0, :1, :2)",
      [id, horaAtual, dataAtual],
      { autoCommit: true })
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    } catch (err) {
      console.log(err);
   }
  }
  connect();

});

app.listen(PORT, () => {
  console.log("Porta rodando na " + PORT);
});
