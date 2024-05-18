const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const url = require('url');
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      preload: path.join(__dirname, 'preload.js')
    }

  })
  mainWindow.webContents.openDevTools();

  // win.loadFile('index.html')
  const startUrl = url.format({
    // pathname: path.join(__dirname, 'index.html'),
    pathname: path.join(__dirname, './app/dist/index.html'),
    protocol: 'file',
  });

  // mainWindow.loadURL('http://localhost:5173/');
  mainWindow.loadURL(startUrl)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})