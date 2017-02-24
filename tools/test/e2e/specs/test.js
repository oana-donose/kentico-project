// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /webpack.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#top', 5000)
      .assert.elementPresent('.sg-logo')
      .assert.containsText('h1', 'STYLE GUIDE BOILERPLATE')
      // .assert.elementCount('img', 1)
      .end()
  }
}
