const { authorization, languageCode } = require("./constants.json");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.5",
  "Content-Type": "application/json",
  Authorization: authorization,
  "X-Request-ID": "66a4813c-8077-4509-9875-6c10608b9933",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-site",
};

async function getData() {
  try {
    const body = JSON.stringify({
      operationName: "GetCourseMenu",
      variables: {
        languageCode,
        filter: "ALL",
        chunking: false,
        includeMilestoneInLessonFour: true,
      },
      query: `
        query GetCourseMenu($languageCode: String!, $filter: String!, $includeMilestoneInLessonFour: Boolean!, $chunking: Boolean!) {
          courseMenu(
            languageCode: $languageCode
            includeMilestoneInLessonFour: $includeMilestoneInLessonFour
            chunking: $chunking
            filter: $filter
          ) {
            currentCourseId
            bookmarkToUseOnload {
              course
              bookmarkToUseOnload
              __typename
            }
            speechEnabledBookmark {
              course
              unitIndex
              lessonIndex
              pathType
              __typename
            }
            speechDisabledBookmark {
              course
              unitIndex
              lessonIndex
              pathType
              __typename
            }
            curriculumDefaults {
              course
              curriculumId
              resource
              __typename
            }
            viperDefinedCurricula {
              id
              course
              firstExerciseId
              exerciseCount
              nameByLocale {
                curriculumId
                locale
                curriculumNameLocalized
                __typename
              }
              descriptionByLocale {
                curriculumId
                locale
                curriculumDescriptionLocalized
                __typename
              }
              __typename
            }
            showCurriculumChooser {
              course
              showCurriculumChooser
              __typename
            }
            numberOfUnits
            units {
              id
              index
              unitNumber
              titleKey
              color
              colorDesaturated
              lessons {
                id
                index
                titleKey
                lessonNumber
                paths {
                  unitIndex
                  lessonIndex
                  curriculumLessonIndex
                  sectionIndex
                  index
                  type
                  id
                  course
                  resource
                  scoreThreshold
                  timeEstimate
                  numChallenges
                  numberOfChallengesSeen
                  complete
                  scoreCorrect
                  scoreIncorrect
                  scoreSkipped
                  percentCorrectForDisplay
                  percentIncorrect
                  percentSkipped
                  percentComplete
                  pathCourseMenuDisplayState
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          tutoringSummary {
            status
            canSchedule
            userTimezone
            nextSession {
              startTimeStamp
              lessonNumber
              unitNumber
              coachName
              __typename
            }
            __typename
          }
        }
      `,
    });

    const response = await fetch("https://graph.rosettastone.com/graphql", {
      method: "POST",
      credentials: "include",
      headers,
      body,
      referrer: "https://totale.rosettastone.com/",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw to allow handling by the caller
  }
}

module.exports = getData;
