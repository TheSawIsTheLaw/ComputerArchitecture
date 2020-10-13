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

function formGen(fieldsNames)
{
    let out = "";

    for (let field of fieldsNames)
        out += `<p>${field}</p>
        <input name="${field}" spellcheck="false" autocomplete="off">
        <br>`;
    out += `<input type="submit" value="Тык!">`;
    out += "</form>";

    return out;
}

// Тест: http://localhost:5015/HTMLgenerator?fieldsNames[]=strNum&address=/BlackTongue
function HTMLGenerator(fieldsNames, address)
{
    if (address[0] !== '/')
        address = '/' + address;

    let out = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ресурс отсутствует</title>
        <style>
            body {
                font-family: Geneva, Arial, Helvetica, sans-serif;
                padding: 35px;
                background: whitesmoke;
            }
    
            h1 {
                color: rebeccapurple;
            }
        </style>
    </head>
    <body>`;

    out += `<form method="GET" action="${address}">`;
    out += formGen(fieldsNames);

    out += "</body></html>";
    return out
}

app.get("/HTMLgenerator", function(request, response)
{
    let fieldsNames = request.query.fieldsNames;
    let address = request.query.address;

    let generated = HTMLGenerator(fieldsNames, address);
    console.log(generated);
    response.end(generated);
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
    let arr = JSON.parse(fs.readFileSync("BlackTongue.json"));
    if (strNumInt >= arr.length - 1)
    {
        response.end("We are out of index. Max is " + (arr.length - 1).toString());
        return;
    }        
    response.end(JSON.stringify(arr[strNumInt]));
});