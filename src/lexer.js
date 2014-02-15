katasemeion.lexer = (function() {
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
    return self;
})();
