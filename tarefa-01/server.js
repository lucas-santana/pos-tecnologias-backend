const { rmSync } = require("fs");
const http = require("http");

const hostname = "127.0.0.1";

const port = 3000;

http.createServer((req, res) => {
    
    
    res.writeHead(200,{'Content-Type':'text-plain'});
    
    
    
    res.end("Hello World bbb");
}).listen(port, hostname, () =>{
    console.log(`O servidor está sendo executado em http://${hostname}:${port} `)
});
