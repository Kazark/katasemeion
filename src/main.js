var main = function() {
    var fs = require('fs');
    var generator = katasemeion.make.htmlgenerator(function(data) {
        process.stdout.write(data, 'utf8');
    });
    var output = katasemeion.make.output.html(generator);
    var translator = katasemeion.make.translator(katasemeion.tokens, output);
    var lexer = katasemeion.make.lexer(katasemeion.tokens, katasemeion.tokenizers, translator.translate);
    fs.readFile('test.katasemeion', 'utf8', function(error, data) {
        if (error)
        {
            return console.error(error);
        }
        var stream = katasemeion.sourceStream(data);
        lexer.lex(stream);
        process.stdout.write('\n');
    });
};

main();
