"use strict";

const fileName = "stocks.JSON";

// импорт библиотеки
const express = require("express");

const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5001;
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
        const stockName = obj.stockName;
        const cars = obj.cars;
        
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
            gotJSON.push({stockName: stockName, cars: cars});
        } catch (error) {
            let temp = [];
            if (gotJSON)
                temp.push(gotJSON);
            temp.push({stockName: stockName, cars: cars});
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
        const carName = obj.stockName;

        if (!fs.existsSync(name))
        {
            response.end(JSON.stringify({
                result: "Fail! Data file is not inited." 
            }));
            return;
        }

        let gotJSON = fs.readFileSync(fileName, "utf-8");
        gotJSON = JSON.parse(gotJSON);
        
        let cars = [];
        
        for (let i = 0; i < gotJSON.length() && price < 0; i += 2)
            if (gotJSON[i].stockName === stockName)
                cars = gotJSON[i].cars;

        
        response.end(JSON.stringify({
                result: cars 
            }));
    });
});