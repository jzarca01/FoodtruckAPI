var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var jsdom = require("jsdom");
var http = require("http");
var qs = require('querystring');

var htmlToJson = require("html-to-json");


app.set('port', (process.env.PORT || 5001))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/foodtruck', function (req, res) {

  if(req.query.day)
    var day = req.query.day;
  else
    var day = "today";

  if(req.query.day)
    var time = req.query.time;
  else
    var time = "lunch";
  if(req.query.address)
    var address = req.query.address;
  else
    var address = "Paris-France";


  getFoodtruck(res, day, time, address);

})

function displayResult(result, res)
{
  res.contentType('application/json');
  res.send(JSON.stringify(result));
  //res.write(result[0]);
}

function getFoodtruck(res, day, time, address, callback) {

  var items = new Array();//I feel like I want to save my results in an array
  console.log("day :", day, " time : ", time, " address :", address);
  var uri = 'http://tttruck.com/find/'+day+'/'+time+'/'+address;
  console.log("uri : ", uri);
request({uri: uri}, function(err, response, body){

    //Just a basic error check
    if(err && response.statusCode !== 200){console.log('Request error.');}
    //Send the body param as the HTML code we will parse in jsdom
    //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
    jsdom.env({
      html: body,
      scripts: ['http://code.jquery.com/jquery-1.10.2.min.js'],
      done: function(err, window){
        //Use jQuery just as in a regular HTML page
        var $ = window.jQuery;
        var $body = $('body');
        var $videos = $body.find('li.restaurant');

        $videos.each( function(i, item) {

          items[i] = {
            image:   $(item).attr('data-cover'),
            name:   $(item).attr('data-name'),
            tags:     $(item).attr('data-tags'),
            latitude:  $(item).attr('data-latitude'),
            longitude:  $(item).attr('data-longitude'),
            distance:   $(item).attr('data-distance'),
            open:  $(item).attr('data-open'),
            starttime:  $(item).attr('data-starttime'),
            endtime:   $(item).attr('data-endtime')
          };
        });

          console.log(items);
          displayResult(items, res);
      }
    });
  });

}

exports.getFoodtruck = getFoodtruck;

// spin spin sugar
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
