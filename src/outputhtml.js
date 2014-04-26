katasemeion.make.output.html = function(generator) {
    var annotation = generator.span().setAttribute('class', 'annotation');
    var self = {
        write: {}
    };

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

    self.variant = annotateWith('[', ']');
    self.insertion = annotateWith('⸤', '⸥');
    self.footnoteSubject = annotateWith('⸢', '⸣');

    self.chapterNumber = generator.span().setAttribute('class', 'chapter-number');
    self.verseNumber = generator.span().setAttribute('class', 'verse-number');
    self.todo = generator.span().setAttribute('class', 'todo');
    self.paragraph = generator.p();
    self.blockquote = generator.blockquote();

    return self;
};
