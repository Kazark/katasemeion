katasemeion.make.output.html = function(generator) {
    var annotation = generator.span().setClass('annotation');
    var self = {
        write: {}
    };
    var footnoteMarker = generator.span().setClass('footnote-marker');
    var footnoteContents = generator.span().setClass('footnote');

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
    self.stylesheet = function(path) {
        return generator.link()
                        .setAttribute('rel', 'stylesheet')
                        .setAttribute('type', 'text/css')
                        .setAttribute('href', path);
    };
    self.mainTextBlock = generator.div().setAttribute('id', 'main-text-block');

    self.variant = annotateWith('[', ']');
    self.insertion = annotateWith('⸤', '⸥');
    self.footnoteSubject = annotateWith('⸢', '⸣');

    self.chapterNumber = generator.span().setClass('chapter-number');
    self.verseNumber = generator.span().setClass('verse-number');
    self.todo = generator.span().setClass('todo');
    self.paragraph = generator.p();
    self.blockquote = generator.blockquote();

    self.plaintext = generator.plaintext;

    return self;
};
