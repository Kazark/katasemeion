/* jshint expr: true */
describe('output module for HTML', function() {
    var html;
    var outputText;
    
    beforeEach(function() {
        var writeOut = function(text) { outputText += text; };
        outputText = '';
        html = katasemeion.make.output.html(katasemeion.make.htmlgenerator(writeOut));
    });

    it('should exist', function() {
        html.should.be.ok;
    });

    it('should know how to output the HTML format for a verse number', function() {
        html.verseNumber.openTag();
        outputText.should.equal('<span class="verse-number">');
    });

    it('should know how to output the HTML format for a chapter number', function() {
        html.chapterNumber.openTag();
        outputText.should.equal('<span class="chapter-number">');
    });

    it('should know how to output an HTML top-level element', function() {
        html.root.openTag();
        outputText.should.equal('<html>');
    });

    it('should know how to output an HTML metadata', function() {
        html.metadata.openTag();
        outputText.should.equal('<head>');
    });

    it('should know how to output an HTML document body', function() {
        html.document.openTag();
        outputText.should.equal('<body>');
    });

    it('should know how to output the HTML format for a paragraph', function() {
        html.paragraph.openTag();
        outputText.should.equal('<p>');
    });

    it('should know how to output the HTML format for bold text', function() {
        html.bold.openTag();
        outputText.should.equal('<b>');
    });

    it('should know how to output the HTML format for italics', function() {
        html.italic.openTag();
        outputText.should.equal('<i>');
    });

    it('should know how to output the HTML format for a an indented line', function() {
        html.indented.openTag();
        outputText.should.equal('<div class="indent">');
    });

    it('should know how to output the HTML format for a block quote', function() {
        html.blockquote.openTag();
        outputText.should.equal('<blockquote>');
    });

    it('should know how to output a <meta> element with content-type information', function() {
        html.contentType.openTag();
        outputText.should.equal('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">');
    });

    it('should know how to output the HTML format for the main text block', function() {
        html.mainTextBlock.openTag();
        outputText.should.equal('<div id="main-text-block">');
    });

    it('should know how to output a linke to a CSS stylesheet', function() {
        html.stylesheet('css/base.css').openTag();
        outputText.should.equal('<link rel="stylesheet" type="text/css" href="css/base.css">');
    });

    it('should know how to output the HTML format for section marked TODO', function() {
        html.todo.openTag();
        outputText.should.equal('<span class="todo">');
    });

    describe('should know how to output curved quotes, meaning it...', function() {
        it('should know how to output curved left double quote “', function() {
            html.curvedQuotes.leftDouble();
            outputText.should.equal('“');
        });
        it('should know how to output curved right double quote ”', function() {
            html.curvedQuotes.rightDouble();
            outputText.should.equal('”');
        });
        it('should know how to output curved left single quote ‘', function() {
            html.curvedQuotes.leftSingle();
            outputText.should.equal('‘');
        });
        it('should know how to output curved right single quote or apostrophe ’', function() {
            html.curvedQuotes.rightSingle();
            outputText.should.equal('’');
        });
    });

    describe('for a section marked as a textual variant', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.variant.openTag();
            outputText.should.equal('<span class="annotation">[</span>');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.variant.closeTag();
            outputText.should.equal('<span class="annotation">]</span>');
        });
    });

    describe('for a section of words inserted by the translator', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.insertion.openTag();
            outputText.should.equal('<span class="annotation">⸤</span>');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.insertion.closeTag();
            outputText.should.equal('<span class="annotation">⸥</span>');
        });
    });

    describe('for a section of words which are marked as the subject of a footnote', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.footnoteSubject.openTag();
            outputText.should.equal('<span class="annotation">⸢</span>');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.footnoteSubject.closeTag();
            outputText.should.equal('<span class="annotation">⸣</span>');
        });
    });

    describe('for footnote contents', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.footnote.openTag();
            outputText.should.equal('<span class="footnote-hover-area"><span class="footnote-marker">*</span><span class="footnote">');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.footnote.closeTag();
            outputText.should.equal('</span></span>');
        });
    });
});

