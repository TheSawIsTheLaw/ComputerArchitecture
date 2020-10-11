 "use strict";

 let users = [
     {login: "Hitler", password: "1945", hobby: "Suicide", age: 56},
     {login: "Stalin", password: "1941", hobby: "Repression", age: 74},
     {login: "Mussolini", password: "MamaMia,Pepperoni!", hobby: "Pizza", age: 61}
 ];

const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 300 * 1000 // Сколько живёт, в нашем случае 5 минут
}));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// http://localhost:5000/login?login=Stalin&&password=1941
// сохранить cookie
app.get("/login", function(request, response) {
    // получаем параметры запроса
    const login = request.query.login;
    const password = request.query.password;
    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Age not set");
    // выставляем cookie
    let found = false;
    let index = 0;
    for (let i = 0; i < users.length && !found; i++)
        if (users[i].login === login && users[i].password === password)
            found = true;
        
    if (!found)
    {
        response.end("Login failed!");
        return;
    }
    request.session.login = login;
    request.session.password = password;
    // отправляем ответ об успехе операции
    response.end("Authorized!");
});

// http://localhost:5000/auth
// получить cookie
app.get("/auth", function(request, response) {
    // контролируем существование cookie
    console.log(request.session.hobby, request.session.age);
    if(!request.session.login || !request.session.password) return response.end("No cookies of auth!");
    // отправляем ответ с содержимым cookie
    const login = request.session.login;
    const password = request.session.password;
    let hobby = "";
    let age = 0;
    let found = false;
    for (let i = 0; i < users.length && !found; i++)
        if (users[i].login === login && users[i].password === password)
        {
            hobby = users[i].hobby;
            age = users[i].age;
        }

    const infoObject = {
        login: login,
        password: password,
        hobby: hobby,
        age: age
    };
    response.render("showUserInfo.hbs", infoObject);
});

// удалить все cookie
app.get("/delCookies", function(request, response) {
    request.session = null;
    response.end("Cookies are deleted");
});