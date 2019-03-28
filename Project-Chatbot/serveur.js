'use strict';
// create an API server
const express = require('express');
const server = express();
const config=require("./config/index.js")
const FBeamer=require("./FBeamer/index.js")
const bodyparser=require("body-parser")

const matcher = require('./matcher/index.js'); 
const InformationCountry=require('./CountryInformation/index.js')
const population=require('./PopulationCountry/index.js')
const currency=require('./CurrencyCountry/index.js');

const PORT = process.env.PORT || 3000;
const f=new FBeamer(config.fb)

// Register the webhooks
server.get('/', (req, res) => f.registerHook(req,res));
server.post('/',bodyparser.json({
    verify: FBeamer.VerifySignature
}))
server.post('/',(req,res,next)=>{
    return f.Incoming(req,res,async data =>{
        try{
            if(data.type="text"){
                matcher(data.content, async resp=>{
                    switch(resp.intent){
                        case 'Hello':
                            await f.txt(data.sender,'Hey there');
                            break;
                        case 'Population':
                            await f.txt(data.sender,'Let me check... ');   
                            await f.txt(data.sender,await monmessage(resp));                     
                            break;
                        case 'Currency':
                            await f.txt(data.sender,'Let me check... '); 
                            await f.txt(data.sender,await Currency(resp));                         
                            break;
                        case 'Exit' :
                            await f.txt(data.sender,'Merci de votre visite, aurevoir');
                            process.exit(0);
                            break;
                        default:{
                            await f.txt(data.sender,'Sorry, I didn\'t understand your question..'); 
                            }	
                    }
                })
            }

        }catch(e){
            console.log(e);
        }
       // console.log(data);
    });
})

var CountryDetails;
var monmessage=function (data){
    return new Promise(async function (resolve, reject){
            var Country=(data.entities.country).charAt(0).toUpperCase()+(data.entities.country).substring(1).toLowerCase();
            //await f.txt(data.sender,'messageFromModule');
            InformationCountry(Country).then(async function(result){	
            CountryDetails = result;
            if(CountryDetails=="Unknow")
            {
                resolve("We don't know this city.. Sorry");
            }
            else{
                var messageFromModule = population(CountryDetails);           
                console.log('\x1b[32m%s\x1b[37m%s', messageFromModule, "."); 
                resolve(messageFromModule);
            }           
        })
    })
}

var Currency=function (data){
    return new Promise(function (resolve, reject){
        var Country=(data.entities.country).charAt(0).toUpperCase()+(data.entities.country).substring(1).toLowerCase();
        
        InformationCountry(Country).then(function(result){	
            CountryDetails = result;
            if(CountryDetails=="Unknow")
            {
                resolve("We don't know this city.. Sorry");
            }
            else{
            var messageFromModule = currency(CountryDetails);           
            console.log('\x1b[32m%s\x1b[37m%s', messageFromModule, "."); 
            resolve(messageFromModule);
            }
        })
    })
}

server.listen(PORT, () => console.log(`MovieMate running on port ${PORT}`));