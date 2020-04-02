const http = require("http");
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  let argFilePath;
  /** В зависимости от url присваивает имя файла для открытия. */
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

  let body = {};
  //надо вынести
  if (req.method === "POST") {
    console.log(req.method, "method");
    req.on("data", (data) => {
      body = JSON.parse(data);
    });

    req.on("end", () => {
      console.log(`endBody: body.log-${body.log}; body.pas-${body.pas}`);
      if (body.log === 'admin' && body.pas === 'admin') {

        const data = JSON.stringify({
          todo: 'Buy the milk'
        })

        const options = {
          hostname: '127.0.0.1',
          port: 8888,
          path: '/home',
          method: 'POST',
          headers: {
            'Content-Type': "text/html",
            'Content-Length': data.length
          }
        }

        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)

          res.on('data', (d) => {
            process.stdout.write(d)
          })
        })

        req.on('error', (error) => {
          console.error(chalk.bgRed(error,' error with post request from server'))
        })

        req.write(data)

        console.log('hell YEEE')
      }
    });
  }
});
const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 8888;
server.listen(PORT, HOSTNAME, () => {
  console.log(chalk.bgGreen(`Server has been started on http://${HOSTNAME}:${PORT}/`));
});
