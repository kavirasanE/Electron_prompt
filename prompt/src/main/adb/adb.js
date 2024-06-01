// client.shell(serial, command[, callback])
// Runs a shell command on the device. Note that you'll be limited to the permissions of the shell user, which ADB uses.

// serial The serial number of the device. Corresponds to the device ID in client.listDevices().
// command The shell command to execute. When String, the command is run as-is. When Array, the elements will be rudimentarily escaped (for convenience, not security) and joined to form a command.
// callback(err, output) Optional. Use this or the returned Promise.
// err null when successful, Error otherwise.
// output A Buffer containing all the output. Call output.toString('utf-8') to get a readable String from it.
// Returns: Promise
// Resolves with: output (see callback)
// Example
var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })
 
function adbCommands () {

client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
    //   return client.shell(device.id, 'echo $RANDOM')
      return client.shell(device.id, 'getprop | grep build')
        // Use the readAll() utility to read all the content without
        // having to deal with the events. `output` will be a Buffer
        // containing all the output.
        .then(adb.util.readAll)
        .then(function(output) {
          console.log('[%s] %s', device.id, output.toString().trim())
        })
    })
  })
  .then(function() {
    console.log('Done.')
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })

}
export default adbCommands;