module.exports = function (grunt) {
    var srcDir = 'develop/',
        destDir = 'public/assets/';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, '.')];
                    }
                }
            }
        },

        cssmin: {
            compress: {
                options: {
                    report: 'min',
                    debugInfo: true,
                    lineNumbers: true
                },
                files: {
                    'public/assets/css/tokyo.min.css': [srcDir + 'css/*']
                }
            }
        },


        jshint: {
            files: [srcDir + 'js/tokyo.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            main: {
                files: {
                    'public/assets/js/tokyo.min.js': [ srcDir + 'js/*']
                }
            }

        },

        watch: {
            js: {
                files: [srcDir + 'js/*'],
                tasks: ['jshint', 'uglify:main', 'notify:watch'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: [srcDir + 'css/*'],
                tasks: ['cssmin', 'notify:watch'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['index.html'],
                tasks: ['notify:watch'],
                options: {
                    livereload: true,
                },
            }
        },

        notify: {
            task_name: {
                options: {
                    // Task-specific options go here.
                }
            },
            watch: {
                options: {
                    message: 'html is updated or CSS minified and Uglify finished running'
                }
            },
            server: {
                options: {
                    message: 'grunt server is ready!'
                }
            }
        }
    });

    // load module
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-notify');

    // ex.) grunt.registerTask('default', ['jshint', 'nodeunit', 'concat']);
    grunt.registerTask('default', ['watch']);

    // Listen for events when files are modified
    grunt.event.on('watch', function (action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });
};
