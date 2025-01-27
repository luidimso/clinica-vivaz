const { app, BrowserWindow } = require('electron')

const ignoredNode = /node_modules|[/\\]\./;
const ignored1 = /db|[/\\]\./;
const ignored2 = /db-backup|[/\\]\./;
// Enable live reload for Electron too
require('electron-reload')(__dirname, {ignored: [ignoredNode, ignored1, ignored2] });

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('home.html');
  win.setMenuBarVisibility(true);
  //const devtools = new BrowserWindow()
  //win.webContents.setDevToolsWebContents(devtools.webContents)
  //win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
