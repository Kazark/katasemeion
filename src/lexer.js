katasemeion.lexer = (function(tokens) {
    var self = this;

    var ifCharIs = function(character) {
        var me = {};
        var mkTokenizer = function(thenFunction) {
            var _elseToken = function() { return null; };
            var tokenize = function(sourceStream) {
                if (sourceStream.current === character) {
                    sourceStream.advanceCursor();
                    return thenFunction(sourceStream);
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
                        return ifCharIs(character).
                               then(ifCharIs(alternateChar).
                                    thenReturn(alternateToken).
                                    elseReturn(thenFunction));
                    }
                };
            };
            tokenize.elifDoubledReturn = function(doubledToken) {
                return tokenize.unlessFollowedBy(character)
                               .thenReturn(doubledToken);
            };
            return tokenize;
        };
        me.then = function(subtokenizer) {
            return mkTokenizer(subtokenizer);
        };
        me.thenReturn = function(thenFunction) {
            return mkTokenizer(function() {
                return thenFunction();
            });
        };
        return me;
    };

    self.tokenizeOpenBracket = ifCharIs('[').
                               thenReturn(tokens.OpenBracket).
                               elifDoubledReturn(tokens.DoubleOpenBracket);
    self.tokenizeCloseBracket = ifCharIs(']').
                                thenReturn(tokens.CloseBracket).
                                elifDoubledReturn(tokens.DoubleCloseBracket);
    self.tokenizeOpenAngle = ifCharIs('<').
                             thenReturn(tokens.OpenAngle);
    self.tokenizeCloseAngle = ifCharIs('>').
                              thenReturn(tokens.CloseAngle);
    self.tokenizeUnderscore = ifCharIs('_').
                              thenReturn(tokens.Underscore);
    self.tokenizeAsterisk = ifCharIs('*').
                            thenReturn(tokens.Asterisk).
                            elifDoubledReturn(tokens.DoubleAsterisk);
    self.tokenizeAt = ifCharIs('@').
                      thenReturn(tokens.At).
                      unlessFollowedBy('{').
                      thenReturn(tokens.AtWithOpenBrace);
    self.tokenizePercent = ifCharIs('%').
                           thenReturn(tokens.Percent).
                           unlessFollowedBy('{').
                           thenReturn(tokens.PercentWithOpenBrace);
    self.tokenizeDollar = ifCharIs('$').
                          thenReturn(tokens.Dollar).
                          unlessFollowedBy('{').
                          thenReturn(tokens.DollarWithOpenBrace);
    self.tokenizeCloseBrace = ifCharIs('}').
                              thenReturn(tokens.CloseBrace);

    self.tokenizeSpaces = ifCharIs(' ').
                          then(function(sourceStream) {
                              for (var i = 2; i <= 4; i++) {
                                  if (sourceStream.current !== ' ') {
                                      return tokens.Space();
                                  }
                                  sourceStream.advanceCursor();
                              }
                              return tokens.Indent();
                          });
    self.tokenizeNewline = ifCharIs('\n').
                           thenReturn(tokens.Newline).
                           elifDoubledReturn(tokens.DoubleNewline);
    self.tokenizeHash = ifCharIs('#').
                        thenReturn(tokens.Hash);

    return self;
})(katasemeion.tokens);
