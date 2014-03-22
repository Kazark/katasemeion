katasemeion.output.html = function(outFunction) {
    var self = {};
    self.element = function(tagName) {
        var elem = {};
        elem.openTag = function() {
            outFunction('<' + tagName + '>');
        };
        elem.closeTag = function() {
            outFunction('</' + tagName + '>');
        };
        return elem;
    };

    self.elementList = {
        html: self.element('html'),
        head: self.element('head'),
        body: self.element('body'),
        p: self.element('p')
    };

    self.generateHeader = function() {
    };

    return self;
};
