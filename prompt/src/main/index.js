import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import output from './output'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // ipcMain.on('adb', () => {
  //   output();
  //   console.log('output')
  // })

  ipcMain.handle('adb', async (event, a) => {
    a = 'im here in react '
    return a
  })
  // ipcMain.handle('command', async(event, serializedCommand) => {
  //   console.log(serializedCommand)
  //   const { command } = JSON.parse(serializedCommand);
  //   console.log('Received command:', command);
  //   // console.log('Received command:', ab);
  //   return JSON.stringify(command);
  // })

  // ipcMain.handle('command', async (event, serializedCommand) => {
  //   const { command } = JSON.parse(serializedCommand)
  //   let res ="";
    
  //   output(command, (commands) => {
  //     //  console.log("out");
  //     // console.log(commands);
  //      res +=commands;
  //     //  console.log(res);
      
  //   })
  //   console.log(output);
  //   return JSON.stringify(output);

    
       
    
  //   // console.log('Received command:', command);
  //   // console.log('Received command:', ab);
  // })

  ipcMain.handle('command', async (event, serializedCommand) => {
    const { command } = JSON.parse(serializedCommand);
    let res = "";

    // Assuming `output` is a function that accepts a command and a callback
    // If `output` is synchronous or already uses a callback pattern,
    // wrap it in a Promise to use `await` properly.
    const outputPromise = new Promise((resolve, reject) => {
        output(command, (commands) => {
            res += commands;
            resolve(res);
        });
    });

    try {
        const result = await outputPromise;
        console.log(result);
        return JSON.stringify(result);
    } catch (error) {
        console.error("Error executing command:", error);
        return JSON.stringify({ error: error.message });
    }
});

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.