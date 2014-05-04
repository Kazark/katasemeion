katasemeion.make.translator = function(tokens, output) {
    var self = {};

    var ifTokenIs = function(tokenType, firstMe) {
        var _thenAction;
        var _elseAction;
        var me = function(token) {
            if (token.is(tokenType)) {
                _thenAction();
            } else {
                _elseAction(token);
            }
        };
        if (!firstMe) { firstMe = me; }
        me.then = function(x) {
            _thenAction = x;
            return me;
        };
        me.otherwise = function(x) {
            _elseAction = x;
            return me;
        };
        me.ifTokenIs = function(type) {
            _elseAction = ifTokenIs(type, firstMe);
            return _elseAction;
        };
        me.build = function() {
            return firstMe;
        };
        return me;
    };

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
    ifTokenIs(tokens.DoubleNewline)
        .then(function() {
            output.paragraph.closeTag();
            output.paragraph.openTag();
        })
    .otherwise(
    block(output.todo)
        .beginsAt(tokens.OpenAngle)
        .andEndsAt(tokens.CloseAngle)
    .block(output.insertion)
        .beginsAt(tokens.OpenBracket)
        .andEndsAt(tokens.CloseBracket)
    .block(output.variant)
        .beginsAt(tokens.DoubleOpenBracket)
        .andEndsAt(tokens.DoubleCloseBracket)
    .build())
    .build();

    return self;
};
