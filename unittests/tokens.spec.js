/* jshint expr: true */
describe('Κατασημεῖον tokens module', function() {
    var tokens = katasemeion.tokens;

    it('should exist', function() {
        tokens.should.be.ok;
    });

    describe('token type factory', function() {
        var makeTokenType = tokens.makeTokenType;

        it('should create token types', function() {
            var tokenType = makeTokenType(1);
            tokenType.should.be.ok;
        });

        describe('a token type', function() {
            it('should be a token factory', function() {
                var token = makeTokenType(1)();
                token.should.be.ok;
            });

            describe('a token', function() {
                it('should know its type', function() {
                    var tokenType = makeTokenType(1);
                    var token = tokenType();
                    token.is(tokenType).should.be.true;
                });

                it('should know it is not of another type', function() {
                    var tokenType1 = makeTokenType(1);
                    var tokenType2 = makeTokenType(2);
                    var token = tokenType1();
                    token.is(tokenType2).should.be.false;
                });
            });
        });
    });

    describe('token types', function() {
        var isTokenType = function(x) {
            return typeof x.typeIs === "function";
        };

        it('should include open square bracket', function() {
            isTokenType(tokens.OpenBracket).should.be.true;
        });

        it('should include double open square bracket', function() {
            isTokenType(tokens.DoubleOpenBracket).should.be.true;
        });

        it('should include close square bracket', function() {
            isTokenType(tokens.CloseBracket).should.be.true;
        });

        it('should include double close square bracket', function() {
            isTokenType(tokens.DoubleCloseBracket).should.be.true;
        });

        it('should include open angle bracket', function() {
            isTokenType(tokens.OpenAngle).should.be.true;
        });

        it('should include close angle bracket', function() {
            isTokenType(tokens.CloseAngle).should.be.true;
        });

        it('should include "at" sign', function() {
            isTokenType(tokens.At).should.be.true;
        });

        it('should include an "at" sign with open curly brace combination', function() {
            isTokenType(tokens.AtWithOpenBrace).should.be.true;
        });

        it('should include a close curly brace', function() {
            isTokenType(tokens.CloseBrace).should.be.true;
        });

        it('should include asterisk', function() {
            isTokenType(tokens.Asterisk).should.be.true;
        });

        it('should include double asterisk', function() {
            isTokenType(tokens.DoubleAsterisk).should.be.true;
        });

        it('should include space', function() {
            isTokenType(tokens.Space).should.be.true;
        });

        it('should include newline', function() {
            isTokenType(tokens.Newline).should.be.true;
        });

        it('should include double newline', function() {
            isTokenType(tokens.DoubleNewline).should.be.true;
        });

        it('should include indent', function() {
            isTokenType(tokens.Indent).should.be.true;
        });

        it('should include underscore', function() {
            isTokenType(tokens.Underscore).should.be.true;
        });

        it('should include hash', function() {
            isTokenType(tokens.Hash).should.be.true;
        });

        it('should include dollar sign', function() {
            isTokenType(tokens.Dollar).should.be.true;
        });

        it('should include dollar sign with an open curly brace combination', function() {
            isTokenType(tokens.DollarWithOpenBrace).should.be.true;
        });

        it('should include percent sign', function() {
            isTokenType(tokens.Percent).should.be.true;
        });

        it('should include percent sign with an open curly brace combination', function() {
            isTokenType(tokens.PercentWithOpenBrace).should.be.true;
        });

        it('should include plain text character', function() {
            isTokenType(tokens.Character).should.be.true;
        });
    });
});
