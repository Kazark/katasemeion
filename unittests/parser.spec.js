/* jshint expr: true */
describe('Κατασημεῖον parser', function() {
    it('should exist', function() {
        katasemeion.parser.should.be.ok;
    });

    it('should parse paragraphs', function() {
        var output = katasemeion.parser.parse('Paragraph 1\nLine 2\n\nParagraph2\nLine2\nLine3');

        output.paragraphs.length.should.equal(2);
    });
});
