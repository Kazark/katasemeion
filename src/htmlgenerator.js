katasemeion.output.html = function(outFunction) {
    var self = {};
    self.element = function(tagName) {
        var elem = {};
        var attributes = '';
        elem.openTag = function() {
            outFunction('<' + tagName + attributes + '>');
        };
        elem.closeTag = function() {
            outFunction('</' + tagName + '>');
        };
        elem.setAttribute = function(name, value) {
            attributes += ' ' + name + '="' + value + '"';
        };
        return elem;
    };

    self.elements = {
        html: self.element('html'),
        head: self.element('head'),
        body: self.element('body'),
        p: self.element('p'),
        blockquote: self.element('blockquote'),
        span: self.element('span'),
    };

    return self;
};
