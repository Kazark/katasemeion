var main = function() {
    process.stdout.write('debug 1...\n');
    var output = katasemeion.make.output.html(katasemeion.make.htmlgenerator(function(data) {
        process.stdout.write(data, 'utf8');
    }));
    var translator = katasemeion.make.translator(katasemeion.tokens, output);
    var lexer = katasemeion.make.lexer(katasemeion.tokens, katasemeion.tokenizers, translator.translate);
    var fs = require('fs');
    fs.readFile('test.katasemeion', 'utf8', function(error, data) {
        if (error)
        {
            return console.error(error);
        }
        var stream = katasemeion.sourceStream(data);
        lexer.lex(stream);
        process.stdout.write('\n');
    });
    process.stdout.write('debug 2...\n');
};

main();
