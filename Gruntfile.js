module.exports = function(grunt) {
    var libOutputScript = 'build/katasemeion.js';
    var mainOutputScript = 'build/app.js';
    var specPathGlob = 'specs/*.spec.js';
    var concattedSpecs = 'build/specs.js';
    grunt.initConfig({
        concat: {
            options: {
                separator: ''
            },
            lib: {
                dest: libOutputScript,
                src: [
                    'src/intro.js.frag',
                    'src/sourceStream.js',
                    'src/tokens.js',
                    'src/tokenizers.js',
                    'src/translator.js',
                    'src/lexer.js',
                    'src/parser.js',
                    'src/htmlgenerator.js',
                    'src/outputhtml.js',
                    'src/outro.js.frag'
                ]
            },
            app: {
                dest: mainOutputScript,
                src: [
                    libOutputScript,
                    'src/main.js'
                ]
            },
            specs: {
                dest: concattedSpecs,
                src: [specPathGlob],
            },
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'src/*.js*', specPathGlob],
                tasks: ['specs']
            }
        },
        jshint: {
            all: {
                options: {
                    undef: true,
                    eqeqeq: true
                },
                files: {
                    src: libOutputScript
                }
            }
        },
        mocha: {
            options: {
                run: true,
                reporter: 'Spec',
            },
            test: {
                src: ['specs/specs.html'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('specs', ['concat', 'jshint', 'mocha']);
    grunt.registerTask('default', ['specs']);
    grunt.registerTask('dev', ['default', 'watch']);
};
