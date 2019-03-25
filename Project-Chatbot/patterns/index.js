    const  patternDict = [{
        pattern: '\\b(?<greeting>Hi|Hello|Hey|Salut|Bonjour)\\b',
        intent: 'Hello'
    },{
        pattern:'\\b(bye|exit)\\b',
        intent: 'Exit'
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