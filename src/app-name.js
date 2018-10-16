'use strict';

const colors = require(`colors/safe`);

module.exports = {
  flag: `--app-name`,
  description: `печатает название приложения`,
  execute() {
    console.log(colors.yellow(`Супер приложение Кексобукинг`));
  }
};
