'use strict';

const version = require(`./version`);
const appName = require(`./app-name`);
const appAuthor = require(`./app-author`);
const licence = require(`./licence`);
const description = require(`./description`);

function createHelpMessage(commands) {
  return Object.keys(commands).reduce((accum, com) => {
    return `${accum}
${commands[com].flag} - ${commands[com].description};`;
  }, ``);
}

const helpCommand = {
  flag: `--help`,
  description: `печатает этот текст`,
  execute() {
    console.log(this.message);
  }
};

helpCommand.message = createHelpMessage({version, appName, appAuthor, licence, description});

module.exports = helpCommand;
