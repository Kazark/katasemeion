/* jshint expr: true */
describe('translator', function() {
    var translator;
    var tokens = katasemeion.tokens;
    var output;
    
    beforeEach(function() {
        var outputter = {
            openTag: sinon.spy(),
            closeTag: sinon.spy(),
        };
        output = {
            todo: outputter,
        };
        translator = katasemeion.make.translator(output);
    });

    it('should exist', function() {
        translator.should.be.ok;
    });

    it('should open a TODO block when the open angle bracket < is encountered', function() {
        translator.translate(tokens.OpenAngle());
        output.todo.openTag.calledOnce.should.be.true;
    });
});
