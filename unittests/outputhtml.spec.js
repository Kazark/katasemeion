describe('output module for HTML', function() {
    var html;
    var logSpy;
    
    beforeEach(function() {
        logSpy = jasmine.createSpy('console.log');
        html = katasemeion.output.html(logSpy);
    });

    it('should exist', function() {
        expect(html).toBeTruthy();
    });
});

