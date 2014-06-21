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

        function shouldBeAnElement(object) {
            object.should.be.ok;
            object.openTag.should.be.a('function');
            object.closeTag.should.be.a('function');
        }

        it('should contain a top-level <html> element generator', function() {
            shouldBeAnElement(htmlgenerator.html());
        });

        it('should contain a <head> element generator', function() {
            shouldBeAnElement(htmlgenerator.head());
        });

        it('should contain a <meta> element generator', function() {
            shouldBeAnElement(htmlgenerator.meta());
        });

        it('should contain a <link> element generator', function() {
            shouldBeAnElement(htmlgenerator.link());
        });

        it('should contain a <body> element generator', function() {
            shouldBeAnElement(htmlgenerator.body());
        });

        it('should contain a <p> paragraph element generator', function() {
            shouldBeAnElement(htmlgenerator.p());
        });

        it('should contain a <blockquote> paragraph element generator', function() {
            shouldBeAnElement(htmlgenerator.blockquote());
        });

        it('should contain a <span> paragraph element generator', function() {
            shouldBeAnElement(htmlgenerator.span());
        });

        it('should contain a <div> paragraph element generator', function() {
            shouldBeAnElement(htmlgenerator.div());
        });

        it('should contain a <b> bold text element generator', function() {
            shouldBeAnElement(htmlgenerator.b());
        });

        it('should contain a <i> italic text element generator', function() {
            shouldBeAnElement(htmlgenerator.i());
        });
    });
});

