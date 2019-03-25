const fs =require('fs');
const csv =require('fast-csv');


let MOVIES_META_DATA = [];
let MIX = [];
let RATINGS = [];
let MOYENNE_GENRE = [];
let MOYENNE_GENRE_PAR_PERSONNE = [];
function MoyenneGenreParPersonne(userId,MOYENNE_GENRE)
{
  this.userId= userId;
  this.MOYENNE_GENRE=MOYENNE_GENRE;
}
function MoyenneGenre(Genres, Somme, Nombre) {
  this.Genres = Genres;
  this.Somme = Somme;
  this.Nombre = Nombre;
}

let ME_USER_ID = 0;
let moviesDataPromise = new Promise((resolve) =>
  fs.createReadStream('./RecommanderSystem/data/movies.csv')
  .pipe(csv({ headers: true }))
  .on('data', fromMoviesFile)
  .on('end', () => resolve(MOVIES_META_DATA))
);


let moviesRatingsPromise = new Promise((resolve) =>
  fs.createReadStream('./RecommanderSystem/data/ratings.csv')
  .pipe(csv({ headers: true }))
  .on('data', fromRatingsFile)
  .on('end', () => resolve(RATINGS))
);

var ChargementDesDonnées =function(){
  return new Promise(function(resolve,reject){
    moviesDataPromise
    .then(function(){return moviesRatingsPromise})
    .then(function(){Comparaison(MOVIES_META_DATA,RATINGS)})
    .then(function(){moyenne(MIX)})
    .then(function(){resolve(MOYENNE_GENRE_PAR_PERSONNE);
    });
  })
}


function fromMoviesFile(row) {
  MOVIES_META_DATA.push({ 
    movieId:row.movieId,
    title: row.title,
    genres: row.genres.split('|')
  });
}

function fromRatingsFile(row) {
  RATINGS.push({
    userId :row.userId,
    movieId: row.movieId,
    rating: row.rating,
    timestamp: row.timestamp,
  });
}
function Comparaison(Movies,Rating)
{
  
  return new Promise(function(resolve,reject){
    
    for(var i=0;i<Rating.length;i++)
    {
      for (var j=0;j<Movies.length;j++)
      {
        
        if(Rating[i].movieId==Movies[j].movieId)
        {
         
          MIX.push({
            userId:Rating[i].userId,
            movieId:Rating[i].movieId,
            rating:Rating[i].rating,
            timestamp:Rating[i].timestamp,
            title:Movies[j].title,
            genres:Movies[j].genres
          })
        }
      }
    }
    if (j==Movies.length)
    {
      resolve(MIX);
    }
  })
}
function moyenne(MIX)
{
  return new Promise(function(resolve,reject){
    var user=0;  
    for (var i=0;i<MIX.length;i++){
     
      for(var j=0;j<MIX[i].genres.length;j++){           
        var trouve=false;    
        if(MOYENNE_GENRE.length>0){
          for(var k=0;k<MOYENNE_GENRE.length;k++){
            if(MOYENNE_GENRE[k].Genres==MIX[i].genres[j]){
              trouve=true;           
            }  
          } 
        }       
        if(!trouve)  {
          var NewRating=MIX[i].rating.replace('.',',');
          MOYENNE_GENRE.push(new MoyenneGenre(MIX[i].genres[j],parseFloat(NewRating),1));
          
        }    
        if(trouve){
          //console.log(MIX[i].genres[j])
          const resultat =MOYENNE_GENRE.find(ExistGenre => ExistGenre.Genres === MIX[i].genres[j])
          var NewRating=MIX[i].rating.replace('.',',');
          resultat.Somme+=parseFloat(NewRating);
          resultat.Nombre++;
        }                 
      }
      if(MOYENNE_GENRE_PAR_PERSONNE.length>0){  
      
        
        if(MIX[i].userId==MOYENNE_GENRE_PAR_PERSONNE[user].userId){
          MOYENNE_GENRE_PAR_PERSONNE.MOYENNE_GENRE=MOYENNE_GENRE;
        }
        else{
          user++;
          
          MOYENNE_GENRE=[];
          for(var l=0;l<MIX[i].genres.length;l++){            
            MOYENNE_GENRE.push(new MoyenneGenre(MIX[i].genres[l],parseFloat(NewRating),1));
          }
          MOYENNE_GENRE_PAR_PERSONNE.push(new MoyenneGenreParPersonne(MIX[i].userId,MOYENNE_GENRE));
        }
      }
      else{
        //console.log(MIX[i].userId)
        MOYENNE_GENRE_PAR_PERSONNE.push(new MoyenneGenreParPersonne(MIX[i].userId,MOYENNE_GENRE));
      }
    }
    resolve(MOYENNE_GENRE_PAR_PERSONNE);
  })
}

module.exports=
{ 
  Data:ChargementDesDonnées,
  Movie:MOVIES_META_DATA
}
