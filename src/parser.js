katasemeion.parser = (function() {
    var self = {};
    self.parse = function(inputText) {
        var output = {
            paragraphs: {}
        };
        output.paragraphs = inputText.split("\n\n");
        return output;
    };
    return self;
})();
