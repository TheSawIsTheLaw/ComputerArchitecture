"use strict";

class kidsData
{
    constructor()
    {
        this.kidsList = [];
    }

    add(lastName_, age_)
    {
        let newRecord = {lastName_, age_};
        if (this.kidsList.find(kid => kid.lastName === newRecord.lastName != false)) // Я не смог придумать иного способа передавать в функцию новую запись...
            this.kidsList.push(newRecord);
    }

    read(lastName_)
    {
        return this.kidsList.find(kid => kid.lastName === lastName_);
    }

    upd(lastName_, age_)
    {
        let updateKid = this.read(lastName_);
        if (updateKid != null)
            updateKid.age = age_;
    }

    del(lastName_)
    {
        this.kidsList.filter(curKid => curKid.lastName != lastName_);
    }

    // Получение среднего возраста всех детей
    getAverAge()
    {
        if (this.kidsList.length == 0)
            return;
        let summary = 0;
        for (let i = 0; i < this.kidsList.length; i++)
            summary += this.kidsList[i].age;

        return sum / this.kidsList.length;
    }

    // Получение информации о самом "старом" ребёнке
    getOlderKidInfo()
    {
        if (this.kidsList.length == 0)
            return;
        if (this.kidsList.length == 1)
            return this.kidsList[0].age;
        let olderKid = this.kidsList[0];
        for (let i = 1; i < this.kidsList.length; i++)
            if (this.kidsList[i] > olderKid.age)
                olderKid = this.kidsList[i];
        return olderKid.age;
    }

    // Получение информации  детях, возраст которых входит в заданный отрезок
    getKidsInfoByAgeSegment(start, end)
    {
        if (this.kidsList.length == 0)
            return;
        let acceptList = [];
        for (let i = 0; i < this.kidsList; i++)
            if (this.kidsList[i] > start & this.kidsList[i] < end)
                acceptList.push(this.kidsList[i]);
    }

    // Получение информации о детях, фамилия которых начинается с заданной буквы
    getKidsInfoByFirstLetter(letter)
    {

    }

    // Получение информации о детях, фамилия которых длиннее заданного количества символов
    getKidsInfoWithLongerSurnMoreThan(numOfLetters)
    {
        
    }

    // Получение информации о детях, фамилия которых начинается с главной буквы
    getKidsInfoSurnStartsWithVowel()
    {

    }

}

function main()
{


}

main();