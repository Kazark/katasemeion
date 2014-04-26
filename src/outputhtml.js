katasemeion.make.output.html = function(generator) {
    var self = {
        write: {}
    };
    self.write.verseNumber = generator.span().setAttribute('class', 'verse-number');
    return self;
};
