katasemeion.make.output.html = function(generator) {
    var self = {
        write: {}
    };
    self.write.verseNumber = generator.span().setAttribute('class', 'verse-number');
    self.write.todo = generator.span().setAttribute('class', 'todo');
    self.write.paragraph = generator.p();
    self.write.blockquote = generator.blockquote();
    return self;
};
