
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000

console.log(__dirname+'/../public');

const publicPath=path.join(__dirname,'../public');
console.log(publicPath);

var app=express();

var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('new user connected');
	socket.on('disconnect',()=>{
		console.log('user disconnected');
	});
});

server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});