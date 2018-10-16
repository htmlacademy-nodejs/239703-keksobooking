'use strict';

const version = require(`./version`);
const appName = require(`./app-name`);
const appAuthor = require(`./app-author`);
const licence = require(`./licence`);
const description = require(`./description`);
const colors = require(`colors/safe`);

function createHelpMessage(commands) {
  return Object.keys(commands).reduce((accum, com) => {
    return `${accum}
${colors.grey(commands[com].flag)} - ${colors.green(commands[com].description)};`;
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
