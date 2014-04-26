describe('HTML generator factory', function() {
    var htmlgenerator;
    
    it('should exist', function() {
        expect(katasemeion.make.htmlgenerator).toBeTruthy();
    });

    describe('element object', function() {
        var outputText;

        beforeEach(function() {
            outputText = '';
            htmlgenerator = katasemeion.make.htmlgenerator(function(text) { outputText += text; });
        });

        it('should know how to generate an open tag', function() {
            var element = htmlgenerator.element('html');
            element.openTag();
            expect(outputText).toBe('<html>');
        });

        it('should know how to generate a close tag', function() {
            var element = htmlgenerator.element('html');
            element.closeTag();
            expect(outputText).toBe('</html>');
        });

        it('should know how to write out a value wrapped with the opening and closing tags', function() {
            var element = htmlgenerator.element('v');
            element.wrap(4);
            expect(outputText).toBe('<v>4</v>');
        });

        it('should know how to add an attribute to the opening tag', function() {
            var element = htmlgenerator.element('body').setAttribute('foo', 'bar');
            element.openTag();
            expect(outputText).toBe('<body foo="bar">');
        });

        it('should not add attributes to the closing tag', function() {
            var element = htmlgenerator.element('body').setAttribute('foo', 'bar');
            element.closeTag();
            expect(outputText).toBe('</body>');
        });
    });

    describe('specific element generators', function() {
        beforeEach(function() {
            htmlgenerator = katasemeion.make.htmlgenerator();
        });

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

        it('should contain a <div> paragraph element generator', function() {
            expect(isElement(htmlgenerator.div())).toBe(true);
        });
    });
});

