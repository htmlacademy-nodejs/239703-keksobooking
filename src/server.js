const http = require(`http`);

const hostname = `127.0.0.1`;
const port = 8080;

const server = http.createServer((req, res) => {
  res.status = 200;
  res.setHeader(`Content-Type`, `text/plain`);
  res.end(`Hello world!\n`)
});

server.listen(port, hostname, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Serer running at http://${hostname}:${port}`)
});

module.exports = server;
