describe('output module for HTML', function() {
    var html;
    var outputText;
    
    beforeEach(function() {
        var writeOut = function(text) { outputText += text; };
        outputText = '';
        html = katasemeion.make.output.html(katasemeion.make.htmlgenerator(writeOut));
    });

    it('should exist', function() {
        expect(html).toBeTruthy();
    });

    it('should know how to output the HTML format for a verse number', function() {
        html.verseNumber.openTag();
        expect(outputText).toBe('<span class="verse-number">');
    });

    it('should know how to output the HTML format for a chapter number', function() {
        html.chapterNumber.openTag();
        expect(outputText).toBe('<span class="chapter-number">');
    });

    it('should know how to output the HTML format for a paragraph', function() {
        html.paragraph.openTag();
        expect(outputText).toBe('<p>');
    });

    it('should know how to output the HTML format for a block quote', function() {
        html.blockquote.openTag();
        expect(outputText).toBe('<blockquote>');
    });

    it('should know how to output the HTML format for section marked TODO', function() {
        html.todo.openTag();
        expect(outputText).toBe('<span class="todo">');
    });

    describe('for a section marked as a textual variant', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.variant.openTag();
            expect(outputText).toBe('<span class="annotation">[</span>');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.variant.closeTag();
            expect(outputText).toBe('<span class="annotation">]</span>');
        });
    });

    describe('for a section of words inserted by the translator', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.insertion.openTag();
            expect(outputText).toBe('<span class="annotation">⸤</span>');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.insertion.closeTag();
            expect(outputText).toBe('<span class="annotation">⸥</span>');
        });
    });

    describe('for a section of words which are marked as the subject of a footnote', function() {
        it('should know how to output the HTML format for beginning the section', function() {
            html.footnoteSubject.openTag();
            expect(outputText).toBe('<span class="annotation">⸢</span>');
        });
        it('should know how to output the HTML format for ending the section', function() {
            html.footnoteSubject.closeTag();
            expect(outputText).toBe('<span class="annotation">⸣</span>');
        });
    });
});

