# ProjectFinal-MovieChatBot

##	What is it about ?

This chat-bot can respond to several questions :
About the population and the currency of the different country of the world.
And about different movies that the user might like.

##	How I did it ?

For the population and currency, I have found a free API on rapidapi.com. This API has data about all the country of the world but don’t allow any other endpoints. That means that I can’t ask request for a special country.
So I have to use MongoDB Atlas to store all my data. With MongoDB, I can now find the information about the country I want.

For the different movies that the user might like, I have found different .csv document with 10 000 movies and their genres and another file with the rating of those movies made by different users.
I store those data in different array. And with different functions, I have finally, for each user the 2 genres that they prefer. With those genres I can give them different movie that they might like.
In another hand, if the user is not registered, he can just give the 2 genres of movies that he like and the chatbot will give him some movie with those genres.

##	How to use it ?

For the population you can ask :
-What is the population in FRANCE
-population in spain
Both of them is working

For the currency you can ask :
-What is the currency in FRANCE
-currency in spain
Both of them is working

For movies, you have to ask :
-(give|propose) me X movie
So “give me 10 movies” or “propose me 2 movies” are both working
After, there is two option :
If you are registered, then just enter your userId (number enter 1 and 610)
If you are not registered, then you have to tell us 2 genres that you like
After this, the function will give you X movie that you might like
