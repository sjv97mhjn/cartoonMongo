var  fs				= require('fs'),
     cluster		= require('cluster'),
     bodyparser		= require('body-parser'),
     request		= require('request'),
     cheerio		= require('cheerio'),
     sql 			= require('../../models/mysql'),
     log 			= require('../../helper/helper').log;
// console.log(connected);

var fetchData = function(html){
 	let Q  = cheerio.load(html);
	 		
	 		let stars ;
			Q('a','.credit_summary_item:nth-child(4)').each(function(i, elem) {
  			
  			if(i)
  			stars =stars + ',' +  Q(this).text();
			else
			stars = Q(this).text();
			
			});

			let writers;
			Q('a','.credit_summary_item:nth-child(3)').each(function(i, elem) {
  			if(i)
  			writers = writers +','+ Q(this).text();
			else
			writers = Q(this).text();
			});
			
	 		let myJson = {
					       	Movie_Title  : Q('h1').text(),
					       	Plot_Summary : Q('.summary_text').text(),
					       	Director	 : Q('a', '.credit_summary_item').first().text(),
					       	Writer		 : writers,
					       	Stars 		 : stars,
					       	Rating 		 : Number(Q('span','.ratingValue').first().text())
	   				    }
	   		
	   		return myJson;
 }


module.exports = {
	index : function(req,res){
	//let callme = function(){
	 url = req.query.url;
	 request(url,(error,response,html)=>{
	 	if(error)
	 		log(error);
	 	else{
	 					log(url);
	 					myJson = fetchData(html);
	   				     //log(myJson);

	 		      if(sql.state=="authenticated"){
	 		      	 let query = ` insert into movieDetails values (null,?,?,?,?,?,?,?)` ; 
	 		 
				     sql.query(query,
				     	[url,
				     	 myJson.Movie_Title,
				     	 myJson.Plot_Summary,
				     	 myJson.Director,
				     	 myJson.Writer,
				     	 myJson.Stars,
				     	 myJson.Rating 
				     	],
				     	function(err,Res){
					 if(err)
						log(err);
					else{
				     	 log("Made Entry In Database"); 		
					 	 res.json(myJson);
	 		    		
					}
				})	
	 		      }
	 		     else {
	 		     	 log("No Entry In Database");
	 		     	 res.json(myJson);
	 		     }

	 		        
	 	}
	 })
     
	 
}

}