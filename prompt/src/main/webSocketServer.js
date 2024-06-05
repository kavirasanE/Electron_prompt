const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
import adbShellCommands from './adb/adbShellCommands';


function webSocketServer () {
wss.on('connection', (ws) => {
  console.log('Client connected');

//   const sendUpdates = () => {
    adbShellCommands('dumpsys', (result) => {
        // console.log(result);
      ws.send(JSON.stringify(result));
    });
//   };

//   const intervalId = setInterval(sendUpdates, 1000);

  ws.on('close', () => {
    // clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

}


export default webSocketServer


