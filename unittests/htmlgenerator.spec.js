describe('HTML generator', function() {
    var htmlgenerator;
    var logSpy = jasmine.createSpy('console.log');
    
    beforeEach(function() {
        htmlgenerator = katasemeion.output.html(logSpy);
    });

    it('should exist', function() {
        expect(htmlgenerator).toBeTruthy();
    });

    describe('element', function() {
        it('should know how to generate an open tag', function() {
            var element = htmlgenerator.element('html');
            element.openTag();
            expect(logSpy).toHaveBeenCalledWith('<html>');
        });
    });
});
