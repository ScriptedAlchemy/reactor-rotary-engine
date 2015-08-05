'use strict';

var triggers = [];

function getCurrentZoom() {
  return document.documentElement.clientWidth / window.innerWidth;
}

function callTriggers(event) {
  triggers.forEach(function(trigger) {
    trigger(event, document);
  });
}

if ('ongestureend' in window && 'ontouchend' in window) {
  var lastZoom = getCurrentZoom();
  var gestureEndTime;
  var delayFire = 1000;
  var currentTimer;

  document.addEventListener('gestureend', function() {
    gestureEndTime = +new Date();

    // Could we use a generic throttling or debouncing function?
    setTimeout(function() {
      var zoom = getCurrentZoom();

      if (zoom === lastZoom) {
        return;
      }

      lastZoom = zoom;

      if (currentTimer) {
        clearTimeout(currentTimer);
      }

      currentTimer = setTimeout(function() {
        currentTimer = null;

        zoom = getCurrentZoom();

        if (lastZoom === zoom) {
          callTriggers({
            type: 'zoomchange',
            method: 'pinch',
            zoom: zoom.toFixed(2),
            target: document
          });
        }
      }, delayFire);
    }, 50);
  });

  document.addEventListener('touchend', function() {
    if (gestureEndTime && (+new Date() - gestureEndTime) < 50) {
      return;
    }

    // Could we use a generic throttling or debouncing function?
    setTimeout(function() {
      var zoom = getCurrentZoom();

      if (zoom === lastZoom) {
        return;
      }

      lastZoom = zoom;

      if (currentTimer) {
        clearTimeout(currentTimer);
      }

      currentTimer = setTimeout(function() {
        currentTimer = null;
        zoom = getCurrentZoom();
        if (lastZoom === zoom) {
          callTriggers({
            type: 'zoomchange',
            method: 'double tap',
            zoom: zoom.toFixed(2),
            target: document
          });
        }
      }, delayFire);
    }, 250);
  });
}

/**
 * The zoomchange event. This event occurs when the zoom level has changed on an iOS device.
 * This is unsupported on Android.
 * @param {Object} config
 * @param {ruleTrigger} trigger The trigger callback.
 */
module.exports = function(config, trigger) {
  triggers.push(trigger);
};