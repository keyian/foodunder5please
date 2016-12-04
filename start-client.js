const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'projClient', shell: true };
console.log("we go to start client still");
require('child_process').spawn('npm', args, opts);
