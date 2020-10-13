"use strict";

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.use(express.static(__dirname));

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

function findInts(A, B, C)
{
    let startNum = 0;
    if (A % C !== 0)
        startNum = A + (C - A % C);
    else
        startNum = A;
    
    let retNums = [];
    for (let cur = startNum; cur <= B; cur += C)
        retNums.push(cur);
    
    return retNums;
}

// Тест: http://localhost:5015/intsIn?A=1&B=20&C=4
// Тест: http://localhost:5015/intsIn?A=1&B=20&C=0
// Тест: http://localhost:5015/intsIn?A=20&B=1&C=9
app.get("/intsIn", function(request, response)
{
    let A = request.query.A;
    let B = request.query.B;
    let C = request.query.C;

    let AInt = parseInt(A);
    let BInt = parseInt(B);
    if (AInt > BInt)
    {
        let rec = AInt;
        AInt = BInt;
        BInt = rec;
    }
    let CInt = parseInt(C);
    if (CInt === 0)
    {
        response.end("C had to be a non-zero value");
        return;
    }

    let answer = findInts(AInt, BInt, CInt);
    let answJSON = JSON.stringify(answer);
    response.end(answJSON);
});