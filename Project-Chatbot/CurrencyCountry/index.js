'use strict';
var response = "";
const currency = (CountryDetailsJsonFile) =>{
        response = "\nThe currency of "+CountryDetailsJsonFile.name+" is "+CountryDetailsJsonFile.currencies;
        //console.log(CountryDetailsJsonFile);
	return response;
} 
module.exports = currency;