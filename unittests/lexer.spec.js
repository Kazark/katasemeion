describe('Κατασημεῖον lexer', function() {
    var tokens = katasemeion.tokens;

    it('should exist', function() {
        expect(katasemeion.lexer).toBeTruthy();
    });

    describe('lex', function() {
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
            lexer = katasemeion.make.lexer({ all : fakeTokenizers }, tokenOutputCallback);
            stream = katasemeion.sourceStream("a");
        });

        it('should invoke each of the tokenizers in turn', function() {
            lexer.lex(stream);

            expect(fakeTokenizers[0]).toHaveBeenCalledWith(stream);
            expect(fakeTokenizers[1]).toHaveBeenCalledWith(stream);
        });

        it('should not pass return value of tokenizers to the callback function if it is null', function() {
            lexer.lex(stream);

            expect(tokenOutputCallback).not.toHaveBeenCalled();
        });

        it('should pass parsed tokens to the callback function', function() {
            fakeTokenizers.push(function() { return tokens.Hash; });

            lexer.lex(stream);

            expect(tokenOutputCallback).toHaveBeenCalledWith(tokens.Hash);
        });
    });
});
