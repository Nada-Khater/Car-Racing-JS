// Scores Handling Methods

function addNewScore(score) {
  // get the existing scores from the local storage (if any).
  const existingScores =
    JSON.parse(localStorage.getItem("carRacingScores")) || [];
  const currentDate = new Date();

  // Format the date as a string (e.g., "2024-01-30 12:30:45")
  const formattedDate = `${padNumber(currentDate.getMonth() + 1)}-${padNumber(
    currentDate.getDate()
  )} ${padNumber(currentDate.getHours())}:${padNumber(
    currentDate.getMinutes()
  )}`;

  // append the new score.
  existingScores.push({ score: score.innerText, date: formattedDate });

  // save the scores back to the local storage.
  localStorage.setItem("carRacingScores", JSON.stringify(existingScores));
}

// Function to pad a number with leading zeros if it's a single digit
function padNumber(number) {
  return number < 10 ? "0" + number : number;
}

function getScores() {
  // retrieve the scores from the local storage.
  const scores = JSON.parse(localStorage.getItem("carRacingScores")) || [];

  return scores;
}

function clearScores() {
  // clear the carRacingScores object.
  localStorage.removeItem("carRacingScores");

  // clear the CurrentLevelScore object.
  localStorage.removeItem("CurrentLevelScore");
}
//3. high score
function getHighScore() {
  // get the scores from the local storage.
  const scores = getScores();

  // check if there are no scores.
  if (scores.length === 0) return 0;

  // get the max score.
  const maxScore = scores.reduce((max, score) => {
    return Math.max(max, score.score);
  }, 0);

  return maxScore;
}
