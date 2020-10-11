"use strict"; 

let gamesArr = [{name: "Dota", descr: "Gladly IceFrog", age: 16},
                {name: "Dota2", descr: "Shitty place", age: 16},
                {name: "Furry Tales", descr: "UWU", age: 8},
                {name: "Zabiv", descr: "Hmm, smth wrong", age: 21},
                {name: "SuperSsunek", descr: "Sonic goes brrrrrrr", age: 0}
]


// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// выдача страницы с информацией о кафедре
// http://localhost:5000/page/games?age=16
app.get("/page/games", function(request, response) {
    let out = [];
    for (let game of gamesArr)
        if (game.age <= request.query.age)
            out.push(game);
    const infoObject = {
        games: out
    };
    response.render("gamesPage.hbs", infoObject);
});