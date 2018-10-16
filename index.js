const appVersion = 'v0.0.1';

const validCommands = {
  help: {
    flag: '--help',
    action: function() {
      console.log(this.message);
    },
    description: `печатает этот текст`
  },
  version: {
    flag: '--version',
    action() {
      console.log(appVersion);
    },
    description: `печатает версию приложения`
  },
  projectName: {
    flag: '--app-name',
    action: function() {
      console.log('Супер приложение Кексобукинг');
    },
    description: `печатает название приложения`
  },
  author: {
    flag: '--app-author',
    action: function() {
      console.log('Oleg Koltun');
    },
    description: `печатает имя автора`
  }
};

const enteredFlags = process.argv.filter((item, i) => {
  if (i > 1) {
    return item;
  }
});

function createHelpMessage(validCommands) {
  return Object.keys(validCommands).reduce((accum, com) => {
    return `${accum}
${validCommands[com].flag} - ${validCommands[com].description};`;
  }, ``);
}

validCommands.help.message = createHelpMessage(validCommands);

if (!enteredFlags.length) {
  return console.log('Kekstabooking. Design by Oleg Koltun.');
} else if (enteredFlags.length > 1) {
  return console.log('\x1b[31m', 'Команда не может содержать более одного флага.');
}

function printNotValidMessage(com) {
  const notValidMessage = `Неизвестная команда ${com.flag}.
 Чтобы прочитать правила использования приложения, наберите '--help'`;

  console.log('\x1b[31m', notValidMessage);
}

enteredFlags.forEach((flag) => {
  const coms = Object.keys(validCommands).filter((com) => {
    if (validCommands[com].flag === flag) {
      validCommands[com].action();
      return com;
    }
  });

  if (!coms.length) {
    printNotValidMessage({ flag });
    process.exit(1);
  }
});
