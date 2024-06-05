var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })
import { encode, decode } from 'messagepack'

// function adbShellCommands(message, callback) {
//   console.log(message)
//   const { from } = Buffer
//   client
//     .listDevices()
//     .then(function (devices) {
//       return Promise.map(devices, function (device) {
//         // return client.shell(device.id, 'echo $RANDOM')
//         return (
//           client
//             // .shell(device.id, message)
//             .shell('f5fa13f4', message)
//             // .then(adb.util.readableToString)
//             .then(function (output) {
//               console.log('[%s] %s', device.id, output.toString().trim())
//               const result = from(output).toString().trim()
//               if (callback) callback(result, 'this is from backend')
//             })
//         )
//       })
//     })

//     .then(function () {
//       // console.log('Done.')
//     })
//     .catch(function (err) {
//       console.error('Something went wrong:', err.stack)
//       if (callback) callback(err)
//     })
// }
// export default adbShellCommands




function adbShellCommands(message, callback) {
  console.log(message);

  client.listDevices()
    .then(function(devices) {
      return Promise.map(devices, function(device) {
        return client.shell(device.id, message)
          .then(function(stream) {
            stream.on('data', function(data) {
              const output = data.toString().trim();
              console.log(`[${device.id}] ${output}`);
              if (callback) callback(output, 'this is from backend');
            });

            stream.on('error', function(err) {
              console.error(`Error on device ${device.id}:`, err.stack);
              if (callback) callback(err);
            });

            stream.on('end', function() {
              console.log(`Stream ended for device ${device.id}`);
            });
          })
          .catch(function(err) {
            console.error(`Error on device ${device.id}:`, err.stack);
            if (callback) callback(err);
          });
      });
    })
    .then(function() {
      console.log('All commands executed.');
    })
    .catch(function(err) {
      console.error('Something went wrong:', err.stack);
      if (callback) callback(err);
    });
}

export default adbShellCommands;

