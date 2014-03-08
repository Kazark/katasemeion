katasemeion.make.lexer = function(tokenizers, callback) {
    var self = {};
    self.tokenizers = tokenizers;
    self.lex = function(sourceStream) {
        tokenizers.all.forEach(function(tokenize) {
            var token = tokenize(sourceStream);
            if (token) {
                callback(token);
            }
        });
    };
    return self;
};

katasemeion.lexer = katasemeion.make.lexer(katasemeion.tokenizers, function() {});

