describe('HTML generator', function() {
    var htmlgenerator;
    var logSpy;
    
    beforeEach(function() {
        logSpy = jasmine.createSpy('console.log');
        htmlgenerator = katasemeion.make.htmlgenerator(logSpy);
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

        it('should know how to add an attribute to the opening tag', function() {
            var element = htmlgenerator.element('body');
            element.setAttribute('foo', 'bar');
            element.openTag();
            expect(logSpy).toHaveBeenCalledWith('<body foo="bar">');
            element.closeTag();
            expect(logSpy).toHaveBeenCalledWith('</body>');
        });

        it('should not add attributes to the closing tag', function() {
            var element = htmlgenerator.element('body');
            element.setAttribute('foo', 'bar');
            element.closeTag();
            expect(logSpy).toHaveBeenCalledWith('</body>');
        });
    });

    describe('element list', function() {
        function isElement(object) {
            return object && typeof object.closeTag === 'function' && typeof object.openTag === 'function';
        }

        it('should contain a top-level <html> element', function() {
            expect(isElement(htmlgenerator.elements.html)).toBe(true);
        });

        it('should contain a <head> element', function() {
            expect(isElement(htmlgenerator.elements.head)).toBe(true);
        });

        it('should contain a <body> element', function() {
            expect(isElement(htmlgenerator.elements.body)).toBe(true);
        });

        it('should contain a <p> paragraph element', function() {
            expect(isElement(htmlgenerator.elements.p)).toBe(true);
        });

        it('should contain a <blockquote> paragraph element', function() {
            expect(isElement(htmlgenerator.elements.blockquote)).toBe(true);
        });

        it('should contain a <span> paragraph element', function() {
            expect(isElement(htmlgenerator.elements.span)).toBe(true);
        });
    });
});

