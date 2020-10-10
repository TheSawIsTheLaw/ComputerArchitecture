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

app.get("/comparison", function(request, response)
{
    let fNum = request.query.fNum;
    let sNum = request.query.sNum;
    let tNum = request.query.tNum;

    let fInt = parseInt(fNum);
    let sInt = parseInt(sNum);
    let tInt = parseInt(tNum);

    let answer = Math.max(fInt, sInt, tInt);
    let answJSON = JSON.stringify({result: answer});
    response.end(answJSON);
});