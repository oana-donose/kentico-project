import * as constants from '../constants';

export default class WindowHelper {

  static isMobile () {
    return document.body.clientWidth <= constants.MOBILE_WIDTH;
  }

  static isTablet () {
    return (document.body.clientWidth > constants.MOBILE_WIDTH && document.body.clientWidth <= constants.TABLET_WIDTH);
  }

  static isDesktop () {
    return document.body.clientWidth > constants.TABLET_WIDTH;
  }

}
