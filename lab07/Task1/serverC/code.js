"use strict"; 

function ajaxGet(urlString, callback) {
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
};

// click event

function addCar() {
    const carName = document.getElementById("carNameIns").value;
    const price = document.getElementById("priceIns").value;
    const url = `/insCar?carName=${carName}&&price=${price}`;
    ajaxGet(url, function(stringAnswer) {
        alert(stringAnswer);
    });
};

function getCar() {
    const carName = document.getElementById("carNameGet").value;
    const url = `/getCar?carName=${carName}`;
    ajaxGet(url, function(stringAnswer) {
        alert(stringAnswer);
    });
};

function addStock() {
    const stockName = document.getElementById("stockNameIns").value;
    const cars = JSON.stringify(document.getElementById("carsIns").value.split(' '));
    const url = `/insStock?stockName=${stockName}&&cars=${cars}`;
    ajaxGet(url, function(stringAnswer) {
        alert(stringAnswer);
    });
};

function getStock() {
    const stockName = document.getElementById("stockNameGet").value;
    const url = `/getStock?stockName=${stockName}`;
    ajaxGet(url, function(stringAnswer) {
        alert(stringAnswer);
    });
};