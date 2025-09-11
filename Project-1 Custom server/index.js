const http = require("http");

const port = 9999;

const fs = require("fs");
const requestHandler = (req, res) => {
    let filename = "";
   

    switch (req.url) {
        case "/":
            filename = "./home.html";
            break;
        case "/about":
            filename = "./about.html";
            break;
        case "/contact":
            filename = "./contact.html";
            break;
        case "/blog":
            filename = "./blog.html";
            break;
        default:
            filename = "./error.html";
            break;
    }

    fs.readFile(filename, (err, result) => {
        if (err) {
            console.log("File not found");
            res.writeHead(404);
            return res.end("404 - Page Not Found");
        }
        res.end(result);
    });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
     if (err) {
          console.log("Server not started");
          return false;
     }
     console.log(`server started on port: - ${ port }`);
});