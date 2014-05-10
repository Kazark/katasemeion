katasemeion.tokenizers = (function(tokens) {
    var self = {};

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
            tokenize.elifDoubledReturn = function(doubledToken) {
                return ifCharIs(character).
                       then(ifCharIs(character).
                            thenReturn(doubledToken).
                            elseReturn(thenFunction));
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
                      thenReturn(tokens.At);
    self.tokenizePercent = ifCharIs('%').
                           thenReturn(tokens.Percent);
    self.tokenizeCaret = ifCharIs('^').
                         thenReturn(tokens.Caret);
    self.tokenizeOpenBrace = ifCharIs('{').
                             thenReturn(tokens.OpenBrace);
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

    self.all = [ self.tokenizeOpenBracket, self.tokenizeCloseBracket,
                 self.tokenizeOpenAngle, self.tokenizeCloseAngle,
                 self.tokenizeOpenBrace, self.tokenizeCloseBrace,
                 self.tokenizeUnderscore,
                 self.tokenizeAsterisk,
                 self.tokenizeAt,
                 self.tokenizePercent,
                 self.tokenizeCaret,
                 self.tokenizeSpaces,
                 self.tokenizeNewline,
                 self.tokenizeHash
               ];

    return self;
})(katasemeion.tokens);
