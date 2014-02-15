katasemeion.sourceStream = function(sourceString) {
    var cursor = 0;
    var stream = {
        current : sourceString[cursor],
        pastEnd : true,
    };
    stream.advanceCursor = function() {
        cursor++;
        if (cursor >= sourceString.length) {
            stream.pastEnd = false;
            stream.current = null;
        } else {
            stream.current = sourceString[cursor];
        }
    };
    return stream;
};
