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

        it('should know how to generate a close tag', function() {
            var element = htmlgenerator.element('html');
            element.closeTag();
            expect(logSpy).toHaveBeenCalledWith('</html>');
        });
    });

    describe('element list', function() {
        function isElement(object) {
            return object && typeof object.closeTag === 'function' && typeof object.openTag === 'function';
        }

        it('should contain a top-level <html> element', function() {
            expect(isElement(htmlgenerator.elementList.html)).toBe(true);
        });

        it('should contain a <head> element', function() {
            expect(isElement(htmlgenerator.elementList.head)).toBe(true);
        });

        it('should contain a <body> element', function() {
            expect(isElement(htmlgenerator.elementList.body)).toBe(true);
        });

        it('should contain a <p> paragraph element', function() {
            expect(isElement(htmlgenerator.elementList.p)).toBe(true);
        });

        it('should contain a <blockquote> paragraph element', function() {
            expect(isElement(htmlgenerator.elementList.blockquote)).toBe(true);
        });

        it('should contain a <span> paragraph element', function() {
            expect(isElement(htmlgenerator.elementList.span)).toBe(true);
        });
    });
});

