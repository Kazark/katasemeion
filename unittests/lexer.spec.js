describe('Κατασημεῖον lexer', function() {
    var lexer = katasemeion.lexer;
    var tokens = katasemeion.tokens;
    var sourceStream = katasemeion.sourceStream;

    it('should exist', function() {
        expect(lexer).toBeTruthy();
    });

    describe('open bracket tokenizer', function() {
        var tokenize =  lexer.tokenizeOpenBracket;

        it('should do nothing if there is no bracket at the beginning of the stream', function() {
            var characters = sourceStream('a[df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return an open bracket token when stream cursor points to an open bracket', function() {
            var token = tokenize(sourceStream('[sdf'));
            expect(token.is(tokens.OpenBracket)).toBe(true);
        });

        it('should advance the cursor when it has parsed an open bracket token', function() {
            var characters = sourceStream('[sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
        });

        it('should return a double open bracket token when stream is at two open brackets', function() {
            var token = tokenize(sourceStream('[[df'));
            expect(token.is(tokens.DoubleOpenBracket)).toBe(true);
        });

        it('should advance the cursor when it has parsed a token', function() {
            var characters = sourceStream('[[df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
        });
    });

    describe('close bracket tokenizer', function() {
        var tokenize =  lexer.tokenizeCloseBracket;

        it('should do nothing if there is no bracket at the beginning of the stream', function() {
            var characters = sourceStream('a]df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a close bracket token when stream cursor points to a close bracket', function() {
            var token = tokenize(sourceStream(']sdf'));
            expect(token.is(tokens.CloseBracket)).toBe(true);
        });

        it('should advance the cursor when it has parsed a close bracket token', function() {
            var characters = sourceStream(']sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
        });

        it('should return a double close bracket token when stream is at two close brackets', function() {
            var token = tokenize(sourceStream(']]df'));
            expect(token.is(tokens.DoubleCloseBracket)).toBe(true);
        });

        it('should advance the cursor when it has parsed a token', function() {
            var characters = sourceStream(']]df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
        });
    });

    describe('underscore tokenizer', function() {
        var tokenize =  lexer.tokenizeUnderscore;

        it('should do nothing if there is no underscore at the beginning of the stream', function() {
            var characters = sourceStream('a_df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return an underscore token when stream cursor points to an underscore', function() {
            var token = tokenize(sourceStream('_sdf'));
            expect(token.is(tokens.Underscore)).toBe(true);
        });

        it('should advance the cursor when it has parsed a token', function() {
            var characters = sourceStream('_sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
        });
    });
});
