const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 3000;

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  woff: "font/woof",
  ico: "image/x-icon", //adicionei esse mimetype
};

http
  .createServer((req, res) => {
    let acessoUri = url.parse(req.url).pathname;
    let caminhoCompletoRecurso = path.join(process.cwd(), decodeURI(acessoUri));

    let recursoCarregado;

    try {
      recursoCarregado = fs.lstatSync(caminhoCompletoRecurso); //cria um ponteiro para o arquivo a ser acessado

      if (recursoCarregado) {
        if (recursoCarregado.isFile()) {
          console.log(path.extname(caminhoCompletoRecurso).substring(1));
          let mimeType =
            mimeTypes[path.extname(caminhoCompletoRecurso).substring(1)];

          res.writeHead(200, { "Content-Type": mimeType });
          let fluxoArquivo = fs.createReadStream(caminhoCompletoRecurso);
          fluxoArquivo.pipe(res);
        } else if (recursoCarregado.isDirectory()) {
          //procurando pelo index html
          //302 código de redirecionamento
          res.writeHead(302, { Location: "/index.html" });
          res.end();
        }
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("500: Erro interno do servidor!");
        res.end();
      }
    } catch (error) {
      console.log(error);
      res.writeHead(302, { Location: "/404.html" });
      res.end();
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
  });
