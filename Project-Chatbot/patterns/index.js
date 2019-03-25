    const  patternDict = [{
        pattern: '\\b(?<greeting>Hi|Hello|Hey|Salut|Bonjour)\\b',
        intent: 'Hello'
    },{
        pattern:'\\b(bye|exit)\\b',
        intent: 'Exit'
    },
    {
        pattern : '\\b(?<adjective>(rainy|sunny|cold))\\b \\bin\\b \\b(?<city>[A-Z][a-z]+(?:[ |-][A-Z][a-z]+)*)\\b \\b(?<when>(today|tomorrow))\\b',
        intent : 'WeatherForecast'
    },
    {
        pattern : '\\b(weather)\\b \\bin \\b(?<city>[a-zA-Z]+(?:[ |-][a-zA-Z]+)*$)\\b',
        intent : 'CurrentWeather' 
    },
    {
        pattern : '\\b(time)\\b \\bin \\b(?<city>[a-zA-Z]+(?:[ |-][a-zA-Z]+)*$)\\b', 
        intent : 'CurrentTime' 
    },
    {
        pattern : '\\b(population)\\b \\bin \\b(?<country>[a-zA-Z]+(?:[ |-][a-zA-Z]+)*$)\\b', 
        intent : 'Population' 
    },
    {
        pattern : '\\b(currency)\\b \\bin \\b(?<country>[a-zA-Z]+(?:[ |-][a-zA-Z]+)*$)\\b', 
        intent : 'Currency' 
    },
    {
        pattern : '(give|propose) (me )?(?<movie>[0-9]+) movie*$', 
        intent : 'Movie' 
    }

];

module.exports = patternDict;