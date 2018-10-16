const version = require(`./version`);

function printNotValidMessage(com) {
  if (!com) {
    return version.execute();
  }

  const notValidMessage = `Неизвестная команда ${com.flag}.
    Чтобы прочитать правила использования приложения, наберите --help`;

  return console.log(`\x1b[31m`, notValidMessage);
}

module.exports = function(flags, validCommands) {
  if (!flags.length) {
    printNotValidMessage() ;

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
