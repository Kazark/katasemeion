katasemeion.lexer = (function(tokens) {
    var self = this;

    self.tokenizeOpenBracket = function(sourceStream) {
        if (sourceStream.current === '[') {
            sourceStream.advanceCursor();
            if (sourceStream.current == '[') {
                sourceStream.advanceCursor();
                return tokens.DoubleOpenBracketToken();
            }
            return tokens.OpenBracketToken();
        }
        return null;
    };

    return self;
})(katasemeion.tokens);
