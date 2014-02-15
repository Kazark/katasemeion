describe('Κατασημεῖον parser', function() {
    it('should exist', function() {
        expect(parser).toBeTruthy();
    });

    it('should parse paragraphs', function() {
        var output = parser.parse('Paragraph 1\nLine 2\n\nParagraph2\nLine2\n\Line3');

        expect(output.paragraphs.length).toBe(2);
    });
});
