'use strict';

const genereateData = require(`./data-generator`);
const inquirer = require(`inquirer`);
const fs = require(`fs`);

module.exports = function generateAndSaveData() {
  const data = [];
  inquirer
    .prompt([
      {
        type: `list`,
        name: `generateData`,
        message: `Добрый день. Сгенерировать данные? y/n`,
        choices: [`Yes`, `No`]
      }
    ])
    .then(({generateData}) => {
      if (generateData === `No`) {
        return;
      }

      inquirer
        .prompt([
          {
            type: `input`,
            name: `dataCount`,
            message: `Введите количество данных, которые необходимо сгенерировать.`
          }
        ])
        .then(({dataCount}) => {
          if (+dataCount) {
            for (let i = 0; i < +dataCount; i++) {
              data.push(genereateData());
            }
          }

          inquirer
            .prompt([
              {
                type: `input`,
                name: `fileUrl`,
                message: `Введите путь для сохранения файла`
              }
            ])
            .then(({fileUrl}) => {
              return fs.readFile(fileUrl, (err) => {
                if (err) {
                  writeFile(fileUrl, data);
                } else {
                  inquirer
                    .prompt([
                      {
                        type: `list`,
                        name: `reWriteFile`,
                        message: `Файл ${fileUrl} уже существует. Хотите перезаписать его?`,
                        choices: [`Yes`, `No`]
                      }
                    ]).then(({reWriteFile}) => {
                      if (reWriteFile === `No`) return;

                      writeFile(fileUrl, data);
                    });
                }
              });
            });
        })
    });
};

function writeFile(fileUrl, fileData) {
  return fs.writeFile(fileUrl, JSON.stringify(fileData), (err) => {
    if (err) throw err;

    console.log(`The file was saved!`);
  });
}


