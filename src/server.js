'use strict';

const colors = require(`colors/safe`);
const server = require(`../server`);

module.exports = {
  flag: `--server`,
  description: `запускает север приложения на порту 3000`,
  execute() {
    const hostname = `127.0.0.1`;
    const port = 3000;
    const serverAddress = `http://${hostname}:${port}`;

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${serverAddress}`)
    });
  }
};
