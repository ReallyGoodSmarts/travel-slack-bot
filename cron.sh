#!/bin/bash

# Tell cron to use my local .profile information
source /home/ubuntu/.profile

# change directories into the bot
cd /home/ubuntu/bothouse/travel-slack-bot

# run the bot using node
node index.js

#### Also ...

# edit crontab with 
#    crontab -e
# and add this line ...
#    0 9 * * * /home/ubuntu/bothouse/travel-slack-bot/cron.sh > /home/ubuntu/bothouse/travel-slack-bot/cron.log