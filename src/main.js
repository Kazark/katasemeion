var main = function() {
    var fs = require('fs');
    var generator = katasemeion.make.htmlgenerator(function(data) {
        process.stdout.write(data, 'utf8');
    });
    var output = katasemeion.make.output.html(generator);
    var translator = katasemeion.make.translator(katasemeion.tokens, output);
    var lexer = katasemeion.make.lexer(katasemeion.tokens, katasemeion.tokenizers, translator.translate);
    fs.readFile(process.argv[2], 'utf8', function(error, data) {
        if (error)
        {
            return console.error(error);
        }
        var stream = katasemeion.sourceStream(data);
        output.begin();
        lexer.lex(stream);
        output.end();
        process.stdout.write('\n');
    });
};

main();
