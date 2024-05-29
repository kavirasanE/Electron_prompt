var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

function trackDevice() {
  client
    .trackDevices()
    .then(function (tracker) {
      tracker.on('add', function (device) {
        console.log('Device %s was plugged in', device)
      })
      tracker.on('remove', function (device) {
        console.log('Device %s was unplugged', device)
      })
      tracker.on('end', function () {
        console.log('Tracking stopped')
      })
    })
    .catch(function (err) {
      console.error('Something went wrong:', err.stack)
    })
  console.log('hello from tracking')
}

export default trackDevice
