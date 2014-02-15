describe('Κατασημεῖον tokens module', function() {
    var tokens = katasemeion.tokens;

    it('should exist', function() {
        expect(tokens).toBeTruthy();
    });

    describe('token type factory', function() {
        var makeTokenType = tokens.makeTokenType;

        it('should create token types', function() {
            var tokenType = makeTokenType(1);
            expect(tokenType).toBeTruthy();
        });

        describe('a token type', function() {
            it('should be a token factory', function() {
                var token = makeTokenType(1)();
                expect(token).toBeTruthy();
            });

            describe('a token', function() {
                it('should know its type', function() {
                    var tokenType = makeTokenType(1);
                    var token = tokenType();
                    expect(token.is(tokenType)).toBe(true);
                });

                it('should know it is not of another type', function() {
                    var tokenType1 = makeTokenType(1);
                    var tokenType2 = makeTokenType(2);
                    var token = tokenType1();
                    expect(token.is(tokenType2)).toBe(false);
                });
            });
        });
    });

    describe('token types', function() {
        var isTokenType = function(x) {
            return typeof(x.typeIs) === "function";
        };

        it('should include open bracket', function() {
            expect(isTokenType(tokens.OpenBracket)).toBe(true);
        });

        it('should include double open bracket', function() {
            expect(isTokenType(tokens.DoubleOpenBracket)).toBe(true);
        });

        it('should include close bracket', function() {
            expect(isTokenType(tokens.CloseBracket)).toBe(true);
        });

        it('should include double close bracket', function() {
            expect(isTokenType(tokens.DoubleCloseBracket)).toBe(true);
        });

        it('should include underscore', function() {
            expect(isTokenType(tokens.Underscore)).toBe(true);
        });
    });
});
