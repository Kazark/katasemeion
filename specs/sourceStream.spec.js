/* jshint expr: true */
describe('Κατασημεῖον source text stream', function() {
    var sourceStream = katasemeion.sourceStream;
    var characters;

    beforeEach(function() {
        characters = sourceStream('asdf');
    });

    it('should be initialized pointing to the first character of its string', function() {
        characters.current.should.equal('a');
    });

    it('should know when it has not pasted the end', function() {
        characters.pastEnd.should.be.false;
    });

    it('should provide a way to advance the cursor', function() {
        characters.advanceCursor();
        characters.current.should.equal('s');
        characters.advanceCursor();
        characters.current.should.equal('d');
    });

    it('should know when it has pasted the end', function() {
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        characters.pastEnd.should.be.true;
    });

    it('should set the current character to null when advanced past the end', function() {
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        characters.advanceCursor();
        should.not.exist(characters.current);
    });
});
