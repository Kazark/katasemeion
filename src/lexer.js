katasemeion.make.lexer = function(tokenizers) {
    var self = {};
    self.tokenizers = tokenizers;
    self.lex = function() {
        tokenizers.all.forEach(function(tokenize) {
            tokenize();
        });
    };
    return self;
};

katasemeion.lexer = katasemeion.make.lexer(katasemeion.tokenizers);

