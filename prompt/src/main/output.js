// import {exec}  from 'child_process'
import { spawn } from 'child_process'
const output = (command, callback) => {
  // console.log('Output from app')
  // console.log('Received command:', command)
  let result = ''
  const child = spawn(command)
 
  child.stdout.on('data', (data) => {
    result += data.toString()
    callback(result)
  })
  child.stderr.on('data', (data) => {
    console.log(data)
    callback(data);
  })
  child.on('error', (err) => {
    // callback("error in the command")
    callback(err);
  })
  child.on('exit', (code, signal) => {
    if (code) {
      console.log(code)
    }
    if (signal) {
      console.log(signal)
    }
  })
}

export default output

//   exec('adb', (err, stdout, stderr) => {
//   if (err) {
//     console.error( err)
//     return
//   }
//   if (stderr) {
//     console.error('stderr:', stderr)
//     return
//   }
//   console.log('stdout:', stdout)
// })
