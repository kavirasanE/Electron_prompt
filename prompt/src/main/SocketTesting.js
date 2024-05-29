// const WebSocket = require('ws');
// const { app, BrowserWindow } = require('electron');
// function SocketTesting () {
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true
//         }
//     });

//     mainWindow.loadURL('http://localhost:5173'); // Your React frontend URL

//     // Create WebSocket server
//     const wss = new WebSocket.Server({ port: 4000 });

//     wss.on('connection', (ws) => {
//         console.log('WebSocket client connected');

//         // Handle WebSocket messages
//         ws.on('message', (message) => {
//             console.log('Received message:', message);

//             // Handle the message as needed
//         });

//         // Example: Sending a message to the client
//         ws.send('Hello from the WebSocket server');
//     });
 
// }









// "start": "concurrently \"npm run start:electron\" \"npm run start:websocket\"",
// "start:electron": "electron-vite preview",
// "start:websocket": "node ./src/main/SocketTesting.js",
// "dev": "concurrently \"npm run start:electron\" \"npm run start:websocket\"",