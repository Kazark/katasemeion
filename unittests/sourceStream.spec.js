describe('Κατασημεῖον source text stream', function() {
    var sourceStream = katasemeion.sourceStream;
    var characters;

    beforeEach(function() {
        characters = sourceStream('asdf');
    });

    it('should be initialized pointing to the first character of its string', function() {
        expect(characters.current).toBe('a');
    });

    it('should know when it has not pasted the end', function() {
        expect(characters.pastEnd).toBe(false);
    });

    it('should provide a way to advance the cursor', function() {
        characters.advanceCursor();
        expect(characters.current).toBe('s');
        characters.advanceCursor();
        expect(characters.current).toBe('d');
    });

    it('should know when it has pasted the end', function() {
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        expect(characters.pastEnd).toBe(true);
    });

    it('should set the current character to null when advanced past the end', function() {
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        expect(characters.current).toBe(null);
    });
});
