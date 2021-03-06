katasemeion.tokens = (function() {
    var self = {};
    var tokenTypeId = 0;

    self.makeTokenType = function() {
        var typeCode = tokenTypeId;
        tokenTypeId++;
        var makeToken = function() {
            return {
                is: function(tokenType) {
                    return tokenType.typeIs(typeCode);
                }
            };
        };
        makeToken.typeIs = function(x) {
            return typeCode === x;
        };
        return makeToken;
    };

    self.Space = self.makeTokenType();
    self.Indent = self.makeTokenType();
    self.Newline = self.makeTokenType();
    self.DoubleNewline = self.makeTokenType();
    self.OpenBracket = self.makeTokenType();
    self.CloseBracket = self.makeTokenType();
    self.DoubleOpenBracket = self.makeTokenType();
    self.DoubleCloseBracket = self.makeTokenType();
    self.OpenAngle = self.makeTokenType();
    self.CloseAngle = self.makeTokenType();
    self.Underscore = self.makeTokenType();
    self.Asterisk = self.makeTokenType();
    self.DoubleAsterisk = self.makeTokenType();
    self.At = self.makeTokenType();
    self.OpenBrace = self.makeTokenType();
    self.CloseBrace = self.makeTokenType();
    self.Percent = self.makeTokenType();
    self.Hash = self.makeTokenType();
    self.Caret = self.makeTokenType();
    self.Character = self.makeTokenType();
    self.SingleQuote = self.makeTokenType();
    self.DoubleSingleQuote = self.makeTokenType();
    self.Backtick = self.makeTokenType();
    self.DoubleBacktick = self.makeTokenType();

    return self;
})();
