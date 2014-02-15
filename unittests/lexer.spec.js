describe('Κατασημεῖον lexer', function() {
    var lexer = katasemeion.lexer;
    var tokens = katasemeion.tokens;
    var sourceStream = katasemeion.sourceStream;

    it('should exist', function() {
        expect(lexer).toBeTruthy();
    });

    describe('open bracket tokenizer', function() {
        var tokenize =  lexer.tokenizeOpenBracket;

        it('should do nothing if there is no bracket in the stream', function() {
            var token = tokenize(sourceStream('asdf'));
            expect(token).toBeFalsy();
        });

        it('should return an open bracket token when stream cursor points to an open bracket', function() {
            var token = tokenize(sourceStream('[sdf'));
            expect(token.is(tokens.OpenBracketToken)).toBe(true);
        });

        it('should advance the cursor when it has parsed an open bracket token', function() {
            var characters = sourceStream('[sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
        });

        it('should return a double open bracket token when stream is at two open brackets', function() {
            var token = tokenize(sourceStream('[[df'));
            expect(token.is(tokens.DoubleOpenBracketToken)).toBe(true);
        });

        it('should advance the cursor when it has parsed a double open bracket token', function() {
            var characters = sourceStream('[[df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
        });
    });
});
