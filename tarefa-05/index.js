const express = require("express");
const app = express();

const mongoose = require("mongoose"); //biblioteca para fazer a conexão entre o MongoDB e a aplicação Nodejs
const db_access = require("./setup/db").mongoURL;

mongoose
  .connect(db_access, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão bem sucedida"))
  .catch((err) => console.log(err));

//-------------------- LOGIN -------------
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const auth = require("./routes/auth");

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = 3000;

app.listen(port, () => console.log(`Executando na porta ${port}`));
