"use strict";

class Dot
{
    constructor(xPos, yPos) 
    {
        this.set(xPos, yPos);
    }

    set(xPos_, yPos_)
    {
        this.xPos = xPos_;
        this.yPos = yPos_;
    }
    
    printOut()
    {
        console.log("Dot(", this.xPos, ",", this.yPos, ")");
    }
};

class Section
{
    constructor(fDot, sDot) 
    {
        this.set(fDot, sDot);
    }

    set(fDot_, sDot_)
    {
        this.fDot = fDot_;
        this.sDot = sDot_;
    }

    printOut()
    {
        console.log("Section{ ( ", this.fDot.xPos, this.fDot.yPos, "); (", this.sDot.xPos, this.sDot.yPos, ")");
    }

    getLength()
    {
        let xInc = this.fDot.xPos - this.sDot.xPos;
        let yInc = this.fDot.yPos - this.sDot.yPos;
        return Math.sqrt(xInc * xInc + yInc * yInc);
    }
};

function main()
{
    console.log("Init new dot with position 666, 1337: ");
    let showDot = new Dot(666, 1337);
    showDot.printOut();

    console.log("Init new dots for section:");
    let fDot = new Dot(0, 0);
    let sDot = new Dot(10, 10);
    fDot.printOut();
    sDot.printOut();

    console.log("Init section:");
    let showSection = new Section(fDot, sDot);
    showSection.printOut();

    console.log("Section's length is:", showSection.getLength());
}

main();