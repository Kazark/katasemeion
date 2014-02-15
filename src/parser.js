var parser = (function() {
    var self = this;
    self.parse = function(inputText) {
        var output = {
            paragraphs: {}
        };
        output.paragraphs = inputText.split("\n\n");
        return output;
    };
    return self;
})();
