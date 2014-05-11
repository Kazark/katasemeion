/* jshint expr: true */
describe('HTML generator factory', function() {
    var htmlgenerator;
    
    it('should exist', function() {
        katasemeion.make.htmlgenerator.should.be.ok;
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
            outputText.should.equal('<html>');
        });

        it('should know how to generate a close tag', function() {
            var element = htmlgenerator.element('html');
            element.closeTag();
            outputText.should.equal('</html>');
        });

        it('should know how to write out a value wrapped with the opening and closing tags', function() {
            var element = htmlgenerator.element('v');
            element.wrap(4);
            outputText.should.equal('<v>4</v>');
        });

        it('should know how to add an attribute to the opening tag', function() {
            var element = htmlgenerator.element('body').setAttribute('foo', 'bar');
            element.openTag();
            outputText.should.equal('<body foo="bar">');
        });

        it('should not add attributes to the closing tag', function() {
            var element = htmlgenerator.element('body').setAttribute('foo', 'bar');
            element.closeTag();
            outputText.should.equal('</body>');
        });

        it('should know how to add a class attribute', function() {
            var element = htmlgenerator.element('div').setClass('foo');
            element.openTag();
            outputText.should.equal('<div class="foo">');
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
            isElement(htmlgenerator.html()).should.be.true;
        });

        it('should contain a <head> element generator', function() {
            isElement(htmlgenerator.head()).should.be.true;
        });

        it('should contain a <meta> element generator', function() {
            isElement(htmlgenerator.meta()).should.be.true;
        });

        it('should contain a <body> element generator', function() {
            isElement(htmlgenerator.body()).should.be.true;
        });

        it('should contain a <p> paragraph element generator', function() {
            isElement(htmlgenerator.p()).should.be.true;
        });

        it('should contain a <blockquote> paragraph element generator', function() {
            isElement(htmlgenerator.blockquote()).should.be.true;
        });

        it('should contain a <span> paragraph element generator', function() {
            isElement(htmlgenerator.span()).should.be.true;
        });

        it('should contain a <div> paragraph element generator', function() {
            isElement(htmlgenerator.div()).should.be.true;
        });
    });
});

