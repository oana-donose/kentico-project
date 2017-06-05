/* eslint-env mocha */
// assert is the Node.js testing library: https://nodejs.org/api/all.html#assert_assert
var assert = require('assert')

// import the function we want to test
import {delayedMap} from './example.mocha.tests.js'

// define a test suite
describe('Array', function () {
  // which you can nest if you want to
  describe('#indexOf()', function () {
    // create a single test
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
      [1, 2, 3].indexOf(5).should.equal(-1);
      [1, 2, 3].indexOf(0).should.equal(-1)
    })

    // and another test - this time, asyncronous
    // define asyncronous by expecting a callback function (done)
    it('eventually returns the results', function (done) {
      var input = [1, 2, 3]
      var transform = function (x) { return x * 2 }

      delayedMap(input, transform, function (result) {
        assert.deepEqual(result, [2, 4, 6])
        // call done() when your async code has ended
        done()
      })
    })
  })
})
