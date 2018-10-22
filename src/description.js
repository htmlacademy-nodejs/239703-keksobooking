'use strict';

const pacageInfo = require(`../package`);

module.exports = {
  flag: `--description`,
  description: `печатает тип лицензии`,
  execute() {
    console.log(`${pacageInfo.description}`);
  }
};
