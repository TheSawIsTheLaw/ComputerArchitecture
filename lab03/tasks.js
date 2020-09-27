"use strict";

function task1()
{
    let numOfStrings = readlineSync.questionInt("Number of strings: ");

    let validStrings = [];
    for (let i = 0; i < numOfStrings; i++)
    {
        let str = readlineSync.question("String:");
        if (str.length % 2 === 0)
            validStrings.push(str);
    }

    let jsonValidStrings = JSON.stringify(validStrings);
    fs.writeFileSync("task1out.txt", jsonValidStrings);
}

function main()
{
    task1();
}

const readlineSync = require('readline-sync');
const fs = require("fs");

main();