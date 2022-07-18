const express = require("express");
const path = require('path');
const app = express();
const bodyparser = require("body-parser");


const port = 3000;

const mongoose = require("mongoose"); //biblioteca para fazer a conexão entre o MongoDB e a aplicação Nodejs
const db_access = require("./setup/db").mongoURL;

mongoose
  .connect(db_access, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão bem sucedida"))
  .catch((err) => console.log(err));


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const auth = require("./routes/auth");
const comentario = require("./routes/comentario");

app.use("/auth", auth);
app.use("/comentario", comentario);
app.use("/contato", express.static(__dirname + "/public/contact"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("*", (req, res) => {
  //res.send(`404`);
  res.sendFile(path.join(__dirname+'/public/404.html'));
});



app.listen(port, () => console.log(`Executando na porta ${port}`));
