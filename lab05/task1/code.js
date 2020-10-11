"use strict";    
        function ajaxPost(urlString, bodyString, callback) {
            let r = new XMLHttpRequest();
            r.open("POST", urlString, true);
            r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            r.send(bodyString);
            r.onload = function() {
                callback(r.response);
            }
        }
    
        function makeAction() {
            const f1 = document.getElementById("mail");
            const f2 = document.getElementById("name");
            const f3 = document.getElementById("telephone");

            let mail = f1.value;
            let name = f2.value;
            let telephone = f3.value;
    
            ajaxPost("/save/info", JSON.stringify(
                {
                mail, name, telephone
                }),
                function(answerString) 
            {
                const answerObject = JSON.parse(answerString);
                const result = answerObject.result;
                alert(result);
                document.getElementById("result-label").innerHTML = result;
            });
        }