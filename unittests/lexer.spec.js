describe('Κατασημεῖον lexer', function() {
    var lexer = katasemeion.lexer;

    it('should exist', function() {
        expect(lexer).toBeTruthy();
    });

    describe('token type factory', function() {
        var makeTokenType = lexer.makeTokenType;

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
});
