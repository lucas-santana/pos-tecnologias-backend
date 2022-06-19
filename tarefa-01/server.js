const http = require("http");

const hostname = "127.0.0.1";

const port = 3000;

http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type':'text-plain'});
    res.write(req.url);
    res.write("Olá Mundo...")
    res.end();
}).listen(port, hostname, () =>{
    console.log(`O servidor está sendo executado em http://${hostname}:${port} `)
});
