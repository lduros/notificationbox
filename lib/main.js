var self = require("self");
try {
var notification = require("notification-box").NotificationBox({
  'value': 'blocked-request',
  'label': 'A request has been blocked',
  'priority': 'CRITICAL_BLOCK',
  'icon': self.data.url("gnu-icon.png"),
  'buttons': [{'label': "My great button!",
              'callback': function () { console.log("Clicked the button!"); }}]
});
} catch (e) {
  console.log(e, e.lineNumber);
}