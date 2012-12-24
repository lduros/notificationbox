var self = require("self");
var notification = require("notification-box").NotificationBox({
  'value': 'important-message',
  'label': 'Just so that you know...',
  'priority': 'INFO_LOW',
  'image': self.data.url("gnu-icon.png"),
  'buttons': [{'label': "Gotcha",
              'onClick': function () { console.log("You clicked the important button!"); }}]
});
