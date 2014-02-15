module.exports = function(grunt) {
    var mainOutputScript = 'build/katasemeion.js';
    var jasmineOutputFile = 'build/test-results.html';
    grunt.initConfig({
        concat: {
            options: {
                separator: ''
            },
            app: {
                dest: mainOutputScript,
                src: [
                    'src/intro.js.frag',
                    'src/*.js',
                    'src/outro.js.frag'
                ]
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js*', 'unittests/*.spec.js'],
                tasks: ['unittests']
            }
        },
        jshint: {
            all: {
                files: {
                    src: ['build/app.js']
                }
            }
        },
        jasmine: {
            all: {
                src: mainOutputScript,
                options: {
                    specs: 'unittests/*.spec.js',
                    outfile: jasmineOutputFile,
                    keepRunner: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('unittests', ['concat', 'jshint', 'jasmine:all']);
    grunt.registerTask('default', ['unittests']);
    grunt.registerTask('dev', ['default', 'watch']);
};
