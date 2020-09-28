"use strict";

class DotsData
{
    constructor()
    {
        this.dotsList = [];
    }

    printOut()
    {
        console.log(this.dotsList);
    }

    add(name, xPos, yPos)
    {
        let newRecord = {name, xPos, yPos};
        if ((this.dotsList.find(dot => dot.name === newRecord.name)) === undefined)
            this.dotsList.push(newRecord);
    }

    read(name)
    {
        return this.dotsList.find(dot => dot.name === name) || null;
    }

    updX(name, newXPos)
    {
        let updDot = this.read(name);
        if (updDot !== null)
            updDot.xPos = newXPos;
    }

    updY(name, newYPos)
    {
       let updDot = this.read(name);
       if (updDot !== null)
           updDot.yPos = newYPos;
   }

    upd(name, newXPos, newYPos)
    {
        let updDot = this.read(name);
        if (updDot !== null)
       {
           updDot.xPos = newXPos;
           updDot.yPos = newYPos;
       }
    }

    del(delName)
    {
        this.dotsList = this.dotsList.filter(dot => dot.name !== delName);
    }

    getDistance(fDotName, sDotName)
    {
        let fDot = this.read(fDotName);
        let sDot = this.read(sDotName); 
        if (fDot === null || sDot === null)
            return;
        
        let xInc = fDot.xPos - sDot.xPos;
        let yInc = fDot.yPos - sDot.yPos;

        return Math.sqrt(xInc * xInc + yInc * yInc);
    }

    // Получение двух точек, между которыми наибольшее расстояние
    getMostDistantDots()
    {
        if (this.dotsList.length < 2)
            return;
        let maxDistDots = [this.dotsList[0], this.dotsList[1]];
        let maxDist = this.getDistance(this.dotsList[0].name, this.dotsList[1].name);
        for (let fDot of this.dotsList)
            for (let sDot of this.dotsList)
            {
                let dist = this.getDistance(fDot.name, sDot.name);
                if (dist > maxDist)
                {
                    maxDistDots[0] = fDot;
                    maxDistDots[1] = sDot;
                    maxDist = dist;
                }
            }
        return maxDistDots;
    }

    // Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу
    getDotsOnDistanceFromDot(mainDotName, distance)
    {
        return this.dotsList.filter(dot => this.getDistance(mainDotName, dot.name) && this.getDistance(mainDotName, dot.name) <= distance)
    }

    // Получение точек, находящихся выше / ниже / правее / левее заданной оси координат
    getDotsInCoordinateQuarter(axis, position)
    {
        let filterfunc;
        if (axis.toLowerCase() === "x")
        {
            if (position.toLowerCase() === "lower")
                filterfunc = dot => dot.xPos < 0;
            else
                filterfunc = dot => dot.xPos > 0;
        }
        else
        {
            if (position.toLowerCase() === "lower")
                filterfunc = dot => dot.yPos < 0;
            else             
                filterfunc = dot => dot.yPos > 0;
                
        }

        return this.dotsList.filter(filterfunc);
    }

    // Получение точек, входящих внутрь заданной прямоугольной зоны
    getDotsInSquare(maxX, maxY, minX, minY)
    {
        return this.dotsList.filter(dot => dot.xPos <= maxX && dot.yPos <= maxY && dot.xPos >= minX && dot.yPos >= minY);
    }
};

function main()
{
    let dots = new DotsData();

    dots.add("a", 10, 20);
    dots.add("b", -10, 20);
    dots.add("c", 10, -20);
    dots.add("d", -10, -23);
    dots.add("so far", 200, 300);
    dots.add("uwu", 666, -888);

    console.log("Current dots:");
    dots.printOut();

    // read test
    console.log("Read dot d:", dots.read("d"));

    // delete test
    console.log("Delete dot uwu:");
    console.log("Before:");
    dots.printOut();
    dots.del("uwu");
    console.log("\nAfter:");
    dots.printOut();

    // upd tests
    console.log("Upd of xPos of so far dot:");
    dots.updX("so far", -11111111);
    dots.printOut();
    console.log("Upd of yPos of so far dot:");
    dots.updY("so far", -2222);
    dots.printOut();
    console.log("Back total upd for so far dot:");
    dots.upd("so far", 200, 300);
    dots.printOut();

    // Distant dots test
    console.log("The most distant dots are:", dots.getMostDistantDots());

    // Two points on neccessary constant
    console.log("All dots distanted on 40 from d dot: ", dots.getDotsOnDistanceFromDot("d", 40));
    console.log("All dots distanted on 100 from d dot: ", dots.getDotsOnDistanceFromDot("d", 100));

    // Dot lower/heigher...
    console.log("All dots lower x:", dots.getDotsInCoordinateQuarter("x", "lower"));
    console.log("All dots heigher x:", dots.getDotsInCoordinateQuarter("x", "heigher"));
    console.log("All dots lower y:", dots.getDotsInCoordinateQuarter("y", "lower"));
    console.log("All dots heigher y:", dots.getDotsInCoordinateQuarter("y", "heigher"));
    
    // Dots in square
    console.log("All dots in square 0, 0, 500, 400", dots.getDotsInSquare(500, 400, 0, 0));
    console.log("All dots in square 100, 100, -100, -100", dots.getDotsInSquare(100, 100, -100, -100)); 
}

main(); 