"use strict";

// импортируем библиотеку
const execSync = require('child_process').execSync;

// функция для вызова программы и получения результата её работы
function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

let factArr = process.argv.slice(2, process.argc);
let factCommand = "";
let curFact = 1;
for (let num of factArr)
{
    factCommand = 'node fact.js ' + num;
    curFact = useCmd(factCommand);
    console.log(curFact);
}