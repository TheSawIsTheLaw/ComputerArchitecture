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

function searchTxtFiles(way)
{
    let files = fs.readdirSync(way);
    for (let fileName of files)
    {
        if (fileName.endsWith(".txt") && fs.readFileSync(way + fileName).length <= 10)
            console.log(way + fileName);
        else if (fs.lstatSync(way + fileName).isDirectory())
            searchTxtFiles(way + fileName + '/');
    }
}

function task4()
{
    let wayToFile = readlineSync.question("Insert way to file: ");
    if (!wayToFile.endsWith("/"))
        wayToFile += "/"
    
    searchTxtFiles(wayToFile);
}

function task5()
{
    let numOfNames = readlineSync.questionInt("Number of names (text files): ");

    let names = [];
    for (let i = 0; i < numOfNames; i++)
        names.push(readlineSync.question("Name: "));

    let outStringFromFiles = "";
    for (let name of names)
    {
        if (fs.existsSync(name))
            outStringFromFiles += fs.readFileSync(name, "utf-8");
    }
    fs.writeFileSync("outTask5.txt", outStringFromFiles);
}

function task6()
{
    let obj = 666;
    let counter = 0;
    try
    {
        while (true)
        {
            counter++;
            obj = {obj};
            JSON.stringify(obj);
        }
    }
    catch(err)
    {
        console.log("Error: ", err);
        console.log("Ladies and gentlemen we got him! ", counter);
    }
}

let maxDepth = 0;
let maxWay = "";
let maxValue;

function recursiveMaxBranchFinder(obj, curDepth, curWay)
{   
    if (typeof(obj) !== "object")
    {
        if (curDepth > maxDepth)
        {
            maxDepth = curDepth;
            maxWay = curWay;
            maxValue = obj;
        }
            
    }
    else
    {
        curDepth++;
        for (let i in obj)
            recursiveMaxBranchFinder(obj[i], curDepth, curWay + "->" + i);
    }
}

function task7()
{
    let fileName = readlineSync.question("Insert file name: ");

    if (!fs.existsSync(fileName))
    {
        console.log("File doesn't exist. :(");
        return;
    }

    if (!fileName.endsWith(".json"))
    {
        console.log("File is not a .json file :(");
        return;
    }

    let gotObject = JSON.parse(fs.readFileSync(fileName));
    recursiveMaxBranchFinder(gotObject, 0, "root");
    console.log("Max Depth:", maxDepth, "\nWay:", maxWay, "\nValue:", maxValue);
}

function main()
{
    console.log("Task 1:");
    task1();

    console.log("\n\nTask 2:");
    task2();

    console.log("\n\nTask 3:");
    task3();

    console.log("\n\nTask 4:");
    task4();

    console.log("\n\nTask 5:");
    task5();

    console.log("\n\nTask 6:");
    task6();

    console.log("\n\nTask 7:");
    task7();
}

const readlineSync = require('readline-sync');
const fs = require("fs");

main();