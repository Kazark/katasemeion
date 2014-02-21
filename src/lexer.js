katasemeion.lexer = (function(tokens) {
    var self = this;

    var ifCharIs = function(character) {
        var thenReturn = function(thenToken) {
            var _elseToken = function() { return null; };
            var tokenize = function(sourceStream) {
                if (sourceStream.current === character) {
                    sourceStream.advanceCursor();
                    return thenToken();
                }
                return _elseToken();
            };
            tokenize.elseReturn = function(elseToken) {
                _elseToken = elseToken;
                return tokenize;
            };
            tokenize.unlessFollowedBy = function(alternateChar) {
                return {
                    thenReturn: function(alternateToken) {
                        return function(sourceStream) {
                            return ifCharIs(character).
                                   thenReturn(function() {
                                       return ifCharIs(alternateChar).
                                              thenReturn(alternateToken).
                                              elseReturn(thenToken)(sourceStream);
                                   })(sourceStream);
                        };
                    }
                };
            };
            tokenize.elifDoubledReturn = function(doubledToken) {
                return tokenize.unlessFollowedBy(character)
                               .thenReturn(doubledToken);
            };
            return tokenize;
        };
        return {
            thenReturn: thenReturn
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
    self.tokenizeAt = ifCharIs('@').
                      thenReturn(tokens.At).
                      unlessFollowedBy('{').
                      thenReturn(tokens.AtWithOpenBrace);
    self.tokenizeCloseBrace = ifCharIs('}').
                              thenReturn(tokens.CloseBrace);

    self.tokenizeSpaces = function(sourceStream) {
        return ifCharIs(' ').
               thenReturn(function() {
                   for (var i = 2; i <= 4; i++) {
                       if (sourceStream.current !== ' ') {
                           return tokens.Space();
                       }
                       sourceStream.advanceCursor();
                   }
                   return tokens.Indent();
               })(sourceStream);
    };

    return self;
})(katasemeion.tokens);
