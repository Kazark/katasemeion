describe('Κατασημεῖον tokenizers module', function() {
    var tokenizers = katasemeion.tokenizers;
    var tokens = katasemeion.tokens;
    var sourceStream = katasemeion.sourceStream;

    it('should exist', function() {
        expect(tokenizers).toBeTruthy();
    });

    it('should have a list of all the tokenizers', function() {
        expect(tokenizers.all).toBeTruthy();
        expect(tokenizers.all.length).toBe(13);
    });

    describe('open bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeOpenBracket;

        it('should do nothing if there is no bracket at the beginning of the stream', function() {
            var characters = sourceStream('a[df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return an open bracket token when stream cursor points to an open bracket', function() {
            var characters = sourceStream('[sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.OpenBracket)).toBe(true);
        });

        it('should return a double open bracket token when stream is at two open brackets', function() {
            var characters = sourceStream('[[df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.DoubleOpenBracket)).toBe(true);
        });
    });

    describe('close bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCloseBracket;

        it('should do nothing if there is no bracket at the beginning of the stream', function() {
            var characters = sourceStream('a]df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a close bracket token when stream cursor points to a close bracket', function() {
            var characters = sourceStream(']sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.CloseBracket)).toBe(true);
        });

        it('should return a double close bracket token when stream is at two close brackets', function() {
            var characters = sourceStream(']]df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.DoubleCloseBracket)).toBe(true);
        });
    });

    describe('asterisk tokenizer', function() {
        var tokenize =  tokenizers.tokenizeAsterisk;

        it('should do nothing if there is no asterisk at the beginning of the stream', function() {
            var characters = sourceStream('a*df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return an asterisk token when stream cursor points to an asterisk', function() {
            var characters = sourceStream('*sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Asterisk)).toBe(true);
        });

        it('should return a double asterisk token when stream is at two asterisks', function() {
            var characters = sourceStream('**df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.DoubleAsterisk)).toBe(true);
        });
    });

    describe('newline tokenizer', function() {
        var tokenize =  tokenizers.tokenizeNewline;

        it('should do nothing if there is no newline at the beginning of the stream', function() {
            var characters = sourceStream('a\ndf');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a newline token when stream cursor points to a newline', function() {
            var characters = sourceStream('\nsdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Newline)).toBe(true);
        });

        it('should return a double newline token when stream is at two newlines', function() {
            var characters = sourceStream('\n\ndf');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.DoubleNewline)).toBe(true);
        });
    });

    describe('"at" tokenizer', function() {
        var tokenize =  tokenizers.tokenizeAt;

        it('should do nothing if there is no "at" at the beginning of the stream', function() {
            var characters = sourceStream('a@df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return an "at" token when stream cursor points to an "at" with no open brace', function() {
            var characters = sourceStream('@sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.At)).toBe(true);
        });

        it('should return an "at with open brace" token when stream cursor points to that combination', function() {
            var characters = sourceStream('@{df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.AtWithOpenBrace)).toBe(true);
        });
    });

    describe('open angle bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeOpenAngle;

        it('should do nothing if there is no open angle bracket at the beginning of the stream', function() {
            var characters = sourceStream('a<df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a open angle bracket token when stream is at a open angle bracket', function() {
            var characters = sourceStream('<sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.OpenAngle)).toBe(true);
        });
    });

    describe('close angle bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCloseAngle;

        it('should do nothing if there is no close angle bracket at the beginning of the stream', function() {
            var characters = sourceStream('a>df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a close angle bracket token when stream is at a close angle bracket', function() {
            var characters = sourceStream('>sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.CloseAngle)).toBe(true);
        });
    });

    describe('close brace tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCloseBrace;

        it('should do nothing if there is no close brace at the beginning of the stream', function() {
            var characters = sourceStream('a}df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a close brace token when stream cursor points to a close brace', function() {
            var characters = sourceStream('}sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.CloseBrace)).toBe(true);
        });
    });

    describe('underscore tokenizer', function() {
        var tokenize =  tokenizers.tokenizeUnderscore;

        it('should do nothing if there is no underscore at the beginning of the stream', function() {
            var characters = sourceStream('a_df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return an underscore token when stream cursor points to an underscore', function() {
            var characters = sourceStream('_sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Underscore)).toBe(true);
        });
    });

    describe('spaces tokenizer', function() {
        var tokenize =  tokenizers.tokenizeSpaces;

        it('should do nothing if there is no space at the beginning of the stream', function() {
            var characters = sourceStream('a    df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a space token when stream cursor points to one space', function() {
            var characters = sourceStream(' sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Space)).toBe(true);
        });

        it('should return a space token when stream cursor points to two spaces', function() {
            var characters = sourceStream('  sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Space)).toBe(true);
        });

        it('should return a space token when stream cursor points to three spaces', function() {
            var characters = sourceStream('   sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Space)).toBe(true);
        });

        it('should return an indent token when stream cursor points to four spaces', function() {
            var characters = sourceStream('    sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Indent)).toBe(true);
        });

        it('should only parse up to four spaces at once', function() {
            var characters = sourceStream('     ');
            var token = tokenize(characters);
            expect(characters.current).toBe(' ');
        });
    });

    describe('hash tokenizer', function() {
        var tokenize =  tokenizers.tokenizeHash;

        it('should do nothing if there is no hash at the beginning of the stream', function() {
            var characters = sourceStream('a#df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a hash token when stream cursor points to a hash with no following v or c', function() {
            var characters = sourceStream('#sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Hash)).toBe(true);
        });
    });

    describe('percent sign tokenizer', function() {
        var tokenize =  tokenizers.tokenizePercent;

        it('should do nothing if there is no percent sign at the beginning of the stream', function() {
            var characters = sourceStream('a%df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a percent sign token when stream is at a percent sign with no open brace', function() {
            var characters = sourceStream('%sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Percent)).toBe(true);
        });

        it('should return a "percent sign with open brace" token when stream is at that combination', function() {
            var characters = sourceStream('%{df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.PercentWithOpenBrace)).toBe(true);
        });
    });

    describe('dollar sign tokenizer', function() {
        var tokenize =  tokenizers.tokenizeDollar;

        it('should do nothing if there is no dollar sign at the beginning of the stream', function() {
            var characters = sourceStream('a$df');
            var token = tokenize(characters);
            expect(token).toBeFalsy();
            expect(characters.current).toBe('a');
        });

        it('should return a dollar sign token when stream is at a dollar sign with no open brace', function() {
            var characters = sourceStream('$sdf');
            var token = tokenize(characters);
            expect(characters.current).toBe('s');
            expect(token.is(tokens.Dollar)).toBe(true);
        });

        it('should return a "dollar sign with open brace" token when stream is at that combination', function() {
            var characters = sourceStream('${df');
            var token = tokenize(characters);
            expect(characters.current).toBe('d');
            expect(token.is(tokens.DollarWithOpenBrace)).toBe(true);
        });
    });
});