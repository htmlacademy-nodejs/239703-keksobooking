const pacageInfo = require(`../package`);

module.exports = {
  flag: `--licence`,
  description: `печатает тип лицензии`,
  execute() {
    console.log(`${pacageInfo.license}`);
  }
};
