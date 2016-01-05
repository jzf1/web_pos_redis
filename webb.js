var redis = require('redis');
client = redis.createClient();
var allItems=[
                {
                  "barcode": "ITEM000000",
                  "name": "可口可乐",
                  "unit": "瓶",
                  "price": 3.00
                },
                {
                  "barcode": "ITEM000001",
                  "name": "雪碧",
                  "unit": "瓶",
                  "price": 3.00
                },
                {
                  "barcode": "ITEM000002",
                  "name": "苹果",
                  "unit": "斤",
                  "price": 5.50
                },
                {
                  "barcode": "ITEM000003",
                  "name": "荔枝",
                  "unit": "斤",
                  "price": 15.00
                },
                {
                  "barcode": "ITEM000004",
                  "name": "电池",
                  "unit": "个",
                  "price": 2.00
                },
                {
                  "barcode": "ITEM000005",
                  "name": "方便面",
                  "unit": "袋",
                  "price": 4.50
                }
              ];


var promotions= [
                  {
                    "type": "BUY_TWO_GET_ONE_FREE",
                    "barcodes": [
                      "ITEM000000",
                      "ITEM000001",
                      "ITEM000005"
                    ]
                  }
                ];
//var allItemsstring=JSON.stringify(allItems);
//var promotions=JSON.stringify(promotions);

//client.set("allItems", allItemsstring, redis.print);
//client.set("promotions",promotions,redis.print);
var allItem=[];
client.get('allItems',function (err, reply) {
     allItem=JSON.parse(reply);
//         console.log(allItem);
});
var promotion=[];
client.get('promotions',function (err, reply) {
       promotion=JSON.parse(reply);
  //     console.log(promotion);
       //client.quit();
});




client.on("error", function (err) {
    console.log("Error " + err);
});




var express = require('express');
var app = express()

app.get('/allItems', function (req, res) {

    res.send(allItem);
})
app.get('/promotion', function (req, res) {
    res.send(promotion);

})





var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
//app.use(multer());

//client.set("in","aaa",redis.print);


app.post('/inputs',function(req,res){

    // var inputs=req.body.input;
//  console.log(req.body.input);
   var input = req.body.input;
   // console.log(input);
   client.get('inputs',function (err, inputsInRedis) {

            if (inputsInRedis==null){

               var inputsInRedis=[];
               inputsInRedis.push(input);
               var inputs_string=JSON.stringify(inputsInRedis);

               client.set("inputs", inputs_string, redis.print);

               //console.log(inputsInRedis);

            } else {
               var inputsInRedis=JSON.parse(inputsInRedis);

             // console.log(inputsInRedis);

               inputsInRedis.push(input);
              var inputs_string=JSON.stringify(inputsInRedis);
               client.set("inputs",inputs_string, redis.print);
               //console.log("bbb");
            }


      });


})
 //

app.get('/inputs',function(req,res){
   // console.log(inputs);
    var inputs=[];
    client.get('inputs',function (err, reply) {
    inputs=JSON.parse(reply);
      //console.log(typeof(reply));
     res.send(inputs);
      })


})



app.use(express.static('static-html-site-project'));

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})









