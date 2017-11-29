const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
app.use(express.static(path.join(__dirname, "./static")));
app.get('/', function (req, res) {
    res.send('index.html');
    res.end();
});

const server = app.listen(port, function () {
    console.log(`listening on port ${port}`);
});

const io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('connected! socket # ', socket.id);
    let udata = {
        "sockid": socket.id
    }
    socket.on('add_user', function(username) {
        udata.username = username
        socket.broadcast.emit('new_user', udata);
    });
    socket.on('disconnect', function() {
        socket.broadcast.emit('remove_user', udata);
    })
})