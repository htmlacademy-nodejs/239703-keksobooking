'use strict';

const appVersion = `v0.0.1`;

const validCommands = {
  help: {
    flag: `--help`,
    action() {
      console.log(this.message);
    },
    description: `печатает этот текст`
  },
  version: {
    flag: `--version`,
    action() {
      console.log(appVersion);
    },
    description: `печатает версию приложения`
  },
  projectName: {
    flag: `--app-name`,
    action() {
      console.log(`Супер приложение Кексобукинг`);
    },
    description: `печатает название приложения`
  },
  author: {
    flag: `--app-author`,
    action() {
      console.log(`Oleg Koltun`);
    },
    description: `печатает имя автора`
  }
};

const enteredFlags = process.argv.filter((item, i) => {
  if (i > 1) {
    return item;
  }
  return false;
});

function createHelpMessage(commands) {
  return Object.keys(commands).reduce((accum, com) => {
    return `${accum}
${commands[com].flag} - ${commands[com].description};`;
  }, ``);
}

validCommands.help.message = createHelpMessage(validCommands);

if (!enteredFlags.length) {
  console.log(`Kekstabooking. Design by Oleg Koltun.`);
} else if (enteredFlags.length > 1) {
  console.log(`\x1b[31m`, `Команда не может содержать более одного флага.`);
}

function printNotValidMessage(com) {
  const notValidMessage = `Неизвестная команда ${com.flag}.
    Чтобы прочитать правила использования приложения, наберите --help`;

  return console.log(`\x1b[31m`, notValidMessage);
}

enteredFlags.forEach((flag) => {
  const commands = Object.keys(validCommands).filter((com) => {
    if (validCommands[com].flag === flag) {
      validCommands[com].action();
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
