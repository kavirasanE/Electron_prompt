const logcat = require('adbkit-logcat');
const { spawn } = require('child_process');

function adbSavelogs({ runningCommand, callback }) {
  if (typeof callback !== 'function') {
    throw new Error('callback must be a function');
  }

  // Retrieve a binary log stream
  const proc = spawn('adb', ['logcat', '-v', 'threadtime']);

  let reader;

  // Connect logcat to the stream
  proc.stdout.on('data', (data) => {
    if (!reader) {
      reader = logcat.readStream(proc.stdout);
      reader.on('entry', entry => {
        console.log(entry.message);
        callback(entry.message);
      });
    }
  });

  // Handle errors in the spawned process
  proc.on('error', (err) => {
    console.error('Failed to start adb logcat:', err);
  });

  // Make sure we don't leave anything hanging
  process.on('exit', () => {
    if (proc) proc.kill();
  });

  // Ensure proc is killed on SIGINT (Ctrl+C)
  process.on('SIGINT', () => {
    if (proc) proc.kill();
    process.exit();
  });

  // Ensure proc is killed on SIGTERM
  process.on('SIGTERM', () => {
    if (proc) proc.kill();
    process.exit();
  });
}

export default adbSavelogs;
