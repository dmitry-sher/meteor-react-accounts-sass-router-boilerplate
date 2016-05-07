export var compat = {
  remMode: false,
  remModes: {
    Width: 1,
    Height: 2,
    1: 'width',
    2: 'height'
  },
};

export var params = {

};

var _first = true;
var _remHtml, _remInt;
var _ratio = 9/16;
export function ensureRem() {
  _remHtml = $('html');
  const setFontSize = function() {
    var correctSize, fontSize, height, padStr, padding, screenHeight, screenWidth, width;
    if (compat.onScreenKeyboard) {
      return;
    }
    screenHeight = _remHtml.height();
    screenWidth = _remHtml.width();
    fontSize = _remHtml.css('font-size').match(/[\d.]+/)[0];
    if (screenWidth / screenHeight > _ratio) {
      compat.remMode = compat.remModes.Height;
      correctSize = screenHeight * 27 / 640;
      padding = (screenWidth - 13.3 * correctSize) / 2;
      if (padding > 0) {
        height = 23.7 * correctSize;
        width = 13.33 * correctSize;
        padStr = '0 ' + padding + 'px 0 ' + padding + 'px';
        $('.main-wrapper').css('padding', padStr).css('background', '#000').css('height', height + 'px');
        $('.flBlock').css('margin-left', padding + 'px');
        $('.leftPad, .rightPad').css('width', padding + 'px').css('height', height + 'px');
        // if (compat.firefoxWin) {
        //   $('.pages .page').css('margin-left', padding + 'px');
        // }
        // if (!_first) {
        //   _first = false;
        //   Meteor.shared.onPagesRendered();
        // }

      }
    } else {
      correctSize = _remHtml.width() / 100 * 7.5;
      compat.remMode = compat.remModes.Width;
    }
    if (fontSize !== correctSize || isNan(fontSize)) {
      return _remHtml.css('font-size', correctSize + 'px');
    }
  };
  setFontSize();
  return _remInt = setInterval(setFontSize, 1000);
};

export function cancelRem() {
  clearInterval(_remInt);
  _remHtml.css('font-size', '12px');
};

export function ensureIE10() {
  if (Function('/*@cc_on return document.documentMode===10@*/')()) {
    $('body').addClass('ie10');
    compat.ie10 = true;
  }
};

export function ensureIE11() {
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    $('body').addClass('ie11');
    compat.ie11 = true;
  }
};

export function ensureAndroid() {
  if (isAndroid()) {
    $('body').addClass('android');
    compat.android = true;
  }
};

export function ensureAndroid42() {
  var getAndroidVersion;
  getAndroidVersion = function(ua) {
    var match;
    ua = (ua || navigator.userAgent).toLowerCase();
    match = ua.match(/android\s([0-9\.]*)/);
    if (match) {
      return match[1];
    } else {
      return false;
    }
  };
  if (parseFloat(getAndroidVersion()) <= 4.3) {
    compat.android42 = true;
    $('body').addClass('android42');
  }
};

export function ensureIphone() {
  var match, ua;
  ua = (ua || navigator.userAgent).toLowerCase();
  match = ua.match(/iphone/) || ua.match(/ipad/);
  if (match) {
    compat.iphone = true;
    $('body').addClass('iphone');
  }
};

export function ensureFirefox() {
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    compat.firefox = true;
    $('body').addClass('firefox');
    if (navigator.userAgent.toLowerCase().indexOf('windows') > -1) {
      compat.firefoxWin = true;
      $('body').addClass('firefox-win');
    }
  }
};

export function isAndroid() {
  if (!navigator) {
    return false;
  }
  if (!navigator.userAgent) {
    return false;
  }
  if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
    return true;
  }
  if (navigator.userAgent.toLowerCase().indexOf("mozilla/5.0 (x11") > -1) {
    return true;
  }
  if (navigator.userAgent.toLowerCase().indexOf("mozilla/5.0 (linux") > -1) {
    return true;
  }
  return false;
};

export function getUserMeteorData() {
  var user, loggingIn;
  user = Meteor.user();
  loggingIn = Meteor.loggingIn();
  return {user, loggingIn};
}