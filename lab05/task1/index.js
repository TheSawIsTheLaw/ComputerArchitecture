"use strict";
"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
app.use(express.static(__dirname));

// http://localhost:5000/page.html

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// получение суммы чисел
app.get("/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const s = parseInt(a) + parseInt(b);
    response.end(JSON.stringify({
        result: s
    }));
});

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// it is post
app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const mail = obj["mail"];
        const name = obj["name"];
        const telephone = obj["telephone"];
        let result = loadInfoToFile(mail, name, telephone);
        response.end(JSON.stringify({
            result: result
        }));
    });
});

let name = "data.txt";
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