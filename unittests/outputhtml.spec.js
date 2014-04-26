describe('output module for HTML', function() {
    var html;
    var logSpy;
    
    beforeEach(function() {
        logSpy = jasmine.createSpy('console.log');
        html = katasemeion.make.output.html(katasemeion.make.htmlgenerator(logSpy));
    });

    it('should exist', function() {
        expect(html).toBeTruthy();
    });

    it('should know how to output the HTML format for a verse number', function() {
        html.write.verseNumber.openTag();
        expect(logSpy).toHaveBeenCalledWith('<span class="verse-number">');
    });

    it('should know how to output the HTML format for a paragraph', function() {
        html.write.paragraph.openTag();
        expect(logSpy).toHaveBeenCalledWith('<p>');
    });

    it('should know how to output the HTML format for a block quote', function() {
        html.write.blockquote.openTag();
        expect(logSpy).toHaveBeenCalledWith('<blockquote>');
    });

    it('should know how to output the HTML format for section marked TODO', function() {
        html.write.todo.openTag();
        expect(logSpy).toHaveBeenCalledWith('<span class="todo">');
    });
});

