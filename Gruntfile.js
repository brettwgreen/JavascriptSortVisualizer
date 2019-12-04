module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: [
          'src/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/*.js']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true,
		  open: {
			  target: 'http://localhost:8000/src/SortVisualizer.html'
		  }
        }
      }
    },
    browserify: {
      bundle: {
        src: 'src/scripts/vue/App.js',
        dest: 'src/scripts/vue/vue_components.js'
      },
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: [
          ['vueify']
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('build', function() {
    grunt.task.run('browserify');
  });
  grunt.registerTask('default', ['connect']);

};