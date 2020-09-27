"use strict";

class StudentsData
{
    constructor()
    {
        this.studentsList = [];
    }

    printOut()
    {
        console.log(this.studentsList);
    }

    add(group, studCardNum, progMarks)
    {
        let newRecord = {group, studCardNum, progMarks};
        if ((this.studentsList.find(student => student.studCardNum === newRecord.studCardNum)) === undefined)
            this.studentsList.push(newRecord);
    }

    read(studCardNum)
    {
        return this.studentsList.find(student => student.studCardNum === studCardNum);
    }

    updGroup(studCardNum, group)
    {
        let updateStudent = this.read(studCardNum);
        if (updateStudent != null)
            updateStudent.group = group;
    }

    updProgMarks(studCardNum, marks)
    {
        let updateStudent = this.read(studCardNum);
        if (updateStudent != null)
            updateStudent.progMarks = marks;
    }

    upd(studCardNum, group, marks)
    {
        let updateStudent = this.read(studCardNum);
        if (updateStudent != null)
        {
            updateStudent.group = group;
            updateStudent.progMarks = marks;
        }
    }

    del(delStudCardNum)
    {
        this.studentsList = this.studentsList.filter(curStudent => curStudent.studCardNum != delStudCardNum);
    }

    getAverageProgMarks(studCardNum)
    {
        if (this.studentsList.length === 0)
            return;
        let student = this.read(studCardNum);
        if (student === undefined || student.progMarks.length === 0)
            return;
        let summary = 0;
        for (let i = 0; i < student.progMarks.length; i++)
            summary += student.progMarks[i];

        return summary / student.progMarks.length;
    }

    getStudentsByGroup(group)
    {
        return this.studentsList.filter(student => student.group === group);
    }

    getMarkedStudentByGroup(group)
    {
        let students = this.getStudentsByGroup(group);
        if (students.length === 0)
            return;

        let retStud = students[0];
        for (let i = 1; i < students.length; i++)
            if (students[i].progMarks.length > retStud.progMarks.length)
                retStud = students[i];

        return retStud;
    }

    getStudentsWithNoMarks()
    {
        return this.studentsList.filter(student => student.progMarks.length === 0);
    }
};

function main()
{
    let students = new StudentsData();

    students.add("G1", 111, [2, 2, 2]);
    students.add("G1", 112, [2, 5, 3, 5]);
    students.add("G1", 113, [2]);
    students.add("G1", 114, []);

    students.add("G2", 121, [5, 5, 5]);
    students.add("G2", 122, [4, 5, 4, 5 ,5]);
    students.add("G2", 123, [5, 4]);

    students.add("...", 666, []);

    console.log("Starts with data:");
    students.printOut();

    // read test
    console.log("\nReading 113:", students.read(113));

    // delete test
    console.log("\nDeleting 666:");
    students.del(666);
    students.printOut();

    // upd tests
    console.log("\nUpd for 113 with new marks:");
    console.log("Before:", students.read(113));
    students.updProgMarks(113, [3, 3]);
    console.log("\nAfter:", students.read(113));

    console.log("\nUpd for 113 with new group:");
    console.log("Before:", students.read(113));
    students.updGroup(113, "WOHOOOO");
    console.log("\nAfter:", students.read(113));

    console.log("\nBack to start for 113:");
    console.log("Before:", students.read(113));
    students.upd(113, "G1", [2]);
    console.log("After:", students.read(113));

    // average marks tests
    console.log("\nAverage in marks for 122", students.read(122), "AVERAGE: ", students.getAverageProgMarks(122));
    console.log("\nAverage in marks for 111", students.read(111), "AVERAGE: ", students.getAverageProgMarks(111));

    // students in group tests
    console.log("\nStudents of goups: ", students.getStudentsByGroup("G1"), students.getStudentsByGroup("G2"));

    // Mostly marked tests
    console.log("\nMost marked student of group G1:", students.getMarkedStudentByGroup("G1"));
    console.log("\nMost marked student of group G2:", students.getMarkedStudentByGroup("G2"));

    // No marks tests
    console.log("\nStudents with no marks:", students.getStudentsWithNoMarks());
}

main();