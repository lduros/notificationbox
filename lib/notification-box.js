/* 
 * Copyrights Loic J. Duros 2012
 * lduros@member.fsf.org
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const { Cc, Ci } = require("chrome");
const { getMostRecentBrowserWindow } = require('api-utils/window/utils');
const { Symbiont } = require('sdk/content/content');

exports.NotificationBox = function (options) {
  options = options || {};
  let mainWindow = getWindow();
  let nb = mainWindow.gBrowser.getNotificationBox();
  let notification, priority, label, icon, value, buttons = [];

  if (options.value) {
    notification = nb.getNotificationWithValue(options.value);
    value = options.value;
  }
  else {
    notification = nb.getNotificationWithValue('');
    value = '';
  }

  if (options.label)
    label = options.label;
  else
    label = "You must specify a label message";

  if (options.priority)
    priority = nb[PRIORITY[options.priority]];
  else
    priority = nb[PRIORITY.INFO_LOW];

  if (options.icon)
    icon = options.icon;
  else 
    icon = 'chrome://browser/skin/Info.png';

  if (options.buttons) {
    for (let i = 0, length = options.buttons.length; i < length; i++) {
      buttons.push(NotificationButton(options.buttons[i]));
    }
  }
    

  nb.appendNotification(label, value,
                        icon,
                        priority, buttons);
  return notification;
};

var NotificationButton = function (options) {

  options = options || {};
  let accessKey, callback, label, popup;

  if (options.accessKey)
    accessKey = options.accessKey;
  else
    accessKey = '';

  if (options.callback)
    callback = options.callback;
  else
    callback = function () {};

  if (options.label)
    label = options.label;
  else
    label = "";

  popup = null;
  
  return {label: label, 
          accessKey: accessKey,
          callback: callback,
          popup: popup};
  

};

const PRIORITY = {
    'INFO_LOW': 'PRIORITY_INFO_LOW',
    'INFO_MEDIUM': 'PRIORITY_INFO_MEDIUM',
    'INFO_HIGH': 'PRIORITY_INFO_HIGH',
    'WARNING_LOW': 'PRIORITY_WARNING_LOW',
    'WARNING_MEDIUM': 'PRIORITY_WARNING_MEDIUM',
    'WARNING_HIGH': 'PRIORITY_WARNING_HIGH',
    'CRITICAL_LOW': 'PRIORITY_CRITICAL_LOW',
    'CRITICAL_MEDIUM': 'PRIORITY_CRITICAL_MEDIUM',
    'CRITICAL_HIGH': 'PRIORITY_CRITICAL_HIGH',
    'CRITICAL_BLOCK': 'PRIORITY_CRITICAL_BLOCK'
};

let getWindow = function () {
  return getMostRecentBrowserWindow();
};

exports.PRIORITY = PRIORITY;

