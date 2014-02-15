katasemeion.lexer = (function(tokens) {
    var self = this;

    var ifCharIs = function(character) {
        return {
            thenReturn: function(thenToken) {
                var _elseToken;
                var makeTokenizer = function(sourceStream) {
                    if (sourceStream.current === character) {
                        sourceStream.advanceCursor();
                        return thenToken();
                    }
                    return _elseToken ? _elseToken() : null;
                };
                makeTokenizer.elseReturn = function(elseToken) {
                    _elseToken = elseToken;
                    return makeTokenizer;
                };
                makeTokenizer.elifDoubleReturn = function(doubledToken) {
                    return function(sourceStream) {
                        return ifCharIs(character).
                               thenReturn(function() {
                                   return ifCharIs(character).
                                          thenReturn(doubledToken).
                                          elseReturn(thenToken)(sourceStream);
                               })(sourceStream);
                    };
                };
                return makeTokenizer;
            }
        };
    };

    self.tokenizeOpenBracket = ifCharIs('[').
                               thenReturn(tokens.OpenBracket).
                               elifDoubleReturn(tokens.DoubleOpenBracket);
    self.tokenizeCloseBracket = ifCharIs(']').
                                thenReturn(tokens.CloseBracket).
                                elifDoubleReturn(tokens.DoubleCloseBracket);
    self.tokenizeUnderscore = ifCharIs('_').
                              thenReturn(tokens.Underscore);

    return self;
})(katasemeion.tokens);
