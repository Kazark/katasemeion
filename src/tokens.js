katasemeion.tokens = (function() {
    var self = this;

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
    self.OpenBracket = self.makeTokenType(110);
    self.CloseBracket = self.makeTokenType(111);
    self.DoubleOpenBracket = self.makeTokenType(120);
    self.DoubleCloseBracket = self.makeTokenType(121);
    self.Underscore = self.makeTokenType(200);
    self.Asterisk = self.makeTokenType(310);
    self.DoubleAsterisk = self.makeTokenType(320);

    return self;
})();
