





const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const apikey = "67d5d6f6eb5d10e1d856e8f706595ace";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+ unit +"";
    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp1 = weatherData.main.temp;
        const temp2 = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

        console.log(temp1);
        console.log(temp2);

        res.write("<h1>The temperature in "+query+" is "+temp1+ " Degree Celcius </h1>");
        res.write("<h3>Weather is currently " +temp2+ "</h3>");
        res.write("<img src="+ imageurl +">");
        res.send();
    })    
});
});





app.listen(3000,function(){
    console.log("Server is running on 3000.");
});