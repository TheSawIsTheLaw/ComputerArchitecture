"use strict";
"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

let name = "data.txt";

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
app.use(express.static(__dirname));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function getInfo(mail)
{
    if (!fs.existsSync(name))
        return "Have no any data.";

    let readContents = fs.readFileSync(name, "utf-8");
    readContents = readContents.split(/\n| /);
    let index = readContents.indexOf(mail);
    let out = "";
    if (index >= 0)
        out += readContents[index] + ' ' + readContents[index + 1] + ' ' + readContents[index + 2];
    else
        out = "No user found";
    return out;
}

// http://localhost:5000/getUser.html
app.get("/getInfo", function(request, response) 
{
    const mail = request.query.mail;

    let out = getInfo(mail);
    response.end(JSON.stringify({
        result: out
    }));
});

// body
function loadBody(request, callback) 
{
    let body = [];
    request.on('data', (chunk) => 
    {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function loadInfoToFile(mail, lastName, telNum)
{   
    if (!fs.existsSync(name))
        fs.writeFileSync(name, "");
    let readContents = fs.readFileSync(name, "utf-8");
    if (readContents.indexOf(mail) >= 0)
        return "Fail: mail already exists";
    if (readContents.indexOf(telNum) >= 0)
        return "Fail: telephone number already exists";

    readContents += '\n';
    readContents += mail + ' ';
    readContents += lastName + ' ';
    readContents += telNum;
    fs.writeFileSync(name, readContents);
    return "Successfully added";
}

// http://localhost:5000/registration.html
// it is post
app.post("/save/info", function(request, response) 
{
    loadBody(request, function(body) 
    {
        const obj = JSON.parse(body);
        const mail = obj["mail"];
        const name = obj["name"];
        const telephone = obj["telephone"];
        let result = loadInfoToFile(mail, name, telephone);
        response.end(JSON.stringify(
        {
            result: result
        }));
    });
});