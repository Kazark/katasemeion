describe('Κατασημεῖον parser', function() {
    it('should exist', function() {
        expect(katasemeion.parser).toBeTruthy();
    });

    it('should parse paragraphs', function() {
        var output = katasemeion.parser.parse('Paragraph 1\nLine 2\n\nParagraph2\nLine2\nLine3');

        expect(output.paragraphs.length).toBe(2);
    });
});
