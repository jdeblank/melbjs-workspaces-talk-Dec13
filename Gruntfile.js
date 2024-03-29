// Generated on 2013-11-14 using generator-bespoke v0.4.2

module.exports = function(grunt) {

  var config = {
    clean: {
      public: 'public/**/*'
    },
    jade: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.jade',
          dest: 'public/',
          ext: '.html'
        }]
      }
    },
    stylus: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/styles/',
          src: '**/*.styl',
          dest: 'public/styles/',
          ext: '.css'
        }],
        options: {
          compress: false
        }
      }
    },
    coffee: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/scripts/',
          src: '**/*.coffee',
          dest: 'public/scripts/',
          ext: '.js'
        }]
      }
    },
    sass: {
      options: {
        style: 'compressed',
        sourcemap: true
      },
      src: {
        files: [{
          expand: true,
          cwd: 'src/styles/',
          src: '**/*.scss',
          dest: 'public/styles/',
          ext: '.css'
        }]
      }
    },
    copy: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            '**/*',
            '!<%= jade.src.files[0].src %>',
            '!<%= stylus.src.files[0].src %>',
            '!<%= coffee.src.files[0].src %>',
            '!<%= sass.src.files[0].src %>'
          ],
          dest: 'public/'
        }]
      }
    },
    watch: {
      jade: {
        files: '<%= jade.src.files[0].cwd + jade.src.files[0].src %>',
        tasks: 'jade'
      },
      stylus: {
        files: '<%= stylus.src.files[0].cwd + stylus.src.files[0].src %>',
        tasks: 'stylus'
      },
      coffee: {
        files: '<%= coffee.src.files[0].cwd + coffee.src.files[0].src %>',
        tasks: 'coffee'
      },
      sass: {
        files: '<%= sass.src.files[0].cwd + sass.src.files[0].src %>',
        tasks: 'sass'
      },
      copy: {
        files: [
          '<%= copy.src.files[0].cwd + copy.src.files[0].src[0] %>',
          '!<%= jade.src.files[0].cwd + jade.src.files[0].src %>',
          '!<%= stylus.src.files[0].cwd + stylus.src.files[0].src %>',
          '!<%= coffee.src.files[0].cwd + coffee.src.files[0].src %>',
          '!<%= sass.src.files[0].cwd + sass.src.files[0].src %>',
          'images/*'
        ],
        tasks: 'copy:src'
      },
      public: {
        files: [
          'public/**/*',
          '!public/bower_components/**/*'
        ],
        options: {
          livereload: 35729
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*', // Remove this line if you only want the server available locally
          base: 'public',
          keepalive: true,
          middleware: function(connect, options) {
            return [
              require('connect-livereload')({
                port: config.watch.public.options.livereload
              }),
              connect.static(options.base)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    },
    concurrent: {
      compile: {
        tasks: [
          'jade',
          // 'stylus',
          'coffee',
          'sass',
          'copy'
        ],
        options: {
            logConcurrentOutput: false
        }
      },
      server: {
        tasks: [
          'connect',
          'open',
          'watch:jade',
          // 'watch:stylus',
          'watch:coffee',
          'watch:sass',
          'watch:copy',
          'watch:public'
        ],
        options: {
            logConcurrentOutput: true
        }
      }
    },
    'gh-pages': {
      public: {
        options: {
          base: 'public',
          message: 'Generated by generator-bespoke'
        },
        src: '**/*'
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['clean', 'concurrent:compile']);
  grunt.registerTask('server', ['default', 'concurrent:server']);
  grunt.registerTask('deploy', ['default', 'gh-pages:public']);

};
