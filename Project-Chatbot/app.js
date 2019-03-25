'use strict';
const Readline = require ('readline'); // for reading inputs

const rl = Readline.createInterface({ // for reading inputs
input : process.stdin,
output : process.stdout,
terminal : false
});

const matcher = require('./matcher/index.js'); 
const weather = require('./weather/index.js');
const InformationCountry=require('./CountryInformation/index.js')
const information=require('./information/index.js')
const wind=require('./wind/index.js')
const time=require('./time/index.js')
const forcast=require('./forcast/index.js')
const population=require('./PopulationCountry/index.js')
const currency=require('./CurrencyCountry/index.js');
const MyMovie=require('./RecommanderSystem/index.js')
  


rl.setPrompt ('>');
rl.prompt ();
rl.on ('line', reply => {
	reply = reply.replace("?", "").trim();
	matcher(reply,data=>{
	
		switch(`${data.intent}`)
		{ 
			case 'Hello' :
				console.log (`${data.entities.greeting} ! how are you?`) ;
				break;

			case 'CurrentWeather':
				 InformationWeather(data).then(function(result){
				 	rl.prompt()
				})
				break;
			case 'CurrentTime':
				 InformationTime(data).then(function(result){
				 	rl.prompt()
				})
				break;
			case 'WeatherForecast':
				 WeatherForecast(data).then(function(result){
				 	rl.prompt();
				 })
				break;
			case 'Population':
				 Population(data).then(function(result){
				 	rl.prompt();
				 })
				break;
			case 'Currency':
				 Currency(data).then(function(result){
				 	rl.prompt();
				 })
				break;
			case 'Movie':
				Movie(data).then(function(result){
				 	rl.prompt();
				 })
				break;
			case 'Exit' :console.log ('See you !');
				process.exit(0);
				break;
			default:{
				console.log("Sorry, I don't understand your question..." );
				}	
		}rl.prompt();
	});
	
});


	function InformationWeather(data){
		return new Promise(function (resolve, reject){
			var Meteo;
			weather(data.entities.city).then(function(result){
				Meteo = result;				
				console.log('\x1b[37m%s\x1b[31m%s\x1b[37m%s',information(Meteo)+ '\n-Do you want to have information on ','the wind','?');
			}).then(function(result){
				rl.question('yes|no>', function(answer){
					console.log(wind(Meteo, answer));
					resolve("success");
				});
			})
		})
	}
	
	var Time;
	function InformationTime(data){
	return new Promise(function (resolve, reject){
			weather(data.entities.city).then(function(result){
			Time = result;
			console.log(time(Time));
			resolve("success");
			})
		})
	}
	
  var cityWeatherDetails;
  function WeatherForecast(data){
		return new Promise(function (resolve, reject){
			weather(data.entities.city).then(function(result){	
				cityWeatherDetails = result;
				var messageFromModule = forcast(cityWeatherDetails, data.entities.adjective, data.entities.when);
				console.log('\x1b[32m%s\x1b[37m%s', messageFromModule, "."); 
				resolve("success");
			})
		})
  }

  var CountryDetails;
  function Population(data){
		return new Promise(function (resolve, reject){
			var Country=(data.entities.country).charAt(0).toUpperCase()+(data.entities.country).substring(1).toLowerCase();
		
			InformationCountry(Country).then(function(result){	
				CountryDetails = result;
				
				var messageFromModule = population(CountryDetails);
				
				console.log('\x1b[32m%s\x1b[37m%s', messageFromModule, "."); 
				resolve("success");
			})
		})
  }
 
  function Currency(data){
		return new Promise(function (resolve, reject){
			var Country=(data.entities.country).charAt(0).toUpperCase()+(data.entities.country).substring(1).toLowerCase();
			
			InformationCountry(Country).then(function(result){	
				CountryDetails = result;
				
				var messageFromModule = currency(CountryDetails);
				
				console.log('\x1b[32m%s\x1b[37m%s', messageFromModule, "."); 
				resolve("success");
			})
		})
  }

  function Movie(data)
  {
	  return new Promise(function(resolve,reject){
		  	console.log("Are you a new user?\nyes/no>")
		  	rl.question(' ',function(answer){
				if(answer=="no")
				{
					console.log("What is your user Id :")
					rl.question('', function(userId){	
						rl.close();		
						console.log("Loading of your "+data.entities.movie+ " movies, please wait...")		
						MyMovie.OldUser(parseInt(userId),data.entities.movie)
						.then(function(result){
							console.log(result);																
							resolve("succes")
							})
					  })		  
				}
				else if(answer=="yes"){
					
					var Tableaugenre=["Thriller","Adventure","Animation","Children","Comedy","Fantasy","Romance","Drama","Action","Crime","Horreur","Sci-Fi","Mystery","War"];
					console.log("Choose 2 genres of movie that you might like :");
					for (var i=0;i<Tableaugenre.length;i++)
					{
						console.log((i+1)+" : "+ Tableaugenre[i]);
					}
					rl.question('first>',answer1=>{
						var Answer1=Tableaugenre[parseInt(answer1)-1];
						console.log(`${Answer1} is a good choice ! And the second?`)
						rl.question('second>',answer2=>{
							var Answer2=Tableaugenre[parseInt(answer2)-1];
							console.log(`${Answer2} is a good choice too`)
							MyMovie.NewUser(Answer1,Answer2,data.entities.movie)
							.then(function(result){
								console.log("Loading of your "+data.entities.movie+ " movies, please wait...")		
								console.log(result)});	
								resolve("success")													
						})
					})
					
				}
				else{
					console.log("Sorry we didn't understand your answer..");
					Movie(data);
				}
			})
			
	  })
  }