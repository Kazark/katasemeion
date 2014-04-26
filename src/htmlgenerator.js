katasemeion.make.htmlgenerator = function(outFunction) {
    var self = {};
    self.element = function(tagName) {
        var elem = {};
        var attributes = '';
        elem.setAttribute = function(name, value) {
            attributes += ' ' + name + '="' + value + '"';
            return elem;
        };
        elem.openTag = function() {
            outFunction('<' + tagName + attributes + '>');
        };
        elem.closeTag = function() {
            outFunction('</' + tagName + '>');
        };
        elem.wrap = function(value) {
            elem.openTag();
            outFunction(value);
            elem.closeTag();
        };
        return elem;
    };

    self.html = function() { return self.element('html'); };
    self.head = function() { return self.element('head'); };
    self.body = function() { return self.element('body'); };
    self.p = function() { return self.element('p'); };
    self.blockquote = function() { return self.element('blockquote'); };
    self.span = function() { return self.element('span'); };
    self.div = function() { return self.element('div'); };

    return self;
};
