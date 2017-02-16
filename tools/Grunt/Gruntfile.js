var SITE_DOMAIN = 'local.sitename.com',
    SITE_URL = 'https://' + SITE_DOMAIN;

var SASS_FILES = {
    '<%= pkg.assetsDir %>/css/<%= pkg.name %>/<%= pkg.name %>.min.css' : ['<%= pkg.sourceDir %>/scss/<%= pkg.name %>/<%= pkg.name %>.scss']
};

var JAVASCRIPT_FILES = {
    '<%= pkg.assetsDir %>/js/<%= pkg.name %>/<%= pkg.name %>.min.js': [
        '<%= pkg.sourceDir %>/js/<%= pkg.name %>/*.js',
        '<%= pkg.sourceDir %>/js/<%= pkg.name %>/**/*.js'
    ] 
};

var WEBFONT_FILES = {
    src: '<%= pkg.sourceDir %>/icons/<%= pkg.name %>/*.svg',
    dest: '<%= pkg.assetsDir %>/fonts/icons',
    destCss: '<%= pkg.sourceDir %>/scss/<%= pkg.name %>/global/variables',
    font: 'icons',
    template: '<%= pkg.sourceDir %>/icons/<%= pkg.name %>/config/template.scss'
};

var CRITICAL_CSS_FILE = '<%= pkg.assetsDir %>/css/<%= pkg.name %>/<%= pkg.name %>.critical.css';

var WATCH_JAVASCRIPT_FILES = [
    '<%= pkg.sourceDir %>/js/<%= pkg.name %>/**/*.js'
];

var WATCH_JAVASCRIPT_SPEC_FILES = [
    '<%= pkg.sourceDir %>/tests/js/**/*.js'
];

var WATCH_SASS_FILES = [
    '<%= pkg.sourceDir %>/scss/<%= pkg.name %>/**/*.scss'
];

var WATCH_WEBFONT_FILES = [
    '<%= pkg.sourceDir %>/icons/<%= pkg.name %>/*.svg'
];

var babel = require('rollup-plugin-babel');

module.exports = function(grunt) {
    var cwd = process.cwd();
    grunt.file.setBase('../..');
    
    require('jit-grunt')(grunt, {
        sasslint: 'grunt-sass-lint'
    });

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: SASS_FILES
            }
        },

        webfont: {
            icons: {
                src: WEBFONT_FILES.src,
                dest: WEBFONT_FILES.dest,
                destCss: WEBFONT_FILES.destCss,
                options: {
                    font: WEBFONT_FILES.font,
                    engine: 'fontforge',
                    fontHeight: 512,
                    hashes: true,
                    template: WEBFONT_FILES.template,
                    stylesheet: 'scss',
                    htmlDemo: false,
                    types: ['eot', 'woff', 'ttf', 'svg'],
                    optimize: true,
                    autoHint: false,
                    normalize: true
                }
            }
        },

        cssmetrics: {
            main: {
                src: ['<%= pkg.assetsDir %>/css/<%= pkg.name %>/**/*.css'],
                options: {
                    quiet: false,
                    maxSelectors: 4095,
                    maxFileSize: 10240000
                }
            }
        },

        watch: {
            options: {
                interrupt: true,
                livereload: false,
                files: ['<%= pkg.assetsDir %>/css/**/*.css'],
                cliArgs: ['--gruntfile', require('path').join(cwd, 'Gruntfile.js')], // Here we are resetting the current working dir
            },

            javascript: {
                files: WATCH_JAVASCRIPT_FILES,
                tasks: ['rollup', 'concat']
            },

            specs: {
                files: WATCH_JAVASCRIPT_SPEC_FILES,
                tasks: ['jasmine']
            },

            sass: {
                files: WATCH_SASS_FILES,
                tasks: ['sass', 'postcss']
            },

            webfont: {
                files: WATCH_WEBFONT_FILES,
                tasks: ['webfont']
            }
        },

        // post processing for css output files
        postcss: {
            main: {
                options: {
                    map: false, // inline sourcemaps
                    processors: [
                        require('pixrem')(),
                        require('autoprefixer')({
                            browsers: 'last 5 versions' // add vendor prefixes
                        }),
                        require("postcss-font-smoothing"),
                        require('cssnano')() // minify the result
                    ]
                },
                src: '<%= pkg.assetsDir %>/css/<%= pkg.name %>/<%= pkg.name %>.min.css',
                dest: '<%= pkg.assetsDir %>/css/<%= pkg.name %>/<%= pkg.name %>.min.css'
            },
            
            critical: {
                options: {
                    map: false,
                    processors: [
                        require('pixrem')(),
                        require('autoprefixer')({
                            browsers: 'last 2 versions' // add vendor prefixes
                        }),
                        require('cssnano')() // minify the result
                    ]
                },
                src: '<%= pkg.assetsDir %>/css/<%= pkg.name %>/critical.css',
                dest: '<%= pkg.assetsDir %>/css/<%= pkg.name %>/critical.min.css'
            }
        },

        // Node identifies all specs to rollup and runs them
        test: require('../../source/tests/jasmine/config/processor')(grunt),

        karma: {
            options: {
                configFile: '<%= pkg.sourceDir %>/tests/jasmine/config/karma.conf.js'
            },
            local: {
                plugins: [
                    'karma-jasmine',
                    'karma-phantomjs-launcher'
                ]
            }
        },

        concat: {
            dist: {
                files: {
                    '<%= pkg.assetsDir %>/js/<%= pkg.name %>/<%= pkg.name %>.min.js': [
                        '<%= pkg.sourceDir %>/js/<%= pkg.name %>/libs/*.js',
                        '<%= pkg.assetsDir %>/js/<%= pkg.name %>/<%= pkg.name %>.min.js',
                    ]
                }
            }
        },

        jasmine: {
            unit: {
                src:'<%= pkg.assetsDir %>/js/<%= pkg.name %>/<%= pkg.name %>.min.js',
                options: {
                    specs: '<%= pkg.sourceDir %>/tests/js/*.js',
                    vendor: '<%= pkg.sourceDir %>/tests/js/vendor/*.js'
                }
            },
        },

        critical: {
            custom: {
                options: {
                    base: '../../',
                    width: 1920,
                    height: 1080,
                    css: '<%= pkg.assetsDir %>/css/<%= pkg.name %>/<%= pkg.name %>.css',
                    timeout: 30000
                },
                src: SITE_URL,
                dest: '<%= pkg.assetsDir %>/css/<%= pkg.name %>/critical.css',
            }
        },

        exec: {
            kentico: {
                stdout: true,
                command: '<%= pkg.websiteRootDir %>/bin/ContinuousIntegration.exe -r'
            }
        },

        sasslint: {
            options: {
                configFile: '.scsslint.yml',
                // formatter: 'junit',
                // outputFile: 'report.xml'
            },
            target: '<%= pkg.sourceDir %>/scss/<%= pkg.name %>/**/*.scss'
        },


        rollup: {
            options: {
                plugins: function () {
                    return [
                        babel({
                            exclude: 'node_modules',
                            presets: ['es2015-rollup']
                        }),
                    ];
                }
            },
            main: {
                files: [{
                    dest: '<%= pkg.assetsDir %>/js/<%= pkg.name %>/<%= pkg.name %>.min.js',
                    src: '<%= pkg.sourceDir %>/js/<%= pkg.name %>/<%= pkg.name %>.js'
                }]
            }
        },

    });

    grunt.registerTask('default', ['rollup', 'concat', 'forced-webfont', 'sasslint', 'sass', 'postcss:main', 'watch']);
    grunt.registerTask('criticalcss', ['critical', 'postcss:critical']);
    grunt.registerTask('dist', ['rollup', 'concat', 'forced-webfont', 'sasslint', 'sass', 'postcss:main']);

    grunt.registerTask('forced-webfont', 'Forces webfont task', function () {
        var tasks = ['webfont'];
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

};