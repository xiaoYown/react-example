/*===========================
Device/OS Detection
===========================*/
;(function () {
	"use strict";
	var device = {}; 
	var ua = navigator.userAgent;

	var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

	device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

	// Android
	if (android) {
		device.os = 'android';
		device.osVersion = android[2];
		device.android = true;
		device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
	}
	if (ipad || iphone || ipod) {
		device.os = 'ios';
		device.ios = true;
	}
	// iOS
	if (iphone && !ipod) {
		device.osVersion = iphone[2].replace(/_/g, '.');
		device.iphone = true;
	}
	if (ipad) {
		device.osVersion = ipad[2].replace(/_/g, '.');
		device.ipad = true;
	}
	if (ipod) {
		device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
		device.iphone = true;
	}
	// iOS 8+ changed UA
	if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
		if (device.osVersion.split('.')[0] === '10') {
			device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
		}
	}

	// Webview
	device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

	// Minimal UI
	if (device.os && device.os === 'ios') {
		var osVersionArr = device.osVersion.split('.');
		var elViewport = document.querySelector('meta[name="viewport"]')
		device.minimalUi = !device.webView &&
			(ipod || iphone) &&
			(osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
			elViewport && elViewport.getAttribute('content') &&
			elViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
	}

	// Check for status bar and fullscreen app mode
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	device.statusBar = false;
	if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
		device.statusBar = true;
	} else {
		device.statusBar = false;
	}
	device.isWeixin = /MicroMessenger/i.test(ua);
	
	window.rem = {}
	window.rem.device = device;
})();
