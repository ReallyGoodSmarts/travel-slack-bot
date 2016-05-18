var ical = require('ical');
var moment = require('moment');
var request = require('request');
var travelBotKeys = require ('../api_keys/travel_bot_keys.js');

ical.fromURL(travelBotKeys.ICAL_URL, {}, function(err, data){
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      var listing = data[k];
      
      // does the listing have "is in" in the descrition,
      // which TripIt does for trip entries
      if (listing.description.match(/.+is in/) ){
        
        // Is right now between the start and end times of the listing?
        // Note that moment() == now
        if ( moment().isBetween(listing.start, listing.end) ) {  
          
          // match up to the newline character, and take the first element
          phrase = listing.description.match(/(.+)\n/)[1];
          console.log(phrase);
          
          // Compose the message and other details to send to Slack 
          var payload = {
          	text: phrase,
          	icon_emoji: ":airplane:",
          	username: "Travel Bot",
          	channel: "#fyi"
          };

          // Set up the sending options for the request function.
          // See note about the SLACK_WEBHOOK_URL above.
          var options = {
          	url: travelBotKeys.SLACK_WEBHOOK_URL,
          	method: 'POST',
          	body: payload,
          	json: true
          };
          
          slackIt(options);
    
        }
      }
    }
  }
});

// Send the webhook

function slackIt(options) {
  request(options, function (error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(error);
    }
  });
}
