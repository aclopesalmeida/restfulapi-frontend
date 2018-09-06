module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            target: {
                files: {
                    'public/css/main.min.css':'public/css/main.css'
                }
            }
        },

        postcss: {
            options : {
                processors: [
                    require('autoprefixer')({browsers: 'last 1 version'})
                ]
            },
            dist: {
                src: 'public/css/main.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');


    grunt.registerTask('prefix', ['postcss']);
    grunt.registerTask('minify', ['cssmin']);
};