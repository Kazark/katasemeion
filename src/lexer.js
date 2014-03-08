katasemeion.make.lexer = function(tokens, tokenizers, callback) {
    var self = {};
    self.tokenizers = tokenizers;
    self.lex = function(sourceStream) {
        var unrecognizedCount = 0;
        tokenizers.all.forEach(function(tokenize) {
            var token = tokenize(sourceStream);
            if (token) {
                unrecognizedCount = 0;
                callback(token);
            } else {
                unrecognizedCount++;
            }
            if (unrecognizedCount >= tokenizers.all.length) {
                token = tokens.Character();
                token.data = sourceStream.current;
                callback(token);
                sourceStream.advanceCursor();
            }
        });
    };
    return self;
};

katasemeion.lexer = katasemeion.make.lexer(katasemeion.tokens, katasemeion.tokenizers, function() {});

