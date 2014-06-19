katasemeion.make.translator = function(tokens, output) {
    var self = {};
    var openedFootnoteSubject = false;

    var indentation = (function() {
        var indentLevel = 0;
        var x = {};
        x.increase = function() {
            output.indented.openTag();
            indentLevel++;
        };
        x.reset = function() {
            while (indentLevel > 0) {
                output.indented.closeTag();
                indentLevel--;
            }
        };
        return x;
    })();

    var map = function(tokenType) {
        var _action;
        var me = function(token) {
            if (token.is(tokenType)) {
                _action(token);
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
        map(tokens.DoubleAsterisk).to(toggle(output.bold)),
        map(tokens.Asterisk).to(toggle(output.italic)),
        map(tokens.Underscore).to(toggle(output.italic)),
        map(tokens.At).to(toggle(output.footnoteSubject)),
        map(tokens.DoubleBacktick).to(function() {
            output.plaintext('"');
        }),
        map(tokens.Backtick).to(function() {
            output.plaintext('\'');
        }),
        map(tokens.DoubleSingleQuote).to(function() {
            output.plaintext('"');
        }),
        map(tokens.SingleQuote).to(function() {
            output.plaintext('\'');
        }),
        block(output.todo)
            .beginsAt(tokens.OpenAngle)
            .andEndsAt(tokens.CloseAngle),
        block(output.footnote)
            .beginsAt(tokens.OpenBrace)
            .andEndsAt(tokens.CloseBrace),
        block(output.insertion)
            .beginsAt(tokens.OpenBracket)
            .andEndsAt(tokens.CloseBracket),
        block(output.variant)
            .beginsAt(tokens.DoubleOpenBracket)
            .andEndsAt(tokens.DoubleCloseBracket),
        map(tokens.Character).to(function(token) {
            output.plaintext(token.data);
        }),
        map(tokens.Space).to(function() {
            output.plaintext(' ');
        }),
        map(tokens.Newline).to(function() {
            indentation.reset();
            output.plaintext('\n');
        }),
        map(tokens.DoubleNewline).to(function() {
            indentation.reset();
            output.paragraph.closeTag();
            output.paragraph.openTag();
        }),
        map(tokens.Indent).to(indentation.increase),
    ]);

    return self;
};
