"use strict";

class Triangle
{
    constructor(fSide, sSide, tSide) 
    {
        this.set(fSide, sSide, tSide);
    }

    printOut()
    {
        console.log("Triangle: (", this.fSide, ",", this.sSide, ",", this.tSide, ")");
    }

    set(fSide_, sSide_, tSide_)
    {
        this.fSide = fSide_;
        this.sSide = sSide_;
        this.tSide = tSide_;
    }

    get()
    {
        return {fSide: this.fSide, sSide: this.sSide, tSide: this.tSide};
    }

    isPossible()
    {
        let {fSide, sSide, tSide} = this.get();
        return fSide < sSide + tSide && sSide < fSide + tSide && tSide < fSide + sSide && fSide && sSide && tSide;
    }

    getPerimeter()
    {
        if (this.isPossible() === false)
            return;
        let {fSide, sSide, tSide} = this.get();
        return fSide + sSide + tSide;
    }

    getArea()
    {
        if (this.isPossible() === false)
            return;
        let halfPerimiter = this.getPerimeter() / 2;
        let {fSide, sSide, tSide} = this.get();
        return Math.sqrt(halfPerimiter * (halfPerimiter - fSide) * (halfPerimiter - sSide) * (halfPerimiter - tSide));
    }

    checkPythahoras(sqrFSide, sqrSSide, sqrTSide)
    {
        return Math.abs(sqrFSide - sqrSSide - sqrTSide) < 0.0001;
    }

    isRightTriangle()
    {
        if (this.isPossible() === false)
            return;
        let {fSide, sSide, tSide} = this.get();
        fSide *= fSide;
        sSide *= sSide;
        tSide *= tSide;
        return this.checkPythahoras(fSide, sSide, tSide) || this.checkPythahoras(sSide, fSide, tSide) || this.checkPythahoras(tSide, fSide, sSide);
    }
};

function main()
{
    let showTri = new Triangle(10, 10, Math.sqrt(200));

    let impossibleTri = new Triangle(10, 10, 100);
    console.log("Triangle:");
    impossibleTri.printOut();
    console.log("Is this possible? Answer: ", impossibleTri.isPossible());

    console.log("Triangle:");
    showTri.printOut();
    console.log("Is this triangle possible? Answer:", showTri.isPossible());
    console.log("Nice. Let's begin.");

    console.log("Perimeter of this angle is:", showTri.getPerimeter());
    console.log("Area of this triangle is:", showTri.getArea());
    console.log("Is this triangle right? Answer:", showTri.isRightTriangle());
}

main();