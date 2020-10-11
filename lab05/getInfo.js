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
function getInfo() {
    const mail = document.getElementById("mail").value;
    const url = `/getInfo?mail=${mail}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.result;
        document.getElementById("result-label").innerHTML = result;
    });
};