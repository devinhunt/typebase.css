'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.less = {
  compile: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/less.css');
    var expected = grunt.file.read('test/expected/less.css');
    test.equal(expected, actual, 'should compile less, with the ability to handle imported files from alternate include paths');

    actual = grunt.file.read('tmp/concat.css');
    expected = grunt.file.read('test/expected/concat.css');
    test.equal(expected, actual, 'should concat output when passed an array');

    test.done();
  },
  compress: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/compress.css');
    var expected = grunt.file.read('test/expected/compress.css');
    test.equal(expected, actual, 'should compress output when compress option is true');

    test.done();
  },
  nopaths: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/nopaths.css');
    var expected = grunt.file.read('test/expected/nopaths.css');
    test.equal(expected, actual, 'should default paths to the dirname of the less file');

    test.done();
  },
  cleancss: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/cleancss.css');
    var expected = grunt.file.read('test/expected/cleancss.css');
    test.equal(expected, actual, 'should cleancss output when cleancss option is true');

    actual = grunt.file.read('tmp/cleancssReport.css');
    expected = grunt.file.read('test/expected/cleancssReport.css');
    test.equal(expected, actual, 'should cleancss output when cleancss option is true and concating is enable');

    test.done();
  },
  ieCompat: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/ieCompatFalse.css');
    var expected = grunt.file.read('test/expected/ieCompatFalse.css');
    test.equal(expected, actual, 'should generate data-uris no matter the size when ieCompat option is true');

    actual = grunt.file.read('tmp/ieCompatTrue.css');
    expected = grunt.file.read('test/expected/ieCompatTrue.css');
    test.equal(expected, actual, 'should generate data-uris only when under the 32KB mark for Internet Explorer 8');

    test.done();
  },
  variablesAsLess: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/variablesAsLess.css');
    var expected = grunt.file.read('test/expected/variablesAsLess.css');
    test.equal(expected, actual, 'should process css files imported less files');

    test.done();
  },
  sourceMap: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/sourceMap.css');
    test.ok(actual.indexOf('/*# sourceMappingURL=') !== -1, 'compiled file should include a source map.');

    test.done();
  },
  sourceMapFilename: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapFilename.css.map');
    test.equal(sourceMap.sources[0], 'test/fixtures/style3.less', 'should generate a sourceMap with the less file reference.');

    test.done();
  },
  sourceMapURL: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/sourceMapWithCustomURL.css');
    test.ok(actual.indexOf('/*# sourceMappingURL=custom/url/for/sourceMap.css.map') !== -1, 'compiled file should have a custom source map URL.');
    test.done();
  },
  sourceMapBasepath: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapBasepath.css.map');
    test.equal(sourceMap.sources[0], 'style3.less', 'should use the basepath for the less file references in the generated sourceMap.');

    test.done();
  },
  sourceMapRootpath: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapRootpath.css.map');
    test.equal(sourceMap.sources[0], 'http://example.org/test/fixtures/style3.less', 'should use the rootpath for the less file references in the generated sourceMap.');

    test.done();
  },
  sourceMapLessInline: function(test) {
    test.expect(1);

    var expected = grunt.file.read('test/fixtures/style3.less');
    var sourceMap = grunt.file.readJSON('tmp/sourceMapLessInline.css.map');
    test.equal(sourceMap.sourcesContent[0], expected, 'should put the less file into the generated sourceMap instead of referencing them.');

    test.done();
  },
  customFunctions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/customFunctions.css');
    var expected = grunt.file.read('test/expected/customFunctions.css');
    test.equal(expected, actual, 'should execute custom functions');

    test.done();
  }
};
