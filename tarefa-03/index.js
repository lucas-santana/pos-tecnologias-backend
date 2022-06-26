const express = require("express");
const path = require('path');

const app = express();

let port = 3000;

app.get("/", (req, res) => {
  res.send("Ola Mundo");
});

app.get("/sobre", (req, res) => {
  res.send("<h1>Página sobre</h1>");
});

app.get("/ab[0-9]cd", (req, res) => {
  res.send("<h1>Padrão correto!</h1>");
});

let cep_module = require("./cep.js");
app.use("/", cep_module);

app.post("/", (req, res) => {
  res.send("Ola Mundo: POST");
});

app.post("/json", (req, res) => {
  res.status(200).json({ usuario: "lucasg4x", nome: "Lucas Santana" });
});

app.get("*", (req, res) => {
  //res.send(`404`);
  res.sendFile(path.join(__dirname+'/404.html'));
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
