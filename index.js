// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};
console.log('----------------------------trying out the try...catch statement-------------------------------')
try {
    console.log(`Assignment for '${CourseInfo.name}'`);
    console.log(`These are the assignments: ${AssignmentGroup.assignments[0].name}, ${AssignmentGroup.assignments[1].name}, ${AssignmentGroup.assignments[2].name}!!!!`)
    const result = mightgiveanerrorhopefully();
    console.log(result);
} catch (error) {
    console.log("This is most definnitly an error:", error)
}
console.log('----------------------------End of the try catch statement-------------------------------');

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];
//trying to find out if it was valid
/* function validAS(CourseInfo, AssignmentGroup) {
    let CourseInfo = CourseInfo.id
    let AssignmentGroup = AssignmentGroup.course_id
    return CourseInfo === AssignmentGroup;
}; */
let getLearnerData = (course, ag, submission) => {
    const result = [];


    const courseID = course.id;
    //The strict inequality !==
    if (courseID !== ag.course_id) {
        throw new Error(
            `Invalid course ID.`
        );
    }

    const learnerMap = new Map();
    for (let i = 0; i < submission.length; i++) {
        let learnerID = submission[i].learner_id;
        //console.log(learnerID)
        let assignmentID = submission[i].assignment_id;
        //console.log(assignmentID)
        let submissionVar = submission[i].submission;
        //console.log(submissionVar)
        let submittedDate = submission[i].submission.submitted_at;
        //console.log(submittedDate)
        let learnerScore = submission[i].submission.score;
        //console.log(learnerScore)
        // !: This is the negation operator.
        if (!learnerMap.has(learnerID)) {
            // Definition: The has() method checks if the 
            // specified key (in this case, learnerID) exists in the Map. 
            // It returns true if the key exists, and false otherwise
            learnerMap.set(learnerID, [[assignmentID, submissionVar]]);
            // Definition: the Map.set() method always returns the Map object itself, which is truthy. 
            // Therefore, the condition in your if statement will always be false
        } else {
            // If does exist in Map
            learnerMap.get(learnerID).push([assignmentID, submissionVar]);
        }
    }

    learnerMap.forEach((value, key) => {
        let student = {};
        student["id"] = key;
        student["avg"] = 0;
        let total_score = 0;
        let total_possible_score = 0;

        for (let i = 0; i < value.length; i++) {
            //console.log(value[i]);
            const submittedAtDate = new Date(value[i][1].submitted_at);
            console.log(submittedAtDate)


            const dueAtDate = new Date(ag.assignments[value[i][0] - 1].due_at);
            //The Date() constructor creates Date objects. When called as a function, it returns a string representing the current time.
            //console.log(dueAtDate)

            const currentDate = new Date();


            if (dueAtDate < currentDate) {
                let learnerAssignId = value[i][0];
                let assignmentId = ag.assignments[value[i][0] - 1].id;
                let pointsPossible =
                    ag.assignments[value[i][0] - 1].points_possible;
                let submissionScore = value[i][1].score;

                student[`${value[i][0]}`] = submissionScore / pointsPossible;

                if (learnerAssignId === assignmentId) {
                    if (submittedAtDate > dueAtDate) {
                        student[`${value[i][0]}`] = Number(
                            ((submissionScore / pointsPossible) * 0.9).toFixed(2)
                        );
                        total_score += submissionScore * 0.9;
                        total_possible_score += pointsPossible;
                    } else {
                        total_score += submissionScore;
                        total_possible_score += pointsPossible;
                    }
                    continue;
                }
            }

        }

        student["avg"] = total_score / total_possible_score;
        result.push(student);
    });

    return result;
};
// here, we would process this data to achieve the desired result.
/*     const result = [             /////this is just an example output
        {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
        },
        {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
        }
    ];
 
    return result;
} */



const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
