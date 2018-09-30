const validCommands = [
    '--version',
    '--help'
];
const argv = process.argv;

process.on('exit', (code) => {
    if (code === 1) {
        console.error('Неизвестная команда {{ имя команды }}.');
        console.error('Чтобы прочитать правила использования приложения, наберите "--help"');
    }
});

if (argv.includes('--version')) {
    console.log('v0.0.1');
} else if(argv.includes('--help')) {
    console.log('Доступные команды:');
    console.log('--help    — печатает этот текст;');
    console.log('--version — печатает версию приложения;');

    validCommands.forEach((command) => {
        console.log(command);
    });
} else {
    process.exit(1);
};
