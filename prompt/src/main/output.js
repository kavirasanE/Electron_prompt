// // import {exec}  from 'child_process'
// import { spawn } from 'child_process'
// const output = (command, callback) => {
//   // console.log('Output from app')
//   // console.log('Received command:', command)
//   let result = ''
//   const child = spawn(command)
 
//   child.stdout.on("data", (data) => {
//     result += data.toString()
//     callback(result)
//   })
//   child.stderr.on('data', (data) => {
//     console.log(data)
//     callback(data);
//   })
//   child.on('error', (err) => {
//     // callback("error in the command")
//     callback(err);
//   })
//   child.on('exit', (code, signal) => {
//     if (code) {
//       console.log(code)
//     }
//     if (signal) {
//       console.log(signal)
//     }
//   })
// }

// export default output

// //   exec('adb', (err, stdout, stderr) => {
// //   if (err) {
// //     console.error( err)
// //     return
// //   }
// //   if (stderr) {
// //     console.error('stderr:', stderr)
// //     return
// //   }
// //   console.log('stdout:', stdout)
// // })

import { spawn } from 'child_process';

const output = (command, callback) => {
  let result = '';

  // Split the command and its arguments
  const [cmd, ...args] = command.split(' ');

  const child = spawn(cmd, args);

  child.stdout.on("data", (data) => {
    result += data.toString();
  });

  child.stderr.on('data', (data) => {
    // Log the error message
    console.error(data.toString());
  });

  child.on('error', (err) => {
    // Log the error
    console.error('Error:', err.message);
  });

  child.on('exit', (code, signal) => {
    // Log exit code or signal if non-zero
    if (code !== 0) {
      console.error(`Process exited with code ${code}`);
    }
    if (signal) {
      console.error(`Process terminated due to signal: ${signal}`);
    }

    // Pass result to callback
    callback(result);
  });
};

export default output;
