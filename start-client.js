console.log("we go to start client still");
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "PRODUCTION") {
  var args = [ 'build' ];
} else {
  var args = [ 'start' ];
}

const opts = { stdio: 'inherit', cwd: 'projClient', shell: true };
require('child_process').spawn('npm', args, opts);
