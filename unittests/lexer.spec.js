describe('Κατασημεῖον lexer', function() {
    it('should exist', function() {
        expect(katasemeion.lexer).toBeTruthy();
    });

    describe('lex', function() {
        var fakeTokenizers = [
            jasmine.createSpy('tokenizer1'),
            jasmine.createSpy('tokenizer2')
        ];
        var lexer = katasemeion.make.lexer({ all : fakeTokenizers });
        var stream = katasemeion.sourceStream("a");

        it('should invoke each of the tokenizers in turn', function() {
            lexer.lex(stream);

            expect(fakeTokenizers[0]).toHaveBeenCalledWith(stream);
            expect(fakeTokenizers[1]).toHaveBeenCalledWith(stream);
        });
    });
});
