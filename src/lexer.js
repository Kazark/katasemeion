katasemeion.make.lexer = function(tokenizers) {
    var self = {};
    self.tokenizers = tokenizers;
    self.lex = function(sourceStream) {
        tokenizers.all.forEach(function(tokenize) {
            tokenize(sourceStream);
        });
    };
    return self;
};

katasemeion.lexer = katasemeion.make.lexer(katasemeion.tokenizers);

