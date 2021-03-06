katasemeion.make.lexer = function(tokens, tokenizers, callback) {
    var self = {};
    self.tokenizers = tokenizers;
    self.lex = function(sourceStream) {
        var unrecognizedCount = 0;
        var i = 0;
        while (!sourceStream.pastEnd)
        {
            var token = tokenizers.all[i](sourceStream);
            if (token) {
                unrecognizedCount = 0;
                callback(token);
            } else {
                unrecognizedCount++;
            }
            if (unrecognizedCount === tokenizers.all.length) {
                token = tokens.Character();
                token.data = sourceStream.current;
                callback(token);
                sourceStream.advanceCursor();
                unrecognizedCount = 0;
            }
            i++;
            if (i === tokenizers.all.length) {
                i = 0;
            }
        }
    };
    return self;
};
