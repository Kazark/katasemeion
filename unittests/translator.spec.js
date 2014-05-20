/* jshint expr: true */
describe('translator', function() {
    var translator;
    var tokens = katasemeion.tokens;
    var outputterMock;
    var output;

    function buildTestSubject() {
        translator = katasemeion.make.translator(katasemeion.tokens, output);
    }
    
    beforeEach(function() {
        outputterMock = {
            openTag: sinon.spy(),
            closeTag: sinon.spy(),
        };
        output = {};
    });

    it('should exist', function() {
        katasemeion.make.translator.should.be.ok;
    });

    it('should ignore unknown tokens (for now)', function() {
        buildTestSubject(); // All members are null; it will throw if translator tries to output

        var UnknownTokenType = tokens.makeTokenType();
        var tokenOfUnknownType = UnknownTokenType();

        translator.translate(tokenOfUnknownType);
    });

    describe('should recognize TODO blocks, meaning it...', function() {
        beforeEach(function() {
            output.todo = outputterMock;
            buildTestSubject();
        });
        it('should begin the block when < is encountered', function() {
            translator.translate(tokens.OpenAngle());
            output.todo.openTag.calledOnce.should.be.true;
        });
        it('should end the block when > is encountered', function() {
            translator.translate(tokens.CloseAngle());
            output.todo.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize insertion blocks, meaning it...', function() {
        beforeEach(function() {
            output.insertion = outputterMock;
            buildTestSubject();
        });
        it('should begin the block when [ is encountered', function() {
            translator.translate(tokens.OpenBracket());
            output.insertion.openTag.calledOnce.should.be.true;
        });
        it('should end the block when ] is encountered', function() {
            translator.translate(tokens.CloseBracket());
            output.insertion.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize variant blocks, meaning it...', function() {
        beforeEach(function() {
            output.variant = outputterMock;
            buildTestSubject();
        });
        it('should begin the block when a [[ is encountered', function() {
            translator.translate(tokens.DoubleOpenBracket());
            output.variant.openTag.calledOnce.should.be.true;
        });
        it('should end the block when a ]] is encountered', function() {
            translator.translate(tokens.DoubleCloseBracket());
            output.variant.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize paragraphs, meaning it...', function() {
        beforeEach(function() {
            output.paragraph = outputterMock;
            buildTestSubject();
        });
        it('should end the previous one and begin a new one when two newline characters are encountered together', function() {
            translator.translate(tokens.DoubleNewline());
            output.paragraph.openTag.calledOnce.should.be.true;
            output.paragraph.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize italic text, meaning it...', function() {
        beforeEach(function() {
            output.italic = outputterMock;
            buildTestSubject();
        });
        it('should begin the section when it encounters an initial *', function() {
            translator.translate(tokens.Asterisk());
            output.italic.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters a second *', function() {
            translator.translate(tokens.Asterisk());
            translator.translate(tokens.Asterisk());
            output.italic.closeTag.calledOnce.should.be.true;
        });
        it('should begin the section when it encounters an initial _', function() {
            translator.translate(tokens.Underscore());
            output.italic.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters a second _', function() {
            translator.translate(tokens.Underscore());
            translator.translate(tokens.Underscore());
            output.italic.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize bold text, meaning it...', function() {
        beforeEach(function() {
            output.bold = outputterMock;
            buildTestSubject();
        });
        it('should begin the section when it encounters an initial **', function() {
            translator.translate(tokens.DoubleAsterisk());
            output.bold.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters a second **', function() {
            translator.translate(tokens.DoubleAsterisk());
            translator.translate(tokens.DoubleAsterisk());
            output.bold.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize verse numbers, meaning it...', function() {
        beforeEach(function() {
            output.verseNumber = outputterMock;
            buildTestSubject();
        });
        it('should begin the section when it encounters an initial ^', function() {
            translator.translate(tokens.Caret());
            output.verseNumber.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters a second ^', function() {
            translator.translate(tokens.Caret());
            translator.translate(tokens.Caret());
            output.verseNumber.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize chapter numbers, meaning it...', function() {
        beforeEach(function() {
            output.chapterNumber = outputterMock;
            buildTestSubject();
        });
        it('should begin the section when it encounters an initial %', function() {
            translator.translate(tokens.Percent());
            output.chapterNumber.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters a second %', function() {
            translator.translate(tokens.Percent());
            translator.translate(tokens.Percent());
            output.chapterNumber.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize footnote subjects, meaning it...', function() {
        beforeEach(function() {
            output.footnoteSubject = outputterMock;
            buildTestSubject();
        });
        it('should begin the section when it encounters an initial @', function() {
            translator.translate(tokens.At());
            output.footnoteSubject.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters a second @', function() {
            translator.translate(tokens.At());
            translator.translate(tokens.At());
            output.footnoteSubject.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize footnotes, meaning it...', function() {
        beforeEach(function() {
            output.footnote = outputterMock;
            buildTestSubject();
        });
        it('should begin the section when it encounters {', function() {
            translator.translate(tokens.OpenBrace());
            output.footnote.openTag.calledOnce.should.be.true;
        });
        it('should end the section when it encounters }', function() {
            translator.translate(tokens.CloseBrace());
            output.footnote.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize plain text characters, meaning it...', function() {
        beforeEach(function() {
            output.plaintext = sinon.spy();
            buildTestSubject();
        });
        it('should output a space when it encounters a space token', function() {
            translator.translate(tokens.Space());
            output.plaintext.calledWith(' ').should.be.true;
        });
        it('should output a single newline when it encounters it', function() {
            translator.translate(tokens.Newline());
            output.plaintext.calledWith('\n').should.be.true;
        });
        it('should output any other non-special character it encounters', function() {
            var character = tokens.Character();
            character.data = 'x';
            translator.translate(character);
            output.plaintext.calledWith('x').should.be.true;
        });
    });
});
