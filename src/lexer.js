katasemeion.lexer = (function(tokens) {
    var self = this;

    var makeSingleOrDoubleCharacterTokenizer = function(character, singleToken, doubleToken) {
        return function(sourceStream) {
            if (sourceStream.current === character) {
                sourceStream.advanceCursor();
                if (sourceStream.current === character) {
                    sourceStream.advanceCursor();
                    return doubleToken();
                }
                return singleToken();
            }
            return null;
        };
    };

    self.tokenizeOpenBracket = makeSingleOrDoubleCharacterTokenizer(
        '[', tokens.OpenBracket, tokens.DoubleOpenBracket
    );

    self.tokenizeCloseBracket = makeSingleOrDoubleCharacterTokenizer(
        ']', tokens.CloseBracket, tokens.DoubleCloseBracket
    );

    return self;
})(katasemeion.tokens);
