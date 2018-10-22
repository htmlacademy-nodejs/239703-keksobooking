'use strict';

const help = require(`./src/help`);
const version = require(`./src/version`);
const appName = require(`./src/app-name`);
const appAuthor = require(`./src/app-author`);
const licence = require(`./src/licence`);
const description = require(`./src/description`);
const printCommands = require(`./src/print`);
const dialog = require(`./src/dialog`);
const server = require(`./src/server`);

const validCommands = {
  help,
  version,
  appName,
  appAuthor,
  licence,
  description,
  server
};

let customPort;

const enteredFlags = process.argv.filter((item, i) => {
  if (i === 2) {
    return item;
  }

  if (i === 3) {
    customPort = item;
  }
  return false;
});

if (enteredFlags.length) {
  printCommands(enteredFlags, validCommands, customPort);
} else {
  dialog();
}
