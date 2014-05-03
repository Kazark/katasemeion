/* jshint expr: true */
describe('translator', function() {
    var translator;
    var tokens = katasemeion.tokens;
    var outputterMock;

    function buildTestSubject(output) {
        translator = katasemeion.make.translator(katasemeion.tokens, output);
    }
    
    beforeEach(function() {
        outputterMock = {
            openTag: sinon.spy(),
            closeTag: sinon.spy(),
        };
    });

    it('should exist', function() {
        katasemeion.make.translator.should.be.ok;
    });

    describe('should recognize TODO blocks, meaning it...', function() {
        var output;
        beforeEach(function() {
            output = {
                todo: outputterMock
            };
            buildTestSubject(output);
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
        var output;
        beforeEach(function() {
            output = {
                insertion: outputterMock
            };
            buildTestSubject(output);
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
