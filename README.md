# Linking TripIt & Slack For Basic Info

This little program watches someone's TripIt account and posts a note into Slack whenever they're on the road.

## How it works

The program looks for "trips" in your TripIt web calendar feed, which are separate from the hotel and plane reservations. It uses the dates and the location from those trips. You can edit those details inside TripIt. If today is during a trip, it posts that information into a Slack channel.

## Things the program needs 

### Your TripIt iCal URL

Get it from your account settings, here:

[image]

### A Slack Incoming Webhook URL

Get it from Browse Apps > Custom Integrations > Incoming WebHooks > Configurations.

[image]

### A couple of node.js modules

This uses `ical` `request` and `moment` npm libraries.

```
npm install ical request moment 
```

## Usage

I set this up to be run by a cron job once a day.


