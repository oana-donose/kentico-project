const path              = require('path');
const webfontsGenerator = require('webfonts-generator');

webfontsGenerator({
  files       : [
    path.resolve(__dirname, '../../source/icons/sitename/dinnerplate.svg'),
    path.resolve(__dirname, '../../source/icons/sitename/microwave.svg'),
  ],
  fontName    : 'sitename-icons',
  cssFontsUrl: '/fonts',
  dest        : path.resolve(__dirname, '../../source/fonts'),
  cssDest     : path.resolve(__dirname, '../../source/scss/sitename/fonts/', 'icons.scss'),
  cssTemplate : webfontsGenerator.templates.scss,
}, function (error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
});
