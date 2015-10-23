var express = require('express');
var gcm = require('node-gcm');
var crontab = require('node-crontab');
var later = require('later');
var fs = require('fs');
var CronJob = require('cron').CronJob
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        message: 'hooray! welcome to future!'
    });
});



router.post('/upload' , function(req, res, next){

})


router.post('/backtothefuture', function(req, res, next) {

    console.log(req.body.uri);
    console.log('\n');
    console.log(req.body.deviceId.toString());
    console.log('\n');
    console.log(req.body.timeStamp);

    var message = new gcm.Message();
    message.addData('data', 'pinging url from server');
    message.addData('dataKey', req.body.uri);

    var regIds = [];
    regIds.push(req.body.deviceId.toString());
    // Set up the sender with you API key
    var sender = new gcm.Sender('AIzaSyC0QCDf7xGhiki9BSad-FuSeINqjljr1a0');


    
   var date = new Date(parseInt(req.body.timeStamp));

    console.log(date);
    console.log(date.getDay())
    console.log(date.getUTCDate())
    console.log(date.getHours())
    console.log(date.getSeconds())
    var month = parseInt(date.getMonth())+1;
    console.log(month);

    var minutes = parseInt(date.getMinutes())+1;

    console.log(""+date.getSeconds()+" "+date.getMinutes()+" "+date.getHours()+" "+date.getUTCDate()+" "+month+" "+date.getDay()+"");

    var jobId = crontab.scheduleJob(""+date.getSeconds()+" "+date.getMinutes()+" "+date.getHours()+" "+date.getUTCDate()+" "+month+" "+date.getDay()+"", function() { 
        // Now the sender can be used to send messages
        //var jobId = crontab.scheduleJob(""+date.getSeconds()+20 +" "+date.getMinutes() +" "+date.getHours() +" "+date.getUTCDate() +" "+date.getMonth()+" "+date.getDay(), function() { //This will call this function every 2 minutes 
        sender.send(message, {
            registrationIds: regIds
        }, function(err, result) {
            if (err) console.error(err);
            else console.log(result);
        });
        console.log("It's been 1 minute!");
        //crontab.cancelJob(jobId); 
    }); 
    res.status(200).send({
        message: 'Great Scott'
    });
})
module.exports = router;
