var  express 		= require('express'),
     app 			= express(),
	 routes 		= require('./routes/index'),
     ejs			= require('ejs'),
     dotenv         =   require('dotenv').config(),
	 port = process.env.port||80;

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use('/',routes);


app.listen(port,function(req,res){
	console.log(`Listening on port ${port}`)
})

