var app = require('express')();
const express = require('express');
var http = require('http').createServer(app);
const path = require('path');
const publicPath = path.join(__dirname,"../public");
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(publicPath+"/calcView.html");
});

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('calculation', (msg) => {
        console.log(msg.user+': ' + msg.expr);
        io.emit('calculation', msg);
      });
    
      socket.on('user', (usr) => {
        console.log('Connected: ' + usr);
      });
});

app.use(express.static(publicPath));
http.listen(5000, () => {
  console.log('listening on port:5000');
});