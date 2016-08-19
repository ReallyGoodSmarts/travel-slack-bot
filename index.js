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
        
        trip_start = moment(listing.start);
        trip_end = moment(listing.end).subtract(1, 'days');  // -1 because end is posted at midnight next day
        rightnow = moment();
        
        // Message only at the start and end of the trip.
        // Is right now either the same day as the first day or the last 
        // day of the trip?
        if ( trip_start_day.isSame(rightnow, "day") || trip_end_day.isSame(rightnow, "day") ) {  
          
          // match up to the newline character, and take the first element
          phrase = listing.description.match(/(.+)\n/)[1];
          console.log(phrase);
          
          if (trip_end_day == moment().day() ) {
            phrase = phrase + " (Trip ending today.)";
          }
          
          // Compose the message and other details to send to Slack 
          var payload = {
          	text: phrase,
          	icon_emoji: ":airplane:",
          	username: "Travel Bot",
          	channel: "#fyi"
          };

          // Set up the sending options for the request function.
          // See note about the travelBotKeys.SLACK_WEBHOOK_URL in
          // in README.md.
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
