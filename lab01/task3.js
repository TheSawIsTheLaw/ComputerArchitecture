"use strict";

class dotsData
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
        return this.dotsList.find(dot => dot.name === name);
    }

    updX(name, newXPos)
    {
        let updDot = this.read(name);
        if (updDot != null)
            updDot.xPos = newXPos;
    }

    updY(name, newYPos)
    {
       let updDot = this.read(name);
       if (updDot != null)
           updDot.yPos = newYPos;
   }

    upd(name, newXPos, newYPos)
    {
        let updDot = this.read(name);
        if (updDot != null)
       {
           updDot.xPos = newXPos;
           updDot.yPos = newYPos;
       }
    }

    del(delName)
    {
        this.dotsList = this.dotsList.filter(dot => dot.name != delName);
    }

    getDistance(fDotName, sDotName)
    {
        let fDot = this.dotsList.read(fDotName);
        let sDot = this.dotsList.read(sDotName); 
        if (fDot === null || sDot === null)
            return;
        
        let xInc = fDot.xPos - sDot.xPos;
        let yInc = fDot.yPos - sDot.yPos;

        return Math.sqrt(xInc * xInc + yInc * yInc);
    }

    getMostDistantDots()
    {
        if (this.dotsList.length < 2)
            return;
        let maxDistDots = [this.dotsList[0], this.dotsList[1]];
        let maxDist = this.getDistance(this.dotsList[0].name, this.dotsList[1].name);
        for (fDot of this.dotsList)
            for (sDot of this.dotsList)
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

    getDotsOnDistanceFromDot(mainDotName, distance)
    {
        return this.dotsList.filter(dot => this.getDistance(mainDotName, dot) && this.getDistance(mainDotName, dot) <= distance)
    }

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
            if (position.toLowerCase === "lower")
                filterfunc = dot => dot.yPos < 0;
            else
                filterfunc = dot => dot.yPos > 0;
        }

        return this.dotsList.filter(filterfunc);
    }

    getDotsInSquare(maxX, maxY, minX, minY)
    {
        return this.dotsList.filter(dot => dot.xPos <= maxX && dot.yPos <= maxY && dot.xPos >= minX && dot.yPos >= minY);
    }
};
 