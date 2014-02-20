katasemeion.lexer = (function(tokens) {
    var self = this;

    var ifCharIs = function(character) {
        return {
            thenReturn: function(thenToken) {
                var _elseToken;
                var tokenize = function(sourceStream) {
                    if (sourceStream.current === character) {
                        sourceStream.advanceCursor();
                        return thenToken();
                    }
                    return _elseToken ? _elseToken() : null;
                };
                tokenize.elseReturn = function(elseToken) {
                    _elseToken = elseToken;
                    return tokenize;
                };
                tokenize.elifDoubledReturn = function(doubledToken) {
                    return function(sourceStream) {
                        return ifCharIs(character).
                               thenReturn(function() {
                                   return ifCharIs(character).
                                          thenReturn(doubledToken).
                                          elseReturn(thenToken)(sourceStream);
                               })(sourceStream);
                    };
                };
                return tokenize;
            }
        };
    };

    self.tokenizeOpenBracket = ifCharIs('[').
                               thenReturn(tokens.OpenBracket).
                               elifDoubledReturn(tokens.DoubleOpenBracket);
    self.tokenizeCloseBracket = ifCharIs(']').
                                thenReturn(tokens.CloseBracket).
                                elifDoubledReturn(tokens.DoubleCloseBracket);
    self.tokenizeUnderscore = ifCharIs('_').
                              thenReturn(tokens.Underscore);
    self.tokenizeAsterisk = ifCharIs('*').
                            thenReturn(tokens.Asterisk).
                            elifDoubledReturn(tokens.DoubleAsterisk);
    self.tokenizeSpaces = function(sourceStream) {
        if (sourceStream.current === ' ') {
            sourceStream.advanceCursor();
            for (var i = 2; i <= 4; i++) {
                if (sourceStream.current !== ' ') {
                    return tokens.Space();
                }
                sourceStream.advanceCursor();
            }
            return tokens.Indent();
        }
        return null;
    };

    return self;
})(katasemeion.tokens);
