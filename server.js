const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
// app.use(__dirname + '/build/favicon.ico');
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, ()=>{
    console.log("App is now running..");
});