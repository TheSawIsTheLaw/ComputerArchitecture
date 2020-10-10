"use strict";

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

const fs = require("fs");

app.get("/", function(request, response) 
{
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("badGetaway.html", "utf8");
        response.end(contentString);
    }
});

app.get("/BlackTongue", function(request, response)
{
    let strNum = request.query.strNum;

    let strNumInt = parseInt(strNum);
    strNumInt--;

    if (strNumInt < 0) 
    {
        response.end("Index is negative. But must be a positive. What?..")
        return;
    }
    let arr = JSON.parse(fs.readFileSync("BlackTongue.json")); // Дело в том, что при 10 мы показываем свойста массива. Надо убирать...
    if (arr.length <= strNumInt)
    {
        response.end("We are out of index. Max is " + arr.length - 1);
        return;
    }        
    response.end(JSON.stringify(arr[strNumInt]));
});