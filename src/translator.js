katasemeion.make.translator = function(tokens, output) {
    var self = {};

    var block = function(outputter, firstBlock) {
        var nextBlock = function() {};
        var openTokenType;
        var closeTokenType;
        var me = function(token) {
            if (token.is(openTokenType)) {
                outputter.openTag();
            } else if(token.is(closeTokenType)) {
                outputter.closeTag();
            } else {
                nextBlock(token);
            }
        };
        if (!firstBlock) { firstBlock = me; }
        me.beginsAt = function(x) {
            openTokenType = x;
            return me;
        };
        me.andEndsAt = function(x) {
            closeTokenType = x;
            return me;
        };
        me.block = function(nextOutputter) {
            nextBlock = block(nextOutputter, firstBlock);
            return nextBlock;
        };
        me.build = function() {
            return firstBlock;
        };
        return me;
    };

    self.translate = 
    block(output.todo)
        .beginsAt(tokens.OpenAngle)
        .andEndsAt(tokens.CloseAngle)
    .block(output.insertion)
        .beginsAt(tokens.OpenBracket)
        .andEndsAt(tokens.CloseBracket)
    .block(output.variant)
        .beginsAt(tokens.DoubleOpenBracket)
        .andEndsAt(tokens.DoubleCloseBracket)
    .build();
    return self;
};
