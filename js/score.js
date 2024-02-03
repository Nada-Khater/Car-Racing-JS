
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



  // ========================================

// 1. Handling the Scores Button
function showScoresInsideTable() {
    // get the scores from the local storage.
    const scores = getScores();
    console.log(scores);
    // get the table body.
    const tableBody = document.getElementById("score-table");
  
    // clear the table body.
    tableBody.innerHTML = "";
  
    // fill the table body with the scores.
    scores.forEach((score, index) => {
      const tableRow = document.createElement("tr");
      const tableDataIndex = document.createElement("td");
      const tableDataScore = document.createElement("td");
      const tableDataDate = document.createElement("td");
  
      tableDataIndex.innerText = index + 1;
      tableDataScore.innerText = score.score;
      tableDataDate.innerText = score.date;
  
      tableRow.appendChild(tableDataIndex);
      tableRow.appendChild(tableDataDate);
  
      tableRow.appendChild(tableDataScore);
  
      tableBody.appendChild(tableRow);
    });
  }
  
  // 2. Handling the Clear Scores Button
  function clearScoresInsideTable() {
    clearScores();
    document.getElementById("clear-message").innerText = "Scores Cleared Successfully !";
  }
  function clearScoreMessage() {
    //confirm the user's intention to clear the scores.
    document.getElementById("clear-message").innerHTML = `
     <p>Are you sure ?</p>
      <button id="confirm-clear" onclick="clearScoresInsideTable()">Yes</button>
     `;
  
    const tableBody = document.getElementById("score-table");
    // clear the table body.
    tableBody.innerHTML = "";
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
  
  function showHighScore() {
    // get the high score.
    const highScore = getHighScore();
  
    // display the high score.
    document.getElementById("highest-score-container").innerText = highScore;
  }