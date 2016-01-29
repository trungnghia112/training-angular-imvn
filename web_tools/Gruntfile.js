'use strict';

// Configurable paths
var path = {
    basePath: '../',
    distPath: '../dist/',
    thirdPartyPath: '../third_party/',
    bowerPath: './bower_components/'
};

// Configurable vendor scripts
var thirdPartyFile = [
    path.basePath + 'js/common.js'
];

// Configurable angular js
var angularCoreJs = [
    path.bowerPath + 'angular/angular.js',
    path.bowerPath + 'angular-mocks/angular-mocks.js',
    path.bowerPath + 'angular-ui-router/release/angular-ui-router.min.js',
    path.bowerPath + 'angular-resource/angular-resource.js',
    path.bowerPath + 'angular-animate/angular-animate.js',
    path.bowerPath + 'angular-cookies/angular-cookies.js',
    path.bowerPath + 'angular-messages/angular-messages.min.js',
    path.bowerPath + 'angular-sanitize/angular-sanitize.min.js',
    path.bowerPath + 'angular-touch/angular-touch.min.js',
    path.bowerPath + 'angular-bootstrap/ui-bootstrap-tpls.js',
    path.bowerPath + 'angular-bootstrap-confirm/dist/angular-bootstrap-confirm.min.js'
];

var angularAppJs = [
    path.basePath + 'js/angular/modules/**/*.js',
    path.basePath + 'js/angular/controllers/**/*.js',
    path.basePath + 'js/angular/directives/**/*.js',
    path.basePath + 'js/angular/factories/**/*.js',
    path.basePath + 'js/angular/services/**/*.js'
];

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    // Vendor fonts
                    {
                        expand: true,
                        dot: true,
                        cwd: path.bowerPath + 'bootstrap-sass/assets/fonts',
                        src: 'bootstrap/*',
                        dest: path.basePath + 'fonts'
                    },
                    // Vendor modernizr.js
                    {
                        expand: true,
                        dot: true,
                        cwd: path.bowerPath + 'modernizr',
                        src: 'modernizr.js',
                        dest: path.thirdPartyPath
                    },
                    // Vendor jquery-placeholder.js
                    {
                        expand: true,
                        dot: true,
                        cwd: path.bowerPath + '/jquery-placeholder',
                        src: 'jquery.placeholder.js',
                        dest: path.thirdPartyPath
                    }
                ]
            }
        },
        concat: {
            appjs: {
                src: thirdPartyFile,
                dest: path.distPath + 'app.js'
            },
            angularCoreMinJs: {
                src: angularCoreJs,
                dest: path.distPath + 'angular-core.js'
            },
            angularAppJs: {
                src: angularAppJs,
                dest: path.distPath + 'angular-app.js'
            },
            appcss: {
                src: [
                    path.basePath + 'css/style.css'
                ],
                dest: path.distPath + 'app.css'
            }
        },
        // min css
        cssmin: {
            options: {
                yuicompress: true
            },
            app: {
                src: path.distPath + 'app.css',
                dest: path.distPath + 'app.min.css'
            }
        },
        // min js
        uglify: {
            options: {
                compress: true
            },
            appmin: {
                src: path.distPath + 'app.js',
                dest: path.distPath + 'app.min.js'
            },
            angularCoreMinJs: {
                src: path.distPath + 'angular-core.js',
                dest: path.distPath + 'angular-core.min.js'
            },
            angularAppJs: {
                src: path.distPath + 'angular-app.js',
                dest: path.distPath + 'angular-app.min.js'
            }
        },
        jshint: {
            app: {
                files: {
                    src: [
                        path.basePath + 'js/common.js'
                    ]
                }
            },
            angularApp: {
                files: {
                    src: [
                        path.basePath + 'js/angular/**/*.js*'
                    ]
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                sourceMapEmbed: false,
                sourceMapContents: true,
                includePaths: ['.']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: path.basePath + 'scss/',
                    src: ['*.{scss,sass}'],
                    dest: path.basePath + 'css/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            appjs: {
                files: [
                    path.basePath + 'js/*.js',
                    path.basePath + 'js/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'concat',
                    'uglify'
                ]
            },
            appcss: {
                files: [
                    path.basePath + 'scss/*.{scss,sass}',
                    path.basePath + 'scss/**/*.{scss,sass}'
                ],
                tasks: [
                    'sass',
                    'concat:appcss',
                    'cssmin:app'
                ]
            }
        },
        imagemin: {
            dynamic: {
                optimizationLevel: 7,
                files: [{
                    expand: true,
                    cwd: path.basePath + 'images_temp/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: path.basePath + 'images/'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

    // Initial task(s).
    grunt.registerTask('setup', [
        'copy',
        'sass',
        'jshint',
        'concat',
        'cssmin',
        'uglify',
        'imagemin'
    ]);

    grunt.registerTask('buildcss', [
        'sass',
        'concat',
        'cssmin'
    ]);
    grunt.registerTask('build', [
        'sass',
        'jshint',
        'concat',
        'cssmin',
        'uglify',
        'imagemin'
    ]);

    grunt.registerTask('angularCoreMinJs', [
        'jshint',
        'concat:angularCoreMinJs',
        'uglify:angularCoreMinJs'
    ]);

    grunt.registerTask('angularMinJs', [
        'jshint',
        'concat:angularMinJs',
        'uglify:angularMinJs'
    ]);

};