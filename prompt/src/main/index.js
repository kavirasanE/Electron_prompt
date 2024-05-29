import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import output from './output'
import trackDevice from './trackDevice'
// const WebSocket = require('ws');
// import WebSocket from 'ws'
// import path from 'path'
// import cors from "cors";
// const path = require('path');

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

  // ipcMain.handle('connect', async (event, command) => {
  //   var adb = require('adbkit')
  //   var client = adb.createClient({ host: '127.0.0.1', port: 5037 })
  //   client
  //     .trackDevices()
  //     .then(function (tracker) {
  //       tracker.on('add', function (device) {
  //         console.log('Device %s was plugged in', device.id)
  //         return device.id
  //       })
  //       tracker.on('remove', function (device) {
  //         console.log('Device %s was unplugged', device.id)
  //         return device.id
  //       })
  //       tracker.on('end', function () {
  //         console.log('Tracking stopped')
  //       })
  //     })
  //     .catch(function (err) {
  //       console.error('Something went wrong:', err.stack)
  //     })
  //   console.log('hello from tracking')
  // })

  // trackDevice()
  ipcMain.handle('adb', async (event, a) => {
    a = 'im here in react '
    return a
  })

  
const adb = require('adbkit');

ipcMain.handle('connect', async (event, command) => {
    return new Promise((resolve, reject) => {
        var client = adb.createClient({ host: '127.0.0.1', port: 5037 });
        client.trackDevices()
            .then(function (tracker) {
                tracker.on('add', function (device) {
                    console.log('Device %s was plugged in', device.id);
                    resolve(device.id); // Resolve with device.id when a device is added
                });
                tracker.on('remove', function (device) {
                    console.log('Device %s was unplugged', device.id);
                    // You might want to handle removal here or resolve with some indicator if needed
                });
                tracker.on('end', function () {
                    console.log('Tracking stopped');
                    // You might want to handle end of tracking here or resolve with some indicator if needed
                });
            })
            .catch(function (err) {
                console.error('Something went wrong:', err.stack);
                reject(err); // Reject the promise if an error occurs
            });
        console.log('hello from tracking');
    });
});
















  ipcMain.handle('command', async (event, serializedCommand) => {
    const { command } = JSON.parse(serializedCommand)
    let res = ''
    const outputPromise = new Promise((resolve, reject) => {
      output(command, (commands) => {
        res += commands
        resolve(res)
      })
    })
    try {
      const result = await outputPromise
      console.log(result)
      return JSON.stringify(result)
    } catch (error) {
      console.error('Error executing command:', error)
      return JSON.stringify({ error: error.message })
    }
  })

  // ipcMain.handle('command', async (event, serializedCommand) => {
  //   const wss = new WebSocket.Server({ port: 4000 })

  //   wss.on('connection', (ws) => {
  //     console.log('Client connected')

  //     ws.on('message', (message) => {
  //       const { command } = JSON.parse(message)
  //       let res = ''

  //       // Assuming `output` is a function that accepts a command and a callback
  //       const outputPromise = new Promise((resolve, reject) => {
  //         output(command, (commands) => {
  //           res += commands
  //           resolve(res)
  //         })
  //       })

  //       outputPromise
  //         .then((result) => {
  //           ws.send(JSON.stringify(result))
  //         })
  //         .catch((error) => {
  //           console.error('Error executing command:', error)
  //           ws.send(JSON.stringify({ error: error.message }))
  //         })
  //     })

  //     ws.on('close', () => {
  //       console.log('Client disconnected')
  //     })

  //     // Example: Sending a message to the client
  //     ws.send('Hello from the WebSocket server')
  //   })
  // })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

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
