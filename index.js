const help = require(`./src/help`);
const version = require(`./src/version`);
const appName = require(`./src/app-name`);
const appAuthor = require(`./src/app-author`);
const licence = require(`./src/licence`);
const description = require(`./src/description`);
const printCommands = require(`./src/print`);

const validCommands = {
  help,
  version,
  appName,
  appAuthor,
  licence,
  description
};

const enteredFlags = process.argv.filter((item, i) => {
  if (i > 1) {
    return item;
  }
  return false;
});


printCommands(enteredFlags, validCommands);
