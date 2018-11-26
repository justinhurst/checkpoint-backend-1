let express = require("express");
let bodyParser = require('body-parser');
let mongoose = require("mongoose");
var csv = require("csvtojson");
const fetch = require('node-fetch');


const app = express();

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//this is not the correct database at the moment
mongoose.connect("mongodb://admin:password1@ds031948.mlab.com:31948/checkpoint-one");

// Convert a csv file with csvtojson
let csvData = undefined;
csv().fromFile("data.csv").then(function(jsonArrayObj){ 
    csvData = jsonArrayObj[0];
    console.log(csvData);
})

app.get("/newComments",(req,res,next) => {
    return res.json(csvData.new_comments);
});
app.get("/newTasks",(req,res,next) => {
    return res.json(csvData.new_tasks);
});
app.get("/newOrders",(req,res,next) => {
    return res.json(csvData.new_orders);
});
app.get("/tickets",(req,res,next) => {
    return res.json(csvData.tickets);
});


let TaskRoutes  = require("./routes/TaskRoutes");
app.use(TaskRoutes);
let OrderRoutes  = require("./routes/OrderRoutes");
app.use(OrderRoutes);
let MessageRoutes  = require("./routes/MessageRoutes");
app.use(MessageRoutes);

app.get("/dateTime",(req,res,next) => {
    //return res.json(products);
    var d = new Date();
    return res.json(d);
});
app.get("/foxes",(req,res,next) => {
    let foxIM = undefined;
    fetch('https://randomfox.ca/floof/')
        .then(res => res.json())
        .then(json => {
            return res.json(json.image);
        });
    
});



//listen on 3001
app.listen(3001, (err) => {
    if (err) {
        return console.log("Error", err);
    }
    console.log("Web server is now running in port 3001");
});