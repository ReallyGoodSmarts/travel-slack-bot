# Linking TripIt & Slack

This little program watches someone's TripIt account and posts a note into Slack whenever they're on the road.

## How it works

The program looks for "trips" in your TripIt web calendar feed, which are separate from the hotel and plane reservations. It uses the dates and the location from those trips. You can edit those details inside TripIt. If today is during a trip, it posts that information into a Slack channel.

## Things the program needs 

### Your TripIt iCal URL

Get it from your account settings, here:

![screen shot 2](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/images/ScreenShot38.png)

### A Slack Incoming Webhook URL

Get it from Browse Apps > Custom Integrations > Incoming WebHooks > Configurations.

![screen shot 1](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/images/ScreenShot17.png)

### A couple of node.js modules

This uses `ical` `request` and `moment` npm libraries.

```
npm install ical request moment 
```

## Usage

I set this up to be run by a cron job once a day. So I edited my server's crontab with:

```
crontab -e
```

... and added this line to run it every morning at 9 a.m.:

```
0 9 * * * /home/ubuntu/bothouse/travel-slack-bot/cron.sh > /home/ubuntu/bothouse/travel-slack-bot/cron.log
```

(You'll need to change the path to wherever you keep these files AND also change the path in the [`cron.js`](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/cron.sh) file.)

