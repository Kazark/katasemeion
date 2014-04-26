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

    describe('element object', function() {
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
            var element = htmlgenerator.element('body').setAttribute('foo', 'bar');
            element.openTag();
            expect(logSpy).toHaveBeenCalledWith('<body foo="bar">');
            element.closeTag();
            expect(logSpy).toHaveBeenCalledWith('</body>');
        });

        it('should not add attributes to the closing tag', function() {
            var element = htmlgenerator.element('body').setAttribute('foo', 'bar');
            element.closeTag();
            expect(logSpy).toHaveBeenCalledWith('</body>');
        });
    });

    describe('specific element generators', function() {
        function isElement(object) {
            return object && typeof object.closeTag === 'function' && typeof object.openTag === 'function';
        }

        it('should contain a top-level <html> element generator', function() {
            expect(isElement(htmlgenerator.html())).toBe(true);
        });

        it('should contain a <head> element generator', function() {
            expect(isElement(htmlgenerator.head())).toBe(true);
        });

        it('should contain a <body> element generator', function() {
            expect(isElement(htmlgenerator.body())).toBe(true);
        });

        it('should contain a <p> paragraph element generator', function() {
            expect(isElement(htmlgenerator.p())).toBe(true);
        });

        it('should contain a <blockquote> paragraph element generator', function() {
            expect(isElement(htmlgenerator.blockquote())).toBe(true);
        });

        it('should contain a <span> paragraph element generator', function() {
            expect(isElement(htmlgenerator.span())).toBe(true);
        });
    });
});

