const path              = require('path');
const glob              = require("glob");
const webfontsGenerator = require('webfonts-generator');

webfontsGenerator({
  files      : glob.sync(path.resolve(__dirname, '../../source/icons/sitename/*.svg')),
  fontName   : 'sitename-icons',
  cssFontsUrl: '/assets/fonts',
  dest       : path.resolve(__dirname, '../../CMS/assets/fonts'),
  cssDest    : path.resolve(__dirname, '../../source/scss/sitename/fonts/', 'icons.scss'),
  cssTemplate: 'tools/webfonts/template.hbs'
}, function (error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
});
