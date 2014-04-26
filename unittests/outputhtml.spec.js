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
});

