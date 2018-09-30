const validCoomands = [
    {
        flag: '--help',
        message: `Доступные команды:
        --help    — печатает этот текст;
        --version — печатает версию приложения;`
    },
    {
        flag: '--version',
        message: 'v0.0.1'
    }
];

const emnteredFlaggs = process.argv.filter((item, i) => {
    if (i > 1) {
        return item;
    }
});

if (!emnteredFlaggs.length) {
    return console.log('Kekstabooking. Design by Oleg Koltun.');
}

function printMessage(com) {
    console.log(com.message);
}

function printNotValidMessage(com) {
    const notValidMessage = `Неизвестная команда ${com.flag}.
 Чтобы прочитать правила использования приложения, наберите "--help"`;

    console.log("\x1b[31m", notValidMessage, "\x1b[31");
}

emnteredFlaggs.forEach((flag) => {
    const coms = validCoomands.filter((com) => {
        if(com.flag === flag) {
            printMessage(com);
            return com;
        }
    });

    if (!coms.length) {
        printNotValidMessage({ flag })
        process.exit(1);
    }
});
