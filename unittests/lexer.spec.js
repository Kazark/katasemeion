describe('Κατασημεῖον lexer', function() {
    var tokens = katasemeion.tokens;

    it('should exist', function() {
        expect(katasemeion.lexer).toBeTruthy();
    });

    describe('lex()', function() {
        var fakeTokenizers,
            tokenOutputCallback,
            lexer,
            stream;

        beforeEach(function() {
            fakeTokenizers = [
                jasmine.createSpy('tokenizer1'),
                jasmine.createSpy('tokenizer2')
            ];
            tokenOutputCallback = jasmine.createSpy('tokenOutputCallback');
            lexer = katasemeion.make.lexer(katasemeion.tokens, { all : fakeTokenizers }, tokenOutputCallback);
            stream = katasemeion.sourceStream("a");
        });

        it('should invoke each of the tokenizers in turn', function() {
            lexer.lex(stream);

            expect(fakeTokenizers[0]).toHaveBeenCalledWith(stream);
            expect(fakeTokenizers[1]).toHaveBeenCalledWith(stream);
        });

        it('should not pass return value of tokenizers to the callback function if it is falsy', function() {
            lexer.lex(stream);

            expect(tokenOutputCallback).not.toHaveBeenCalledWith(null);
            expect(tokenOutputCallback).not.toHaveBeenCalledWith(undefined);
            expect(tokenOutputCallback.calls.count()).toEqual(1);
        });

        it('should pass parsed tokens to the callback function', function() {
            fakeTokenizers.push(function(ss) { ss.advanceCursor(); return tokens.Hash; });

            lexer.lex(stream);

            expect(tokenOutputCallback).toHaveBeenCalledWith(tokens.Hash);
        });

        describe('if none of the tokenizers recognize the character', function() {
            it('should pass a character token to the callback function with the character', function() {
                lexer.lex(stream);

                var token = tokenOutputCallback.calls.mostRecent().args[0];
                expect(token.is(tokens.Character)).toBe(true);
                expect(token.data).toBe('a');
            });

            it('should advance the cursor of the source stream', function() {
                lexer.lex(stream);

                expect(stream.pastEnd).toBe(true);
            });
        });

        it('should run until there are no more tokens in the source stream', function() {
            stream = katasemeion.sourceStream("asdf");

            lexer.lex(stream);

            expect(tokenOutputCallback.calls.count()).toEqual(4);
            expect(stream.pastEnd).toBe(true);
        });
    });
});
