katasemeion.make.output.html = function(generator) {
    var annotation = generator.span().setAttribute('class', 'annotation');
    var self = {
        write: {}
    };
    var footnoteMarker = generator.span().setAttribute('class', 'footnote-marker');
    var footnoteContents = generator.span().setAttribute('class', 'footnote');

    function annotateWith(beginSymbol, endSymbol) {
        var annotated = {};
        annotated.openTag = function() {
            annotation.wrap(beginSymbol);
        };
        annotated.closeTag = function() {
            annotation.wrap(endSymbol);
        };
        return annotated;
    }

    self.footnote = (function() {
        var f = {};
        f.openTag = function() {
            footnoteMarker.wrap('*');
            footnoteContents.openTag();
        };
        f.closeTag = function() {
            footnoteContents.closeTag();
        };
        return f;
    })();

    self.contentType = generator.meta()
                                .setAttribute('http-equiv', 'Content-Type')
                                .setAttribute('content', 'text/html; charset=UTF-8');

    self.variant = annotateWith('[', ']');
    self.insertion = annotateWith('⸤', '⸥');
    self.footnoteSubject = annotateWith('⸢', '⸣');

    self.chapterNumber = generator.span().setAttribute('class', 'chapter-number');
    self.verseNumber = generator.span().setAttribute('class', 'verse-number');
    self.todo = generator.span().setAttribute('class', 'todo');
    self.paragraph = generator.p();
    self.blockquote = generator.blockquote();

    self.plaintext = generator.plaintext;

    return self;
};
