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
  document.getElementById("clear-message").innerText =
    "Scores Cleared Successfully !";
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

function showHighScore() {
  // get the high score.
  const highScore = getHighScore();

  // display the high score.
  document.getElementById("highest-score-container").innerText = highScore;
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("score-history")
    .addEventListener("click", function () {
      updateContent("Score History", "table");
    });

  document
    .getElementById("highest-score")
    .addEventListener("click", function () {
      updateContent("Highest Score", "highest");
    });

  document
    .getElementById("clear-history")
    .addEventListener("click", function () {
      updateContent("Clear History", "clear");
    });

  document.getElementById("back").addEventListener("click", function () {
    location.href = "index.html";
  });
});
function updateContent(title, content) {
  document.getElementById("content-title").innerText = title;

  // Hide all content sections
  document.getElementById("menu-content").style.display = "none";
  document.getElementById("score-table").style.display = "none";
  document.getElementById("highest-score-container").style.display = "none";
  document.getElementById("clear-message").style.display = "none";

  // Show the selected content section
  if (content === "table") {
    document.getElementById("menu-content").style.display = "flex";
    document.getElementById("score-table").style.display = "table";
    showScoresInsideTable();
  } else if (content === "highest") {
    document.getElementById("menu-content").style.display = "flex";
    document.getElementById("highest-score-container").style.display = "block";
    showHighScore();
  } else if (content === "clear") {
    document.getElementById("menu-content").style.display = "flex";
    document.getElementById("clear-message").style.display = "block";
    clearScoreMessage();
  }
}
