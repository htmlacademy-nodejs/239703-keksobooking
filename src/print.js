'use strict';

const hello = require(`./version`);
const inquirer = require('inquirer');

function printNotValidMessage(com) {
  if (!com) {
    return;
  }

  const notValidMessage = `Неизвестная команда ${com.flag}.
    Чтобы прочитать правила использования приложения, наберите --help`;

  return console.log(`\x1b[31m`, notValidMessage);
}

module.exports = async function (flags, validCommands) {
  if (!flags.length) {
    await printNotValidMessage();

    return process.exit(1);
  }

  return flags.forEach((flag) => {
    const commands = Object.keys(validCommands).filter((com) => {
      if (validCommands[com].flag === flag) {
        validCommands[com].execute();
        return com;
      }
      return false;
    });

    if (!commands.length) {
      printNotValidMessage({flag});
      return process.exit(1);
    }

    return false;
  });
};
