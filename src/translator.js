katasemeion.make.translator = function(tokens, output) {
    var self = {};
    var openedFootnoteSubject = false;

    var map = function(tokenType) {
        var _action;
        var me = function(token) {
            if (token.is(tokenType)) {
                _action();
            } else {
                me.passItOn(token);
            }
        };
        me.to = function(action) {
            _action = action;
            return me;
        };
        me.passItOn = function() {};
        return me;
    };

    var block = function(outputBlock) {
        var _openTokenType;
        var _closeTokenType;
        var me = function(token) {
            if (token.is(_openTokenType)) {
                outputBlock.openTag();
            } else if (token.is(_closeTokenType)) {
                outputBlock.closeTag();
            } else {
                me.passItOn(token);
            }
        };
        me.beginsAt = function(x) {
            _openTokenType = x;
            return me;
        };
        me.andEndsAt = function(x) {
            _closeTokenType = x;
            return me;
        };
        me.passItOn = function() {};
        return me;
    };

    var buildTranslator = function(conditionals) {
        for (var i = 0; i < conditionals.length-1; i++) {
            conditionals[i].passItOn = conditionals[i+1];
        }
        return conditionals[0];
    };

    var toggle = function(outputter) {
        var on = false;
        return function() {
            if (on) {
                outputter.closeTag();
            } else {
                outputter.openTag();
            }
            on = !on;
        };
    };

    self.translate = buildTranslator([
        map(tokens.Percent).to(toggle(output.chapterNumber)),
        map(tokens.Caret).to(toggle(output.verseNumber)),
        map(tokens.DoubleNewline).to(function() {
            output.paragraph.closeTag();
            output.paragraph.openTag();
        }),
        block(output.todo)
            .beginsAt(tokens.OpenAngle)
            .andEndsAt(tokens.CloseAngle),
        block(output.insertion)
            .beginsAt(tokens.OpenBracket)
            .andEndsAt(tokens.CloseBracket),
        block(output.variant)
            .beginsAt(tokens.DoubleOpenBracket)
            .andEndsAt(tokens.DoubleCloseBracket),
    ]);

    return self;
};
