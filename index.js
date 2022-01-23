const { app, BrowserWindow, Menu } = require("electron");
const { program } = require("commander");
program.version("1.0.2", "-v, --version", "バージョンを表示します");
program
    .option("-u --url <letter>", "URLをしていします")
    .option("-d --debug", "デバッグを有効にします")
    .option("-w --width <number>", "ウインドウの横幅を指定します")
    .option("-h --height <number>", "ウインドウの縦幅を指定します")
    .option("-r --resizable", "ウインドウのリサイズを指定します")
    .option("-t --title <letter>", "ウインドウのタイトルを指定します")
    .option("-f --fullscreen", "ウインドウをフルスクリーンにします")
    .option("-web --webpreferences <letter>", "webPreferencesを設定します");

const createWindow = (url = "https://earth.renorari.net/", width = 800, height = 600 , title = "WebWindow", webPreferences = {}, fullscreen = false,resizable = true, debug = false) => {
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: webPreferences,
        autoHideMenuBar: true,
        fullscreen: fullscreen,
        title: title,
        resizable: resizable
    });
    mainWindow.removeMenu();
    mainWindow.loadURL(url);
    if (debug) mainWindow.webContents.openDevTools();
    return mainWindow;
};

app.whenReady().then(() => {
    program.parse(process.argv);
    const options = program.opts();

    createWindow(options.url, Number(options.width), Number(options.height),options.title, JSON.stringify(options.webPreferences), options.fullscreen , options.resizable, options.debug);
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
