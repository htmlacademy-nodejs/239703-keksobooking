'use strict';

const colors = require(`colors/safe`);
const pacageInfo = require(`../package`);

function highlightVersion(version) {
  return version.split(".").reduce((str, symbol, i) => {
    if (i === 0) {
      return `${colors.red(symbol)}`;
    } else if (i === 1) {
      return `${str}.${colors.green(symbol)}`
    } else if (i === 2) {
      return `${str}.${colors.blue(symbol)}\n`
    }
  }, '');
}

module.exports = {
  flag: `--version`,
  description: `печатает версию приложения`,
  execute() {
    console.log(highlightVersion(pacageInfo.version));
  }
};
