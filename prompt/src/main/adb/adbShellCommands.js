var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

function adbShellCommands(message, callback) {
  console.log(message)
  const { from } = Buffer
  client
    .listDevices()
    .then(function (devices) {
      return Promise.map(devices, function (device) {
        // return client.shell(device.id, 'echo $RANDOM')
        return client
          .shell(device.id, message)
          .then(adb.util.readAll)
          .then(function (output) {
            // console.log('[%s] %s', device.id, output.toString().trim())
            const result = from(output).toString().trim()
            if (callback) callback(result, 'this is from backend')
          })
      })
    })
    .then(function () {
      // console.log('Done.')
    })
    .catch(function (err) {
      console.error('Something went wrong:', err.stack)
      if (callback) callback(err)
    })
}
export default adbShellCommands
