describe('Κατασημεῖον lexer', function() {
    var lexer = katasemeion.lexer;
    var tokenizers = katasemeion.tokenizers;

    it('should exist', function() {
        expect(lexer).toBeTruthy();
    });

    describe('lex', function() {
        var all;
        beforeEach(function() { /* Sure would be nice to have a beforeAll instead for part of this... */
            all = tokenizers.all;
            tokenizers.all = [
                jasmine.createSpy('tokenizer1'),
                jasmine.createSpy('tokenizer2')
            ];
        });

        it('should invoke each of the tokenizers in turn', function() {
            lexer.lex();

            expect(tokenizers.all[0]).toHaveBeenCalled();
            expect(tokenizers.all[1]).toHaveBeenCalled();
        });
        
        afterEach(function() { /* Sure would be nice to have an afterAll instead... */
            tokenizers.all = all;
        });
    });
});
