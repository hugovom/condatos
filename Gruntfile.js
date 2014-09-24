module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      all: {
        dest: 'js/_bower.js',
        bowerOptions: {
          relative: false
        }
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['js/**/*.js'],
        // the location of the resulting JS file
        dest: 'js/main.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/<%= pkg.name %>.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    shell: {
      agenda: {
        command: function (language) {
          return "node build-agenda.js " + language + " > _includes/agenda-" + language + ".html";
        }
      },
      bower_install: {
        command: "bower install"
      },
      npm_install: {
        command: "npm install"
      }
    },
    uglify: {
      build: {
        src: 'js/main.js',
        dest: 'js/main.js'
      }
    },
    clean: {
      js: ["js/_bower.js"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['jshint', 'shell:npm_install', 'shell:bower_install', 'bower_concat', 'concat', 'uglify', 'clean']);
  grunt.registerTask('agenda', ['shell:agenda:es', 'shell:agenda:en']);

};

