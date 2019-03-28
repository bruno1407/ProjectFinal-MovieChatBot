var unirest = require('unirest');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const uri = "mongodb+srv://bruno:azertyuiop@cluster0-8nvxw.mongodb.net/ListOfMovie?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var collection;

const getInforamtion = (location) => {
	return new Promise(async (resolve, reject) => {
		try{			
			const weatherConditions = await unirest.get("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all")
            .header("X-RapidAPI-Key", "ffcf3652acmsh84f2cca2ba325bap1afdf1jsn0c2d69e25c71")
            .end(function (result) {
				client.connect(err => {    
					collection = client.db("CountryDetails").collection("Details");
					try{ 
					collection.findOne({"name": location},(error, result) => {
						if(error) {
							return response.status(500).send(error);
						}
						if(result==null){
							resolve("Unknow")
						}
						else{
							resolve(result);
						}
						
					});;
					}catch(e){
						console.log(e);
					}
					
				});
				
            });        
		}
		catch(error){     
			console.log("I don't know this city");
			console.log("Please press enter");
        }     
	});

}

module.exports =getInforamtion;
