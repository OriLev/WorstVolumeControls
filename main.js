const { app, BrowserWindow, ipcMain: ipc } = require('electron')
const path = require('path')
const url = require('url')

ipc.on('message', function(event, message) {
    const volume = parseInt(message);
    const nirCmdVolume = 65553 / 100 * volume;
    require("child_process").exec(`nircmd.exe setsysvolume ${nirCmdVolume}`);
})

ipc.on('mute', function(event, message) {
    const muteState = parseInt(message);
    console.log(message);
    require("child_process").exec(`nircmd.exe mutesysvolume ${muteState}`);
})

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

app.on('ready', createWindow)
console.log('Running!')