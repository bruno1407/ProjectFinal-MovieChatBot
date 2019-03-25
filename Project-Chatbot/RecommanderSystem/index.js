const Readline = require ('readline'); // for reading inputs

const rl = Readline.createInterface({ // for reading inputs
input : process.stdin,
output : process.stdout,
terminal : false
});

var RecommanderSystem=require('./BestMovieChoice.js')
function MoyenneParGenre()
{
    return new Promise(async function(resolve,reject){
        var BestMovie=await RecommanderSystem.Data();
        for(var i=0;i<BestMovie.length;i++){
            for(var j=0;j<BestMovie[i].MOYENNE_GENRE.length;j++){
               
                BestMovie[i].MOYENNE_GENRE[j].moyenne=parseFloat(BestMovie[i].MOYENNE_GENRE[j].Somme)/parseFloat(BestMovie[i].MOYENNE_GENRE[j].Nombre);
            }
        }
        resolve(BestMovie);
    })
   
}
async function BestGenreForUser(userId){
    return new Promise(async function(resolve,reject){
        TrueUserId=userId-1;
        var BestMovie=await MoyenneParGenre();
        
        var max1=BestMovie[TrueUserId].MOYENNE_GENRE[0].moyenne;
        var max2=BestMovie[TrueUserId].MOYENNE_GENRE[0].moyenne;;
        var indice=0;
        var indice1=0;
        for (var i=1;i<BestMovie[TrueUserId].MOYENNE_GENRE.length;i++){      
            if(BestMovie[TrueUserId].MOYENNE_GENRE[i].moyenne>max1)
            {
                max1=BestMovie[TrueUserId].MOYENNE_GENRE[i].moyenne
                indice=i;
            }
        }
        for (var i=1;i<BestMovie[TrueUserId].MOYENNE_GENRE.length;i++){ 
            if(BestMovie[TrueUserId].MOYENNE_GENRE[i].moyenne>max2 &&BestMovie[TrueUserId].MOYENNE_GENRE[i].moyenne<max1)
            {
                max2=BestMovie[TrueUserId].MOYENNE_GENRE[i].moyenne
                indice1=i;
            }
        }
        console.log("The best genre of user "+ userId+" are "+BestMovie[TrueUserId].MOYENNE_GENRE[indice].Genres+" with a moyenne of "+BestMovie[TrueUserId].MOYENNE_GENRE[indice].moyenne+" and "+BestMovie[TrueUserId].MOYENNE_GENRE[indice1].Genres+" with a moyenne of "+BestMovie[TrueUserId].MOYENNE_GENRE[indice1].moyenne+"\n")
        resolve(await SelectMovie(BestMovie[TrueUserId].MOYENNE_GENRE[indice].Genres,BestMovie[TrueUserId].MOYENNE_GENRE[indice1].Genres))
        
    })
}
async function SelectMovie(BestGenre1,BestGenre2)
{
    return new Promise(function(resolve,reject){
         //var BestMovie=await MoyenneParGenre();
    var result=RecommanderSystem.Movie.filter(info=>{ 
        return info.genres.find(element=>{
            return (element==BestGenre1)
        })
       })
       var result2=result.filter(info=>{ 
        return info.genres.find(element=>{
            return (element==BestGenre2)
        })
       })
       resolve(result2);
    })
}

const PropositionFilm=function(userId,NumberMovie){
    return new Promise(async function(resolve,resject){
        var Film=await BestGenreForUser(userId);
        var reponse="Here is a list of Movie that you might like :\n"
        for(var i=0;i<NumberMovie;i++){
            var NombreAleatoire=Math.floor(Math.random()*Math.floor(Film.length))
            reponse+="\n"+Film[NombreAleatoire].title
        }
        //console.log(reponse);
        resolve(reponse);
    })
  
}

const MovieForNewUser=function(BestGenre1, BestGenre2,NumberMovie){
    return new Promise(async function(resolve,reject){           
        var reponse="Here is a list of Movie that you might like :\n"
        var Film=await SelectMovie(BestGenre1,BestGenre2);
        for(var i=0;i<NumberMovie;i++){
            var NombreAleatoire=Math.floor(Math.random()*Math.floor(Film.length))
            reponse+="\n"+Film[NombreAleatoire].title
        }
        //console.log(reponse);
        resolve(reponse);
    })
}
module.exports=
{
    OldUser : PropositionFilm,
    NewUser : MovieForNewUser
}
