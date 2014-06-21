/* jshint expr: true */
describe('Κατασημεῖον lexer', function() {
    var tokens = katasemeion.tokens;

    it('should exist', function() {
        katasemeion.make.lexer.should.be.ok;
    });

    describe('lex()', function() {
        var fakeTokenizers,
            tokenOutputCallback,
            lexer,
            stream;

        beforeEach(function() {
            fakeTokenizers = [
                sinon.spy(),
                sinon.spy()
            ];
            tokenOutputCallback = sinon.spy();
            lexer = katasemeion.make.lexer(katasemeion.tokens, { all : fakeTokenizers }, tokenOutputCallback);
            stream = katasemeion.sourceStream("a");
        });

        it('should invoke each of the tokenizers in turn', function() {
            lexer.lex(stream);

            fakeTokenizers[0].calledWith(stream).should.be.true;
            fakeTokenizers[1].calledWith(stream).should.be.true;
        });

        it('should not pass return value of tokenizers to the callback function if it is falsy', function() {
            lexer.lex(stream);

            tokenOutputCallback.args[0].should.exist;
            tokenOutputCallback.calledOnce.should.be.true;
        });

        it('should pass parsed tokens to the callback function', function() {
            fakeTokenizers.push(function(ss) { ss.advanceCursor(); return tokens.Hash; });

            lexer.lex(stream);

            tokenOutputCallback.calledWith(tokens.Hash).should.be.true;
        });

        describe('if none of the tokenizers recognize the character', function() {
            it('should pass a character token to the callback function with the character', function() {
                lexer.lex(stream);

                var token = tokenOutputCallback.lastCall.args[0];
                token.is(tokens.Character).should.be.true;
                token.data.should.equal('a');
            });

            it('should advance the cursor of the source stream', function() {
                lexer.lex(stream);

                stream.pastEnd.should.be.true;
            });
        });

        it('should run until there are no more tokens in the source stream', function() {
            stream = katasemeion.sourceStream("asdf");

            lexer.lex(stream);

            tokenOutputCallback.callCount.should.equal(4);
            stream.pastEnd.should.be.true;
        });
    });
});
