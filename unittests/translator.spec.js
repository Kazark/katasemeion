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
        output = { todo: null, insertion: null };
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
        it('should begin the block when the open angle bracket < is encountered', function() {
            translator.translate(tokens.OpenAngle());
            output.todo.openTag.calledOnce.should.be.true;
        });
        it('should end the block when the closing angle bracket > is encountered', function() {
            translator.translate(tokens.CloseAngle());
            output.todo.closeTag.calledOnce.should.be.true;
        });
    });

    describe('should recognize insertion blocks, meaning it...', function() {
        beforeEach(function() {
            output.insertion = outputterMock;
            buildTestSubject();
        });
        it('should begin the block when the open square bracket [ is encountered', function() {
            translator.translate(tokens.OpenBracket());
            output.insertion.openTag.calledOnce.should.be.true;
        });
        it('should end the block when the close square bracket ] is encountered', function() {
            translator.translate(tokens.CloseBracket());
            output.insertion.closeTag.calledOnce.should.be.true;
        });
    });
});
