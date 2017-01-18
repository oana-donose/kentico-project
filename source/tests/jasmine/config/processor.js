var fs = require('fs');

module.exports = function (grunt) {
	grunt.registerTask('test', 'Creates a suite of spec files to rollup for testing', function () {
		var files = walk('tests/jasmine');
		var tests = [];
		var dest;

		files.forEach(function (curr, index, arr) {
			if (curr.includes('Spec')) {
				dest = curr.split('/');
				dest = dest[dest.length - 1].replace('Spec.js', '') + 'Bundle.js';

				tests.push({
					'src': curr,
					'dest': 'tests/jasmine/bundles/' + dest,
				});
			}
		});

		grunt.config('rollup.tests.files', tests);
		grunt.task.run('rollup:tests');
		grunt.task.run('karma:local');
	});

	var walk = function (dir) {
	    var results = [];
	    var list = fs.readdirSync(dir);

	    list.forEach(function (file) {
	        file = dir + '/' + file;
	        var stat = fs.statSync(file);

	        if (stat && stat.isDirectory()) {
	        	results = results.concat(walk(file));
	        } else {
	        	results.push(file);
	        }
	    });

	    return results;
	};
};