/* jshint expr: true */
describe('Κατασημεῖον tokenizers module', function() {
    var tokenizers = katasemeion.tokenizers;
    var tokens = katasemeion.tokens;
    var sourceStream = katasemeion.sourceStream;

    it('should exist', function() {
        tokenizers.should.be.ok;
    });

    it('should have a list of all the tokenizers', function() {
        tokenizers.all.should.be.ok;
        tokenizers.all.length.should.equal(14);
        tokenizers.all.forEach(function(t) {
            t.should.be.ok;
        });
    });

    describe('open bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeOpenBracket;

        it('should do nothing if there is no bracket at the beginning of the stream', function() {
            var characters = sourceStream('a[df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return an open bracket token cursor an open bracket', function() {
            var characters = sourceStream('[sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.OpenBracket).should.be.true;
        });

        it('should return a double open bracket token when stream is at two open brackets', function() {
            var characters = sourceStream('[[df');
            var token = tokenize(characters);
            characters.current.should.equal('d');
            token.is(tokens.DoubleOpenBracket).should.be.true;
        });
    });

    describe('close bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCloseBracket;

        it('should do nothing if there is no bracket at the beginning of the stream', function() {
            var characters = sourceStream('a]df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a close bracket token when stream cursor points to a close bracket', function() {
            var characters = sourceStream(']sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.CloseBracket).should.be.true;
        });

        it('should return a double close bracket token when stream is at two close brackets', function() {
            var characters = sourceStream(']]df');
            var token = tokenize(characters);
            characters.current.should.equal('d');
            token.is(tokens.DoubleCloseBracket).should.be.true;
        });
    });

    describe('asterisk tokenizer', function() {
        var tokenize =  tokenizers.tokenizeAsterisk;

        it('should do nothing if there is no asterisk at the beginning of the stream', function() {
            var characters = sourceStream('a*df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return an asterisk token when stream cursor points to an asterisk', function() {
            var characters = sourceStream('*sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Asterisk).should.be.true;
        });

        it('should return a double asterisk token when stream is at two asterisks', function() {
            var characters = sourceStream('**df');
            var token = tokenize(characters);
            characters.current.should.equal('d');
            token.is(tokens.DoubleAsterisk).should.be.true;
        });
    });

    describe('backtick tokenizer', function() {
        var tokenize =  tokenizers.tokenizeBacktick;

        it('should do nothing if there is no backtick at the beginning of the stream', function() {
            var characters = sourceStream('a`df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a backtick token when stream cursor points to a backtick', function() {
            var characters = sourceStream('`sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Backtick).should.be.true;
        });

        it('should return a double backtick token when stream is at two backticks', function() {
            var characters = sourceStream('``df');
            var token = tokenize(characters);
            characters.current.should.equal('d');
            token.is(tokens.DoubleBacktick).should.be.true;
        });
    });

    describe('single quote tokenizer', function() {
        var tokenize =  tokenizers.tokenizeSingleQuote;

        it('should do nothing if there is no single quote at the beginning of the stream', function() {
            var characters = sourceStream("a'df");
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a single quote token when stream cursor points to a single quote', function() {
            var characters = sourceStream("'sdf");
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.SingleQuote).should.be.true;
        });

        it('should return a double single-quote token when stream is at two single quotes', function() {
            var characters = sourceStream("''df");
            var token = tokenize(characters);
            characters.current.should.equal('d');
            token.is(tokens.DoubleSingleQuote).should.be.true;
        });
    });

    describe('newline tokenizer', function() {
        var tokenize =  tokenizers.tokenizeNewline;

        it('should do nothing if there is no newline at the beginning of the stream', function() {
            var characters = sourceStream('a\ndf');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a newline token when stream cursor points to a newline', function() {
            var characters = sourceStream('\nsdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Newline).should.be.true;
        });

        it('should return a double newline token when stream is at two newlines', function() {
            var characters = sourceStream('\n\ndf');
            var token = tokenize(characters);
            characters.current.should.equal('d');
            token.is(tokens.DoubleNewline).should.be.true;
        });
    });

    describe('"at" tokenizer', function() {
        var tokenize =  tokenizers.tokenizeAt;

        it('should do nothing if there is no "at" at the beginning of the stream', function() {
            var characters = sourceStream('a@df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return an "at" token when stream cursor points to an "at" with no open brace', function() {
            var characters = sourceStream('@sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.At).should.be.true;
        });

        it('should return an "at" token when stream cursor points to that combination', function() {
            var characters = sourceStream('@{df');
            var token = tokenize(characters);
            characters.current.should.equal('{');
            token.is(tokens.At).should.be.true;
        });
    });

    describe('open angle bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeOpenAngle;

        it('should do nothing if there is no open angle bracket at the beginning of the stream', function() {
            var characters = sourceStream('a<df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a open angle bracket token when stream is at a open angle bracket', function() {
            var characters = sourceStream('<sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.OpenAngle).should.be.true;
        });
    });

    describe('close angle bracket tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCloseAngle;

        it('should do nothing if there is no close angle bracket at the beginning of the stream', function() {
            var characters = sourceStream('a>df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a close angle bracket token when stream is at a close angle bracket', function() {
            var characters = sourceStream('>sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.CloseAngle).should.be.true;
        });
    });

    describe('open brace tokenizer', function() {
        var tokenize =  tokenizers.tokenizeOpenBrace;

        it('should do nothing if there is no open brace at the beginning of the stream', function() {
            var characters = sourceStream('a{df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a open brace token when stream cursor points to a open brace', function() {
            var characters = sourceStream('{sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.OpenBrace).should.be.true;
        });
    });

    describe('close brace tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCloseBrace;

        it('should do nothing if there is no close brace at the beginning of the stream', function() {
            var characters = sourceStream('a}df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a close brace token when stream cursor points to a close brace', function() {
            var characters = sourceStream('}sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.CloseBrace).should.be.true;
        });
    });

    describe('underscore tokenizer', function() {
        var tokenize =  tokenizers.tokenizeUnderscore;

        it('should do nothing if there is no underscore at the beginning of the stream', function() {
            var characters = sourceStream('a_df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return an underscore token when stream cursor points to an underscore', function() {
            var characters = sourceStream('_sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Underscore).should.be.true;
        });
    });

    describe('spaces tokenizer', function() {
        var tokenize =  tokenizers.tokenizeSpaces;

        it('should do nothing if there is no space at the beginning of the stream', function() {
            var characters = sourceStream('a    df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a space token when stream cursor points to one space', function() {
            var characters = sourceStream(' sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Space).should.be.true;
        });

        it('should return a space token when stream cursor points to two spaces', function() {
            var characters = sourceStream('  sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Space).should.be.true;
        });

        it('should return a space token when stream cursor points to three spaces', function() {
            var characters = sourceStream('   sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Space).should.be.true;
        });

        it('should return an indent token when stream cursor points to four spaces', function() {
            var characters = sourceStream('    sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Indent).should.be.true;
        });

        it('should only parse up to four spaces at once', function() {
            var characters = sourceStream('     ');
            var token = tokenize(characters);
            characters.current.should.equal(' ');
        });
    });

    describe('hash tokenizer', function() {
        var tokenize =  tokenizers.tokenizeHash;

        it('should do nothing if there is no hash at the beginning of the stream', function() {
            var characters = sourceStream('a#df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a hash token when stream cursor points to a hash', function() {
            var characters = sourceStream('#sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Hash).should.be.true;
        });
    });

    describe('percent sign tokenizer', function() {
        var tokenize =  tokenizers.tokenizePercent;

        it('should do nothing if there is no percent sign at the beginning of the stream', function() {
            var characters = sourceStream('a%df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a percent sign token when stream is at a percent sign', function() {
            var characters = sourceStream('%sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Percent).should.be.true;
        });
    });

    describe('caret sign tokenizer', function() {
        var tokenize =  tokenizers.tokenizeCaret;

        it('should do nothing if there is no caret sign at the beginning of the stream', function() {
            var characters = sourceStream('a$df');
            var token = tokenize(characters);
            should.not.exist(token);
            characters.current.should.equal('a');
        });

        it('should return a caret sign token when stream is at a caret sign', function() {
            var characters = sourceStream('^sdf');
            var token = tokenize(characters);
            characters.current.should.equal('s');
            token.is(tokens.Caret).should.be.true;
        });
    });
});
