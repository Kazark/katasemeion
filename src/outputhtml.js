katasemeion.make.output.html = function(generator) {
    var annotation = generator.span().setAttribute('class', 'annotation');
    var self = {
        write: {}
    };
    self.chapterNumber = generator.span().setAttribute('class', 'chapter-number');
    self.verseNumber = generator.span().setAttribute('class', 'verse-number');
    self.todo = generator.span().setAttribute('class', 'todo');
    self.paragraph = generator.p();
    self.blockquote = generator.blockquote();

    self.variant = {};
    self.variant.openTag = function() {
        annotation.wrap('[');
    };
    self.variant.closeTag = function() {
        annotation.wrap(']');
    };
    return self;
};
