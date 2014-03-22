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
    return self;
};
