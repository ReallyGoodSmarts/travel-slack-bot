# Linking TripIt & Slack

This little program watches your TripIt account and posts a note into Slack at the beginning and end of your trip.

![Example Post](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/images/ExamplePost.png)

## How it Works

The program looks for "trips" in your TripIt web calendar feed, which are separate from the hotel and plane reservations. It uses the dates and the location from those trips. You can edit those trip details inside TripIt.

I run it once a day with a [cron job](https://github.com/ReallyGoodSmarts/travel-slack-bot#make-it-go). If a trip is in progress when it runs, the script posts the trip's location and the start/end dates into the specified channel (I'm using the #fyi channel, but you can change it in `index.js`).

## Things it Needs

### Your TripIt Calendar URL

Get it from your account settings, here:

![screen shot 2](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/images/ScreenShot38.png)

### A Slack Incoming Webhook URL

Get it from Browse Apps > Custom Integrations > Incoming WebHooks > Configurations.

![screen shot 1](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/images/ScreenShot17.png)

I store the TripIt and Slack URLs outside my Git tree so I don't accidentally make them public. They're in a file called `travel_bot_keys.js` which is loaded with "require" near the top of `index.js`. There's an example file [here](/examples/travel_bot_keys.js).

### Three node.js modules

This program uses `ical` `request` and `moment` npm libraries. Install them from the package.json file using [npm](https://www.npmjs.com/).

```
npm install
```

## Make it Go

I set this up to be run by a cron job once a day. So I edited my server's crontab with:

```
crontab -e
```

... and added this line to run it every morning at 9 a.m.:

```
0 9 * * * /home/ubuntu/bothouse/travel-slack-bot/cron.sh > /home/ubuntu/bothouse/travel-slack-bot/cron.log
```

I keep my bots in /home/ubuntu/bothouse/ ... You'll need to change the path to wherever you keep these files AND also change the path in the [`cron.js`](https://github.com/ReallyGoodSmarts/travel-slack-bot/blob/master/cron.sh) file.

To actually make it work, you very likely need to give permissions for cron to run `cron.sh`. Do that like this:

```
chmod u+x cron.sh
```



