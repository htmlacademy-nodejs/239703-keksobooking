'use strict';
const colors = require(`colors/safe`);

module.exports = {
  flag: `--app-author`,
  description: `печатает имя автора`,
  execute() {
    console.log(colors.rainbow(`Oleg Koltun`));
  }
};
