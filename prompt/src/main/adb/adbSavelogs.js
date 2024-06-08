// const Promise = require('bluebird')
// const WebSocket = require('ws')
// const adb = require('adbkit')
// const client = adb.createClient({ host: '127.0.0.1', port: 5037 })
// const wss = new WebSocket.Server({ port: 3000 })
// const fs = require('fs')
// const path = require('path')

// const writeLogtoFile = (fileLocation, log) => {
//   fs.appendFile(fileLocation, log + '\n', (err) => {
//     if (err) {
//       console.log('error in writing file', err)
//     }
//   })
// }
// let fileName = ''
// // Function to handle ADB logs
// const adbSavelogs = (filelocation) => {
//   console.log(filelocation, 'from adbSavelogs')
//     //  fileName += new Date()
//      fileName += fileName.toString()
//   console.log(fileName  ,"file name")
//   const fileLocation = path.join(filelocation,fileName + '.txt')
//   // WebSocket Server connection handler
//   wss.on('connection', (ws) => {
//     console.log('Client connected to WebSocket server')
//     // Handle ADB logs for this connection
//     handleLogs(fileLocation, (result) => {
//       console.log(result)
//       if (result) {
//         console.log(fileLocation)
//         writeLogtoFile(fileLocation, result)
//       }
//       ws.send(JSON.stringify(result))
//     })
//     ws.on('close', () => {
//       console.log('Client disconnected from WebSocket server')
//     })
//   })
// }

// const handleLogs = (fileLocation, callback) => {
//   console.log(fileLocation)
//   let command = [{ FOS: 'logcat -v threadtime' }, { vega: 'journalctl -f' }]
//   let out = command[0].vega
//   console.log(command[0].FOS)
//   client
//     .listDevices()
//     .then((devices) => {
//       console.log(devices)
//       return Promise.map(devices, (device) => {
//         return client.shell(device.id, out).then((stream) => {
//           stream.on('data', (data) => {
//             fileName += device.id
//             // console.log(fileName)
//             // console.log(typeof fileName)
//             //  console.log(data,"from stream on this is buffer make use of this and use message pack to encode")
//             const result = data.toString().trim()
//             if (result.includes('undefined: not found')) {
//               return client.shell(device.id, command[0].FOS).then((stream) => {
//                 stream.on('data', (data) => {
//                   const result = data.toString().trim()
//                   // console.log(result,"stream is on in the fos6")
//                   callback(result)
//                 })
//               })
//             } else {
//               callback(result)
//             }
//             // console.log(result,"from result error")
//           })
//           stream.on('error', (err) => {
//             console.error('Stream error:', err)
//           })
//           stream.on('end', () => {
//             console.log('Stream ended')
//           })
//         })
//       })
//     })
//     .then(() => {
//       console.log('Done.')
//     })
//     .catch((err) => {
//       console.error('Something went wrong:', err.stack)
//     })
// }

// export default adbSavelogs


const Promise = require('bluebird')
const WebSocket = require('ws')
const adb = require('adbkit')
const client = adb.createClient({ host: '127.0.0.1', port: 5037 })
const wss = new WebSocket.Server({ port: 3000 })
const fs = require('fs')
const path = require('path')

const writeLogtoFile = (fileLocation, log) => {
  fs.appendFile(fileLocation, log + '\n', (err) => {
    if (err) {
      console.log('error in writing file', err)
    }
  })
}

let fileName = ''

// Function to handle ADB logs
const adbSavelogs = (filelocation) => {
  console.log(filelocation, 'from adbSavelogs')
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket server')

    handleLogs(filelocation, (result) => {
      console.log(result)
      if (result) {
        const fileLocation = path.join(filelocation, fileName + '.txt')
        console.log(fileLocation)
        writeLogtoFile(fileLocation, result)
        ws.send(JSON.stringify(result))
      }
    })

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket server')
    })
  })
}

const handleLogs = (filelocation, callback) => {
  const command = { FOS: 'logcat -v threadtime', vega: 'journalctl -f' }
  const out = command.vega

  client
    .listDevices()
    .then((devices) => {
      return Promise.map(devices, (device) => {
        return client.shell(device.id, out).then((stream) => {
          stream.on('data', (data) => {
            fileName = device.id
            const result = data.toString().trim()
            if (result.includes('journalctl: not found')) {
              client.shell(device.id, command.FOS).then((fosStream) => {                
                fosStream.on('data', (data) => {
                  fileName = device.id
                  const fosResult = data.toString().trim()
                  callback(fosResult)
                })
              })
            } else {
              callback(result)
            }
          })

          stream.on('error', (err) => {
            console.error('Stream error:', err)
          })

          stream.on('end', () => {
            console.log('Stream ended')
          })
        })
      })
    })
    .then(() => {
      console.log('Done.')
    })
    .catch((err) => {
      console.error('Something went wrong:', err.stack)
    })
}

export default adbSavelogs
