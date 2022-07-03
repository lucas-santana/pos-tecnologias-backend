const express = require("express");

const bodyParser = require("body-parser");

const path = require('path');

const app = express();

const port = 3000;

// const middleware = function(req, res, next){
//     console.log("Executando o middleware...");
//     next();
// }

// const getRequestTime =  function(req, res, next){

//     let tempoAtual = Date.now();
//     let hoje = new Date(tempoAtual);

//     req.requestTime =  hoje.toUTCString();
//     next();
// }

// app.use(middleware);
// app.use('/tempo',getRequestTime);

// app.get("/tempo", (req, res) => {
//     res.send(`Tempo: ${req.requestTime}`);
//     console.log("Rota")
//   });

// app.get("/", (req, res) => {

//   res.send("Raiz...");
//   console.log("Rota");
// });

// app.use(bodyParser.urlencoded({ extended: false })); //trazer as informações da requisição de forma simplificada
// app.use("/login", express.static(__dirname + "/public/login"));

// app.post("/login", (req, res) => {
//   console.log("Login: " + req.body.usuario + " Senha: " + req.body.senha);

//   res.redirect('/');
// });


// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));


// app.get('/', (req,res) =>{
//     res.render('index');
// });

app.get("/", (req, res) => {
  res.send("Página principal...");
  console.log("Rota raiz...");
});

app.use(bodyParser.urlencoded({ extended: false })); //trazer as informações da requisição de forma simplificada

app.use("/contato", express.static(__dirname + "/public/contact"));

app.post("/contato", (req, res) => {
  console.log("Usuário: " + req.body.txtName);
  console.log("E-mail: " + req.body.txtEmail) ;
  console.log("Mensagem: " +req.body.txtMsg);

  res.redirect('/');
});

app.get("*", (req, res) => {
    //res.send(`404`);
    res.sendFile(path.join(__dirname+'/public/404.html'));
  });
  
app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
