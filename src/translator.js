katasemeion.make.translator = function(tokens, output) {
    var self = {};
    self.translate = function(token) {
        if (token.is(tokens.OpenAngle))
        {
            output.todo.openTag();
        }
        else if (token.is(tokens.CloseAngle))
        {
            output.todo.closeTag();
        }
        else if (token.is(tokens.OpenBracket))
        {
            output.insertion.openTag();
        }
        else if (token.is(tokens.CloseBracket))
        {
            output.insertion.closeTag();
        }
    };
    return self;
};
