const { json } = require("express");
const express = require("express");
const https = require("https");     //Native Node https Module Tp Perform a get request
const app = express();


app.get("/" , function(req,res){

   const url = "https://api.openweathermap.org/data/2.5/weather?&appid=2fd7f8813620b5e1839ebe6705007416&units=metric&q=yamunanagar"; 

       https.get(url , function(response){
       console.log(response.statusCode);

       response.on("data" , function(data){
        //    console.log(data);              // we'll get some hexadecimal code
           const weatherData = JSON.parse(data);  // this will turn the data into actual javascript object
        //    console.log(weatherData);

           const temp = weatherData.main.temp; // will get the temp which in inside main 
        //    console.log(temp);
        res.write("<h1>Temperature is: " + temp + " degrees celcius " + " </h1> ");  //we can't use multiple send(),but we can use multiple res.write in combination with res.send().

           const description = weatherData.weather[0].description;
        //    console.log(description);
        res.write("<p>Description is: " + description + "</p>");

        //  Adding Icon Image
        const icon = weatherData.weather[0].icon;
        const imageURL =  "http://openweathermap.org/img/wn/"+ icon + "@2x.png" ; //break the url with const "icon" 
        res.write("<img src = " + imageURL +">");
        // console.log(icon);
         res.send();
       });    

   });                                                              

//    res.send("Server is up and running.");
});




app.listen(3000 , function(){
console.log("Server is running at port 3000.");
});