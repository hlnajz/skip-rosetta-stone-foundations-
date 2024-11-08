// hlnajz was here

// 15 hours

const getData = require("./getData.js");
const constants = require("./constants.json");
const makeRequest = require("./req.js");

async function main() {
  const originalData = await getData();
  const data = JSON.parse(JSON.stringify(originalData)).data;
  console.log("Data received");
  console.log(originalData);
  const units = data.courseMenu.units.filter((unit) =>
    constants["unitsToComplete"].includes(unit.unitNumber)
  );

  const totalTime = 15 * 60 * 60 * 1000; // change 15 to hours you want

  const totalLessons = units.reduce(
    (total, unit) =>
      total +
      unit.lessons.reduce((sum, category) => sum + category.paths.length, 0),
    0
  );

  const timePerLesson = Math.floor(totalTime / totalLessons);
  let timeSoFar = 0;

  units.forEach((unit) => {
    unit.lessons.forEach((category) => {
      category.paths.forEach(
        ({
          unitIndex,
          curriculumLessonIndex,
          type,
          course,
          numChallenges,
          timeEstimate,
        }) => {
          const timeInMilliseconds = timePerLesson + getRndInteger(0, 6000);

          const percentCorrect = getRndInteger(89, 100);
          const questionsCorrect = Math.ceil(
            numChallenges * (percentCorrect / 100)
          );

          const completed = !!(questionsCorrect == numChallenges) + "";

          const timeCompleted = Date.now() + timeSoFar;

          timeSoFar += timeInMilliseconds;

          makeRequest({
            course,
            lessonIndex: curriculumLessonIndex,
            questionAmount: numChallenges,
            questionsCorrect,
            unitIndex: unitIndex % 4,
            time: timeInMilliseconds,
            type,
            completed,
            timeCompleted,
          });
        }
      );
    });
  });

  console.log("Finished (wait for requests)!!");
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();
