katasemeion.sourceStream = function(sourceString) {
    var cursor = 0;
    var stream = {
        current : sourceString[cursor],
        pastEnd : false,
    };
    stream.advanceCursor = function() {
        cursor++;
        if (cursor >= sourceString.length) {
            stream.pastEnd = true;
            stream.current = null;
        } else {
            stream.current = sourceString[cursor];
        }
    };
    return stream;
};
