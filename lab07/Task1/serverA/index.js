"use strict";

const fileName = "cars.JSON";

// импорт библиотеки
const express = require("express");

const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
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
app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const carName = obj.carName;
        const price = obj.price;
        
        if (!fs.existsSync(name))
        {
            response.end(JSON.stringify({
                result: "Fail! Data file is not inited." 
            }));
            return;
        }

        let gotJSON = fs.readFileSync(fileName, "utf-8");
        gotJSON = JSON.parse(gotJSON);
        
        try {
            gotJSON.push({carName: carName, price: price});
        } catch (error) {
            let temp = [];
            temp.push(gotJSON);
            temp.push({carName: carName, price: price});
            gotJSON = temp;
        }
        gotJSON = JSON.stringify(gotJSON);
        fs.writeFileSync(fileName, gotJSON);
        response.end(JSON.stringify({
            result: "Success! Record was added." 
        }));
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const carName = obj.carName;

        if (!fs.existsSync(name))
        {
            response.end(JSON.stringify({
                result: "Fail! Data file is not inited." 
            }));
            return;
        }

        let gotJSON = fs.readFileSync(fileName, "utf-8");
        gotJSON = JSON.parse(gotJSON);
        
        let carPrice = -1;
        
        for (let i = 0; i < gotJSON.length() && price < 0; i += 2)
            if (gotJSON[i].carName === carName)
                carPrice = gotJSON[i].price;

        
        response.end(JSON.stringify({
                result: "Found your car! It's " + carName + ' ' + price + '$' 
            }));
    });
});