"use strict";

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// приём запроса
app.post("/query/calculate", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const x = obj.x;
        const y = obj.y;
        const s = parseInt(x) + parseInt(y);
        response.end(JSON.stringify({
            answer: s
        }));
    });
});