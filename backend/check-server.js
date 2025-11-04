const { spawn } = require('child_process');

const nodemon = spawn('npx', ['nodemon', 'src/server.ts'], {
  cwd: process.cwd(),
  stdio: 'pipe'
});

nodemon.stdout.on('data', (data) => {
  console.log(data.toString());
});

nodemon.stderr.on('data', (data) => {
  console.error(data.toString());
});

nodemon.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});

// Give it 5 seconds then exit
setTimeout(() => {
  console.log('Stopping check...');
  nodemon.kill();
  process.exit(0);
}, 5000);
