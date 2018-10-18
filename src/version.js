'use strict';

const colors = require(`colors/safe`);
const pacageInfo = require(`../package`);

function highlightVersion(version) {
  return version.split(`.`).reduce((message, symbol, i) => {
    if (i === 0) {
      return `${colors.red(symbol)}`;
    } else if (i === 1) {
      return `${message}.${colors.green(symbol)}`;
    } else if (i === 2) {
      return `${message}.${colors.blue(symbol)}\n`;
    }
    return message;
  }, ``);
}

module.exports = {
  flag: `--version`,
  description: `печатает версию приложения`,
  execute() {
    console.log(highlightVersion(pacageInfo.version));
  }
};
