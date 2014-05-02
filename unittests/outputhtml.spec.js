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

    it('should know how to output the HTML format for a paragraph', function() {
        html.paragraph.openTag();
        outputText.should.equal('<p>');
    });

    it('should know how to output the HTML format for a block quote', function() {
        html.blockquote.openTag();
        outputText.should.equal('<blockquote>');
    });

    it('should know how to output the HTML format for section marked TODO', function() {
        html.todo.openTag();
        outputText.should.equal('<span class="todo">');
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
            outputText.should.equal('<span class="footnote-marker">*</span><span class="footnote">');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.footnote.closeTag();
            outputText.should.equal('</span>');
        });
    });
});

