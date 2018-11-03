var fs = require('file-system');
module.exports = {
 log :function(data){
 	var date = new Date();
 	date =JSON.stringify(date);
 	fs.appendFile('./logs/log.txt',date+' : '+ data+'\n', function(err) {});
	console.log(data);
} 
 
}