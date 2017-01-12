var request = require('request');

module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer'); 
    grunt.loadNpmTasks('grunt-imageoptim');
	
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        browserSync: {
            bsFiles: {
                src : ['./build/*.html','./build/css/**/*.css']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./build"
                }
            }
        },
        
        concat: {
			js: {
				src: ['assets/js/plugins.js', 'assets/js/main.js'],
                dest: 'build/js/scripts.js',
			}
		},
        uglify: {
			js: {
				src: ['build/js/scripts.js'],
                dest: 'build/js/scripts.min.js',
			}
		},
        sass: {         
            dist: {
                 options: {            
                  style: 'expanded', // Can be nested, compact, compressed, expanded.
				  //sourcemap: true // enable sourcemaps
                },
                files: {
        			'build/css/main.css': 'assets/sass/main.scss'
      			}
            }
        },
		autoprefixer:{
      		options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
				map: true
            },
			dist:{
        		files:{
          			'build/css/main.css':'build/css/main.css'
        		}
      		}
		},
        imageoptim: {
              myTask: {
                  src: ['assets/images', 'build/images']
              }
        },
		watch: {
            js: {files: ['assets/js/**/*.js'],
                tasks: ['concat','uglify']
            },
			css: {
				files: 'assets/sass/**/*.{scss,sass}',
				tasks: ['sass','autoprefixer']
			},

            
		}
	});
    // Optimize images.
    grunt.registerTask('img', ['imageoptim']);
    
    grunt.registerTask('default',['concat','uglify','browserSync', 'watch']);
}