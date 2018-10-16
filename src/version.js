const pacageInfo = require(`../package`);

module.exports = {
  flag: `--version`,
  description: `печатает версию приложения`,
  execute() {
    console.log(pacageInfo.version);
  }
};
