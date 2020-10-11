"use strict";

const maxNum = process.argv[2]; // В 0 и 1 путь до файла.

// Проверка на отрицательность? Логать андефайнд и потом proccess.exit()?

let fact = 1;
for (let i = 1; i <= maxNum; i++)
    fact *= i;

console.log(fact);