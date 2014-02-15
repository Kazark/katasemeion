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

    return self;
})(katasemeion.tokens);
