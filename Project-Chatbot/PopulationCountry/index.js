'use strict';
var response = "";
const population = (CountryDetailsJsonFile) =>{
        response = "\nThe population of "+CountryDetailsJsonFile.name+" is "+CountryDetailsJsonFile.population+" at the moment";
        //console.log(CountryDetailsJsonFile);
	return response;
} 
module.exports = population;