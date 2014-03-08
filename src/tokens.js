katasemeion.tokens = (function() {
    var self = {};

    self.makeTokenType = function(typeCode) {
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

    self.Space = self.makeTokenType(10);
    self.Indent = self.makeTokenType(11);
    self.Newline = self.makeTokenType(12);
    self.DoubleNewline = self.makeTokenType(13);
    self.OpenBracket = self.makeTokenType(110);
    self.CloseBracket = self.makeTokenType(111);
    self.DoubleOpenBracket = self.makeTokenType(120);
    self.DoubleCloseBracket = self.makeTokenType(121);
    self.OpenAngle = self.makeTokenType(130);
    self.CloseAngle = self.makeTokenType(131);
    self.Underscore = self.makeTokenType(200);
    self.Asterisk = self.makeTokenType(310);
    self.DoubleAsterisk = self.makeTokenType(320);
    self.At = self.makeTokenType(410);
    self.AtWithOpenBrace = self.makeTokenType(411);
    self.Dollar = self.makeTokenType(420);
    self.DollarWithOpenBrace = self.makeTokenType(421);
    self.Percent = self.makeTokenType(430);
    self.PercentWithOpenBrace = self.makeTokenType(431);
    self.CloseBrace = self.makeTokenType(490);
    self.Hash = self.makeTokenType(500);

    return self;
})();
