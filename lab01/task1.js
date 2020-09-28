"use strict";

class KidsData
{
    constructor()
    {
        this.kidsList = [];
    }

    printOut()
    {
        console.log(this.kidsList);
    }

    add(lastName, age)
    {
        let newRecord = {lastName, age};
        if ((this.kidsList.find(kid => kid.lastName === newRecord.lastName)) === undefined) // Я не смог придумать иного способа передавать в функцию новую запись...
            this.kidsList.push(newRecord);
    }

    read(lastName)
    {
        return this.kidsList.find(kid => kid.lastName === lastName) || null;
    }

    upd(lastName, age)
    {
        let updateKid = this.read(lastName);
        if (updateKid !== null)
            updateKid.age = age;
    }

    del(delLastName)
    {
        this.kidsList = this.kidsList.filter(curKid => curKid.lastName != delLastName);
    }

    // Получение среднего возраста детей``
    getAverAge()
    {
        if (this.kidsList.length === 0)
            return;
        let summary = 0;
        for (let i = 0; i < this.kidsList.length; i++)
            summary += this.kidsList[i].age;

        return summary / this.kidsList.length;
    }

    // Получение информации о самом старшем ребенке
    getOlderKidInfo()
    {
        if (this.kidsList.length === 0)
            return;
        if (this.kidsList.length === 1)
            return this.kidsList[0].age;
        let olderKid = this.kidsList[0];
        for (let i = 1; i < this.kidsList.length; i++)
            if (this.kidsList[i].age > olderKid.age)
                olderKid = this.kidsList[i];
        return olderKid.age;
    }

    // Получение информации о детях, возраст которых входит в заданный отрезок
    getKidsInfoByAgeSegment(start, end)
    {
        if (this.kidsList.length === 0)
            return;
        return this.kidsList.filter(curKid => start <= curKid.age && curKid.age <= end);
    }

    // Получение информации о детях, фамилия которых начинается с заданной буквы
    getKidsInfoByFirstLetter(letter)
    {
            return this.kidsList.filter(curKid => curKid.lastName[0] === letter);
    }

    // Получение информации о детях, фамилия которых длиннее заданного количества символов
    getKidsInfoWithLongerLastThan(numOfLetters)
    {
        return this.kidsList.filter(curKid => curKid.lastName.length > numOfLetters);
    }

    // Получение информации о детях, фамилия которых начинается с гласной буквы
    getKidsInfoLastnStartsWithVowel()
    {
        let vowelList = ['a', 'e', 'i', 'o', 'u'];
        return this.kidsList.filter(curKid => vowelList.find(vowel => vowel === curKid.lastName.toLowerCase()[0]));
    }
};

function main()
{
    let testKids = new KidsData();
    
    // add tests
    testKids.add("Stalin", 13);
    testKids.add("Lenin", 15);
    testKids.add("Tarasova", 16);
    testKids.add("SCP-1337", 10);
    testKids.add("Somebodyelse", 17);

    // printout test
    console.log("Current kidsData is:")
    testKids.printOut();

    // read test
    console.log("let's read SCP-1337:\n")
    console.log(testKids.read("SCP-1337"));

    // upd tests
    console.log("\nlet's update SCP-1337 and Lenin with new ages:\n");
    console.log("Before:");
    console.log(testKids.read("SCP-1337"), testKids.read("Lenin"));

    testKids.upd("SCP-1337", 5);
    testKids.upd("Lenin", 8);

    console.log("\nAfter:");
    console.log(testKids.read("SCP-1337"), testKids.read("Lenin"));

    // del test
    console.log("\nlet's kill Stalin!");
    console.log("Before:");
    testKids.printOut();
    testKids.del("Stalin");
    console.log("\nAfter:");
    testKids.printOut();

    // average test
    console.log("\naverage age of current KidsList is:", testKids.getAverAge());

    // older kid info test
    console.log("\noldest kiddo is:", testKids.getOlderKidInfo());

    // segmentage tests
    console.log("\nkids of age [6, 17] are:", testKids.getKidsInfoByAgeSegment(6, 17));
    console.log("\nkids of age [5, 15] are:", testKids.getKidsInfoByAgeSegment(5, 15));

    // Lastname first letters tests
    console.log("\nkids lastnames starts with S: ", testKids.getKidsInfoByFirstLetter('S'));
    console.log("\nkids lastnames starts with 5:", testKids.getKidsInfoByFirstLetter('5'));

    // Name length tests
    console.log("\nkids lasnames longer than 5", testKids.getKidsInfoWithLongerLastThan(5));
    console.log("\nkids lasnames longer than 8", testKids.getKidsInfoWithLongerLastThan(8));

    // add kids with vowels
    console.log("\nAdding kids with vowels:");
    testKids.add("Uno", 11);
    testKids.add("Alexaxaxaxaxa", 10);
    testKids.printOut();

    // kids starts with vowels test
    console.log("\nkids with lasnames starts with vowels:", testKids.getKidsInfoLastnStartsWithVowel());
}

main();