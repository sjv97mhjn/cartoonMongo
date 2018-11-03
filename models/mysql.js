// var connection=require('express-myconnection');
var async = require("async");
var mysql=require('mysql');
var log = require('../helper/helper').log;
var sql=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:""
});

// If there is no error connecting to Database flag will set to TRUE ; 

var Connect = function(callback){
	sql.connect(function(err){
  if(err)
    {
    	
    	callback(err);
    }
	else{
     log("Database Connected");
     callback(null);
	}
});	
}


var checkDatabase  = function(callback){
	var query = "CREATE DATABASE IF NOT EXISTS imdb;"
	sql.query(query,function(err,Res){
		if(err)
			{
				callback(err);
				}
		else{
			log("Database Created");
			callback(null);
		}	
	})
}

var useDatabase = function(callback){
	var query = "use imdb;"
	sql.query(query,function(err,Res){
		if(err)
			{callback(err);
				}
		else{
			log("Using Database");
			callback(null);
		}	
	
	})
}



var checkTable = function(callback){
	var query = `   CREATE TABLE IF NOT EXISTS  imdb.movieDetails( 
					id INT NOT NULL AUTO_INCREMENT , 
					url VARCHAR(100) NOT NULL , 
					name VARCHAR(100) NULL DEFAULT NULL ,
					plotSummary VARCHAR(100) NULL DEFAULT NULL ,
					director VARCHAR(100) NULL DEFAULT NULL ,
					writer VARCHAR(100) NULL DEFAULT NULL ,
					stars VARCHAR(100) NULL DEFAULT NULL ,
					rating INT(3) NULL DEFAULT NULL ,
					PRIMARY KEY (id) ) ENGINE = InnoDB; `;
	sql.query(query,function(err,Res){
	if(err)
			{
			callback(err);}
		else{
			log("Tables Created");
			callback(null);
		}	
	})
};


async.waterfall([Connect,checkDatabase,useDatabase,checkTable],function(err,result){
	if(err){
		log(err);
	
	}
	else
	{
		log("Database connection verified !!")
	}
})

module.exports = sql;
