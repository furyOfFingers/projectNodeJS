const http = require("http");
const fs = require("fs");
const path = require("path");
const { parse } = require('querystring');
const bodyParser = require('body-parser');



const server = http.createServer((req, res) => {
  let argFilePath;

  switch (req.url) {
    case "/?log=admin&pas=admin":
      argFilePath = "home.html";
      break;

    case "/":
      argFilePath = "index.html";
      break;

    default:
      argFilePath = req.url;
  }
  console.log(req.url, "req.url");
  let filePath = path.join(__dirname, "public", argFilePath);
  const ext = path.extname(filePath);
  let contentType = "text/html";

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    default:
      contentType = "text/html";
  }

  if (!ext) {
    filePath += ".html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, "public", "error.html"), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html"
          });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, {
        "Content-Type": contentType
      });
      res.end(content);
    }
  });

  let body;
  //прием, который надо вынести
  if (req.method === "POST") {
    console.log(req.method, "method");
    req.on("data", function(data) {
      body = data;
    });

    req.on("end", function() {
      // console.log('parseBody', parse(body));
      console.log('body["log"], body["pas"]', body['log'], body['pas']);
      console.log('body.log, body.pas', body.log, body.pas);
      console.log("typeof Body: " + typeof body);
      console.log("Body: " + body);
      console.log("log and pas", body.log, body.pas);
      console.log('stringornot', body[0], body[1])
      // response.writeHead(200, { "Content-Type": "text/html" });
    });
    for(let el in body) {
      console.log('let el in body', el)
    }
    // for(let el of body) {
    //   console.log('let el of body', el)
    // }
    if (body && body.log == "admin" && body && body.pas == "admin") {
      console.log("WOWWOWWOW");
    }
  }

  // server.use(bodyParser.json());
  // server.use(bodyParser.urlencoded({ extended: true }));

  // server.get('/user', function (req, res, next) {
  //   let data = req.body;

  //   data.forEach(function (el) {
  //     console.log(el.log);
  //     console.log(el.pas);
  //   });
  // });
});

const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 8888;

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server has been started on http://${HOSTNAME}:${PORT}/`);
});
