"use strict";

// http://localhost:5002/cars.html

// импорт библиотек
const express = require("express");
const request = require("request");

// запускаем сервер
const app = express();
const port = 5002;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(express.static(__dirname));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

// принимаем GET запрос и отправляем POST запрос на другой сервер
app.get("/insCar", function(request, response) {
    const carName = request.query.carName;
    const price = request.query.price;
    sendPost("http://localhost:5000/insert/record", JSON.stringify({
        carName: carName,
        price: price
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        response.end(result);
    });
});

app.get("/getCar", function(request, response) {
    const carName = request.query.carName;
    sendPost("http://localhost:5000/select/record", JSON.stringify({
        carName: carName
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        response.end(result);
    });
});

app.get("/insStock", function(request, response) {
    const stockName = request.query.stockName;
    const cars = request.query.cars;
    sendPost("http://localhost:5001/insert/record", JSON.stringify({
        stockName: stockName,
        cars: cars
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        response.end(result);
    });
});

app.get("/getStock", function(request, response) {
    const stockName = request.query.stockName;
    sendPost("http://localhost:5001/select/record", JSON.stringify({
        stockName: stockName
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        response.end(result);
    });
});