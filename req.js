// Don't mess with this
const data = require("./constants.json");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.5",
  "Content-Type": "text/xml",
  "X-RosettaStone-App-Version": "ZoomCourse/11.11.2",
  "X-RosettaStone-Protocol-Version": "8",
  "X-RosettaStone-Session-Token": data["sessionToken"],
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-site",
};

async function makeRequest({
  course,
  unitIndex,
  lessonIndex,
  type,
  questionAmount,
  time,
  questionsCorrect,
  completed,
  timeCompleted,
}) {
  console.log("Request Params:", {
    course,
    unitIndex,
    lessonIndex,
    type,
    questionAmount,
    time,
    questionsCorrect,
    completed,
  });

  const body = `
<path_score>
  <course>${course}</course>
  <unit_index>${unitIndex}</unit_index>
  <lesson_index>${lessonIndex}</lesson_index>
  <path_type>${type}</path_type>
  <occurrence>1</occurrence>
  <complete>${completed}</complete>
  <score_correct>${questionsCorrect}</score_correct>
  <score_incorrect>${questionAmount - questionsCorrect}</score_incorrect>
  <score_skipped type="fmcp">0</score_skipped>
  <number_of_challenges>${questionAmount}</number_of_challenges>
  <delta_time>${time}</delta_time>
  <version>185054</version>
  <updated_at>${timeCompleted}</updated_at>
  <is_lagged_review_path>false</is_lagged_review_path>
</path_score>`.trim();

  const url = `https://tracking.rosettastone.com/ee/ce/${data["schoolName"]}/users/${data["userId"]}/path_scores?course=${course}&unit_index=${unitIndex}&lesson_index=${lessonIndex}&path_type=${type}&occurrence=1&_method=put`;

  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers,
      referrer: "https://totale.rosettastone.com/",
      body,
      mode: "cors",
    });

    console.log(`Status: ${res.status} (${res.statusText})`);
    if (res.ok) {
      console.log("Request was successful!");
    } else {
      console.warn("Request failed.");
    }
  } catch (error) {
    console.error("Error making request:", error);
  } finally {
    console.log(`Request completed at: ${new Date().toLocaleString()}`);
  }
}

module.exports = makeRequest;
