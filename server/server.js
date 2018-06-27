
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000

console.log(__dirname+'/../public');

const publicPath=path.join(__dirname,'../public');
console.log(publicPath);

var app=express();
app.use(express.static(publicPath));

var server=http.createServer(app);
server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});

var io=socketIO(server);
io.on('connection',(socket)=>{
	//after connection
	console.log('new user connected');

	socket.on('disconnect',()=>{
		console.log('user disconnected');
	});

	socket.on('createMsg',(msg)=>{
		console.log('create msg request',msg);
		//sent to everyone
		io.emit('newMsg',{
			from:msg.from,
			text:msg.text,
			createdAt:new Date()
		});
	});

	/*socket.emit('newMsg',{
		from:'admin',
		text:'wellcome',
		createdAt:123
	});*/
});



/*io.on('connection',(socket)=>{
	console.log('new user connected');

	socket.emit('newEmail',{
		from:'abc',
		text:'xyz',
		createdAt:123
	});

	socket.on('createEmail',(newEmail)=>{
		console.log('crete email',newEmail)
	});

	socket.on('disconnect',()=>{
		console.log('user disconnected');
	});
});


*/
