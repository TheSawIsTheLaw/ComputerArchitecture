"use strict";

let firstTime = 2000;
let secondTime = 1000;
let endOfCycles = 2;

let counter = 0;

function sTimer()
{
    counter++;
    console.log(counter);
    if (counter < 20)
        setTimeout(sTimer, secondTime);
    else
    {
        endOfCycles--;
        main();
    }
}

function fTimer()
{
    counter++;
    console.log(counter);
    if (counter < 11)
        setTimeout(fTimer, firstTime);
    else
        setTimeout(sTimer, secondTime);
}

function main()
{
    counter = 0;
    if (endOfCycles > 0)
        fTimer();
}

main();