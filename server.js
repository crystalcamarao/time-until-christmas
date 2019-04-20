/* Setting things up. */
var path = require('path'),
    express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

app.all("/" + process.env.BOT_ENDPOINT, function (req, res) {
  
  T.post('statuses/update', { status: countdownMessage() }, function(err, data, response) {
    if (err){
      console.log('error!', err);
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
});

//Set the date to which you want to count down to here!
var countdownMonth=11;
var countdownDay=25;

const moment = require ("moment");

//Get current date and time
const current = new Date();

//Get current timestamp in UTC
const now = current.getTime();

var currentYear = current.getUTCFullYear();
var currentMonth = current.getUTCMonth();
var currentDate = current.getUTCDate();

//For December 26-31, set to NEXT year.
if(currentMonth==countdownMonth)
   {
     if (currentDate > 25)
       currentYear = currentYear + 1;
   }

//Convert countdown date to UTC
const end =  new Date(Date.UTC(currentYear, countdownMonth, countdownDay, 0, 0, 0, 1)).getTime();

const diffTime = end - now;

var diffDuration = moment.duration(diffTime, 'milliseconds');

/* Returns the message to send as our status update */
function countdownMessage() {
  
  var status = '';
  
   if(diffTime > 0) 
{

     status += 'Only';

     if(diffDuration.months() > 1 )
     {
			status += ` ${diffDuration.months()} months`;
     }
     else if (diffDuration.months() == 1 )
     {
			status += ` ${diffDuration.months()} month`;
   	 }
   	
	if(diffDuration.days() > 1 )
     {
			status += ` ${diffDuration.days()} days`;
     }
     else if (diffDuration.days() == 1 )
     {
			status += ` ${diffDuration.days()} day`;
   	 }
    
    if(diffDuration.hours() > 1 )
     {
			status += ` ${diffDuration.hours()} hours`;
     }
     else if (diffDuration.hours() == 1 )
     {
			status += ` ${diffDuration.hours()} hour`;
   	 }
	
	if(diffDuration.minutes() > 1 )
     {
			status += ` ${diffDuration.minutes()} minutes`;
     }
     else if (diffDuration.minutes() == 1 )
     {
			status += ` ${diffDuration.minutes()} minute`;
   	 }
	
//Change the text about Christmas!
	status += ' left until #Christmas' + currentYear + '!';
}
else
{
    //Change the text about Christmas!
    status += 'It\'s finally Christmas! MERRY CHRISTMAS EVERYONE!';
}
  
  return status;
  
};
