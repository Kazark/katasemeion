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
        output = { chapterNumber: {}, verseNumber: {}};
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

    describe('should recognize verse numbers, meaning it...', function() {
        beforeEach(function() {
            output.verseNumber = outputterMock;
            buildTestSubject();
        });
        it('should begin a verse number section when it encounters ${', function() {
            translator.translate(tokens.DollarWithOpenBrace());
            output.verseNumber.openTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize chapter numbers, meaning it...', function() {
        beforeEach(function() {
            output.chapterNumber = outputterMock;
            buildTestSubject();
        });
        it('should begin a chapter number section when it encounters %{', function() {
            translator.translate(tokens.PercentWithOpenBrace());
            output.chapterNumber.openTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize footnotes, meaning it...', function() {
        beforeEach(function() {
            output.footnoteSubject = outputterMock;
            buildTestSubject();
        });
        it('should begin the footnote subject when it encounters a @ without an {', function() {
            translator.translate(tokens.At());
            output.footnoteSubject.openTag.calledOnce.should.be.true;
        });

        describe('when it encounters an @{', function() {
            beforeEach(function() {
                output.footnote = {
                    openTag: sinon.spy(),
                    closeTag: sinon.spy(),
                };
            });
            it('after an @, it should end the footnote subject and begin the footnote', function() {
                translator.translate(tokens.At());
                translator.translate(tokens.AtWithOpenBrace());
                output.footnoteSubject.closeTag.calledOnce.should.be.true;
                output.footnote.openTag.calledOnce.should.be.true;
            });

            it('not after an @, it should not end the footnote subject, but only begin the footnote', function() {
                translator.translate(tokens.AtWithOpenBrace());
                output.footnoteSubject.closeTag.called.should.be.false;
                output.footnote.openTag.calledOnce.should.be.true;
            });

            it('after an @ has already been closed by a @{...}, it should not end the footnote subject', function() {
                translator.translate(tokens.At());
                translator.translate(tokens.AtWithOpenBrace());
                translator.translate(tokens.AtWithOpenBrace());
                output.footnoteSubject.closeTag.calledOnce.should.be.true;
            });
        });
    });
});
