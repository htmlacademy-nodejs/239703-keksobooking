const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const Path = require(`path`);

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const hostname = `127.0.0.1`;
const port = 3000;

const types = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'ico': `image/x-icon`,
  'png': `image/png`
};

// const setContentType = (path, res, files) => {
//   console.log(path, files);
//   files.forEach((f) => {
//     if (f.includes(`.`)) {
//       const type = Object.keys(types).find((t) => {
//         if (t === Path.extname(f).slice(1)) {
//           return t;
//         }
//       });
//
//       res.setHeader('content-type', types[type]);
//       res.end(f);
//     }
//     else {
//       readDir(path + `${f}/`, res);
//     }
//   });
// };

const readFile = async (path, res) => {
  const data = await readfile(path);
  res.end(data);
};

const readDir = async (path, res) => {
  const files = await readdir(path);
  res.end(files);
};

const server = http.createServer((req, res) => {
  const localPath = '/static' + url.parse(req.url).pathname;
  const absolutePath = __dirname + localPath;

  (async () => {
    try {
      const pathStat = await stat(absolutePath);
      console.log(pathStat);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readFile(`${absolutePath}index.html`, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'Content-Type': `text/plain`
    });
    res.end(e.message);
  });
});

const serverAddress = `http://${hostname}:${port}`;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${serverAddress}`)
});
