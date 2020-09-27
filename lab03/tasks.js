"use strict";

function task1()
{
    let numOfStrings = readlineSync.questionInt("Number of strings: ");

    let validStrings = [];
    for (let i = 0; i < numOfStrings; i++)
    {
        let str = readlineSync.question("String: ");
        if (str.length % 2 === 0)
            validStrings.push(str);
    }

    let jsonValidStrings = JSON.stringify(validStrings);
    fs.writeFileSync("task1out.json", jsonValidStrings);
}

function task2()
{
    let fileName = readlineSync.question("Insert file name: ");

    if (!fs.existsSync(fileName))
    {
        console.log("File doesn't exist. Going to next task...");
        return;
    }

    let readContents = fs.readFileSync(fileName, "utf-8");
    let strings = JSON.parse(readContents);

    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j',
                      'k', 'l', 'm', 'n', 'p', 'q', 'r',
                      's', 't', 'v', 'w', 'x', 'y', 'z'];
    let outString = [];
    console.log("Strings made of vowels:");
    for (let str of strings)
    {
        let stringValidityFlag = true;
        for (let i = 0; i < consonants.length && stringValidityFlag; i++)
            if (str.toLowerCase().includes(consonants[i]))
                stringValidityFlag = false;
        if (stringValidityFlag)
            console.log(str);
    }
    console.log("...And that's all.");
}

function readFileToLog(name)
{
    if (!fs.existsSync(name))
    {
        console.log("Hmmm... File doesn't exist.");
        return;
    }

    console.log("Reading file", name);

    let outString = fs.readFileSync(name, "utf-8");
    console.log(outString);
}

function task3()
{
    let extension = readlineSync.question("Insert extension in format '.txt'(.extension): ");
    let wayToFile = readlineSync.question("Insert way to file: ");

    let gotFileNames = fs.readdirSync(wayToFile);
    
    for (let name of gotFileNames)
    {
        if (name.endsWith(extension))
            readFileToLog(name);
    }
}

function main()
{
    console.log("Task 1:");
    task1();

    console.log("\n\nTask 2:");
    task2();

    console.log("\n\nTask 3:");
    task3();
}

const readlineSync = require('readline-sync');
const fs = require("fs");

main();