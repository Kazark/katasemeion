var main = function() {
    console.log('debug 1...');
    var output = katasemeion.make.output.html(katasemeion.make.htmlgenerator(console.log));
    var translator = katasemeion.make.translator(katasemeion.tokens, output);
    var lexer = katasemeion.make.lexer(katasemeion.tokens, katasemeion.tokenizers, translator.translate);
    var fs = require('fs');
    fs.readFile('test.katasemeion', 'utf8', function(error, data) {
        if (error)
        {
            return console.log(error);
        }
        var stream = katasemeion.sourceStream(data);
        lexer.lex(stream);
    });
    console.log('debug 2...');
};

main();
