// store the request id of requestAnimationFrame function
let anim_id;

// assign DOM objects to variables
const container = document.getElementById("container"),
  car = document.getElementById("car"),
  car_1 = document.getElementById("car_1"),
  car_2 = document.getElementById("car_2"),
  car_3 = document.getElementById("car_3"),
  line_1 = document.getElementById("line_1"),
  line_2 = document.getElementById("line_2"),
  line_3 = document.getElementById("line_3"),
  line_4 = document.getElementById("line_4"),
  line_5 = document.getElementById("line_5"),
  line_6 = document.getElementById("line_6"),
  restart_div = document.getElementById("restart_div"),
  restart_btn = document.getElementById("restart"),
  score = document.getElementById("score");

  // declare sound audo objects
const start_counter_sound = new Audio("./assets/sounds/start_counter.wav");
const engine_start_sound = new Audio("./assets/sounds/engine_start_try.wav");
const engine_high_sound = new Audio("./assets/sounds/engine_low_try.wav");
const engine_low_sound = new Audio("./assets/sounds/engine_low_try.wav");
engine_low_sound.loop = true;
const car_passed_sound = new Audio("./assets/sounds/pass_try.wav");
const crash_sound = new Audio("./assets/sounds/loose.wav");

//some other declarations
let game_over = false,
  score_counter = 1,
  speed = 5,
  line_speed = 2,
  move_right = false,
  move_left = false,
  move_up = false,
  move_down = false,
  initial_level_score = 100,
  stop_score_increasing = false;

//saving some initial setup
let container_left = parseInt(
  window.getComputedStyle(container).getPropertyValue("left")
),
  container_width = parseInt(
    window.getComputedStyle(container).getPropertyValue("width")
  ),
  container_height = parseInt(
    window.getComputedStyle(container).getPropertyValue("height")
  ),
  car_width = parseInt(window.getComputedStyle(car).getPropertyValue("width")),
  car_height = parseInt(
    window.getComputedStyle(car).getPropertyValue("height")
  ),
  line_width_l = parseInt(
    window.getComputedStyle(line_5).getPropertyValue("width")
  ),
  line_width_r = parseInt(
    window.getComputedStyle(line_6).getPropertyValue("width")
  );

/*****************************Starting The Game*********************************************/

// Function to select the car
function selectCar(carImage) {

  document.getElementById("carSelection").style.display = "none";
  
  document.getElementById("car").innerHTML = `<img src="assets/images/${carImage}" />`;
  
  startCountdown()
}

// 321 go counter
function startCountdown() {
  start_counter_sound.play();
  var countdownElement = document.getElementById("countdown");
  var count = 3;
  countdownElement.innerHTML = count;
  var counter = setInterval(function () {
    count--;
    if (count > 0) {
      countdownElement.innerHTML = count;
    } else {
      countdownElement.innerHTML = "GO!";
      clearInterval(counter);
      setTimeout(function () {
        countdownElement.style.display = "none";
        startGame();
      }, 1000);
    }
  }, 1000);
};

// start the game
function startGame() {
  start_counter_sound.addEventListener('ended', (event) => {
    anim_id = requestAnimationFrame(repeat);
    engine_start_sound.play();
    engine_start_sound.addEventListener('ended', () => {
      engine_high_sound.play();
      engine_high_sound.addEventListener('ended', () => {
        engine_low_sound.play();
      });
    });
  });
}

/********************************************\\ Car Movements for touch screens //********************************************/

// start animation of car motion on touch events start
document.addEventListener('touchstart',function(e){
  if(!game_over)
  {
    if(e.target.id == container.id )
    {
      // touch location on x axis
      let touch_x = e.touches[0].clientX; 
      // car middle line x axis location
      let car_x = parseFloat(getComputedStyle(car).left) + container_left + car_width/2;
      
      // Compare car position and touch location in x direction
      if(touch_x > car_x)
      {
        move_right = requestAnimationFrame(ArrowRight);
      }
      else if (touch_x < car_x)
      {
        move_left = requestAnimationFrame(ArrowLeft);
      }
    }
  }
});

// stop animation of car motion on touch events end
document.addEventListener('touchend',function(e){
    if(!game_over)
    {
      if(move_right)
      {
        cancelAnimationFrame(move_right);
        move_right = false;
      }
      else if (move_left)
      {
        cancelAnimationFrame(move_left);
        move_left = false;
      }
    }
});

/********************************************\\ Car Movements for keyboard //********************************************/

//keyboard EventListener  using arrow and wsda keys
// while you press down the key
document.addEventListener("keydown", function (e) {
  //check if is not  game over so the car can move
  if (!game_over) {
    let key = e.key;
    if ((key === "ArrowLeft" || key === "a") && !move_left) {
      //update car move to left
      move_left = requestAnimationFrame(ArrowLeft);
    } 
    else if ((key === "ArrowRight" || key === "d") && !move_right) {
      //update car move to right
      move_right = requestAnimationFrame(ArrowRight);
    } 
    else if ((key === "ArrowUp" || key === "w") && !move_up) {
      //update car move to up
      move_up = requestAnimationFrame(ArrowUp);
    } 
    else if ((key === "ArrowDown" || key === "s") && !move_down) {
      //update car move to down
      move_down = requestAnimationFrame(ArrowDown);
    }
  }
});

//if you dont press the key , cancel animation
document.addEventListener("keyup", function (e) {
  if (!game_over) {
    let key = e.key;
    if (key === "ArrowLeft" || key === "a") {
      // prevent car to move to left
      cancelAnimationFrame(move_left);
      move_left = false;
    } 
    else if (key === "ArrowRight" || key === "d") {
      // prevent car to move to right
      cancelAnimationFrame(move_right);
      move_right = false;
    }
     else if (key === "ArrowUp" || key === "w") {
      // prevent car to move to up
      cancelAnimationFrame(move_up);
      move_up = false;
    }
     else if (key === "ArrowDown" || key === "s") {
      // prevent car to move to down
      cancelAnimationFrame(move_down);
      move_down = false;
    }
  }
});

// Move the car to the left
function ArrowLeft() {
  // Check if the game is not over and the car is within the left boundary
  if (
    game_over === false &&
    parseInt(window.getComputedStyle(car).getPropertyValue("left")) >
    line_width_l
  ) {
    // Calculate the new left position
    const newLeft =
      parseInt(window.getComputedStyle(car).getPropertyValue("left")) - 5;

    // Set the new left position to the car's style
    car.style.left = newLeft + "px";

    // Request the next animation frame for continuous movement
    move_left = requestAnimationFrame(ArrowLeft);
  }
}

// Move the car to the right
function ArrowRight() {
  // Check if the game is not over and the car is within the right boundary
  if (
    game_over === false &&
    parseInt(window.getComputedStyle(car).getPropertyValue("left")) <
    container_width - car_width - line_width_r
  ) {
    // Calculate the new left position
    const newLeft =
      parseInt(window.getComputedStyle(car).getPropertyValue("left")) + 5;

    // Set the new left position to the car's style
    car.style.left = newLeft + "px";

    // Request the next animation frame for continuous movement
    move_right = requestAnimationFrame(ArrowRight);
  }
}

// Move the car upward
function ArrowUp() {
  // Check if the game is not over and the car is above a certain top threshold
  if (game_over === false && parseInt(window.getComputedStyle(car).getPropertyValue('top')) > 10) {
    // Calculate the new top position
    const newTop = parseInt(window.getComputedStyle(car).getPropertyValue('top')) - 5;

    // Set the new top position to the car's style
    car.style.top = newTop + 'px';

    // Request the next animation frame for continuous movement
    move_up = requestAnimationFrame(ArrowUp);
  }
}

// Move the car downward
function ArrowDown() {
  // Check if the game is not over and the car is below a certain bottom threshold
  if (game_over === false && parseInt(window.getComputedStyle(car).getPropertyValue('top')) < container_height - car_height - 5) {
    // Calculate the new top position
    const newTop = parseInt(window.getComputedStyle(car).getPropertyValue('top')) + 5;

    // Set the new top position to the car's style
    car.style.top = newTop + 'px';

    // Request the next animation frame for continuous movement
    move_down = requestAnimationFrame(ArrowDown);
  }
}

function repeat() {

  // display level score
  if (!stop_score_increasing) {
    let level_score = JSON.parse(localStorage.getItem("CurrentLevelScore")) || initial_level_score;
    document.getElementById("level_score").innerText = level_score;
  }

  // check if the player does'nt lose the game
  if (game_over === false) {
    // check collision between the player car and the three coming cars
    if (
      isCollided(car, car_1) ||
      isCollided(car, car_2) ||
      isCollided(car, car_3)
    ) {
      // pause engine and car passing sound
      car_passed_sound.pause();
      engine_start_sound.pause();
      engine_high_sound.pause();
      engine_low_sound.pause();

      // play the crash sound
      crash_sound.play();

      // cancel animation and view and overlay div
      stopTheGame();
    }
    // increase the score counter with every animation refresh
    score_counter++;
    // increase the shown score with 1 point every 20 animation refres
    if (score_counter % 20 == 0 && !stop_score_increasing) {
      score.innerText = parseInt(score.innerText) + 1;
    }
    // accelerate the movement every 500 animation refresh
    if (score_counter % 500 == 0) {
      speed++;
      line_speed++;
    }


    // ============== end of the game

    let level_score = JSON.parse(localStorage.getItem("CurrentLevelScore")) || initial_level_score;

    if (parseInt(score.innerText) == level_score) {

      // update the upcoming level score.
      localStorage.setItem("CurrentLevelScore", JSON.stringify(level_score * 2));

      // stop increasing the current score.
      stop_score_increasing = true;

      // display the finishing line image.
      end_of_game.style.display = "block";
      setTimeout(function () {
        document.getElementById('end_of_game').classList.add('active');
      }, 1000);

      // pause engine and car passing sound.
      car_passed_sound.pause();
      engine_start_sound.pause();
      engine_high_sound.pause();
      engine_low_sound.pause();

      // hide all cars.
      car_1.style.display = "none";
      car_2.style.display = "none";
      car_3.style.display = "none";

      setTimeout(stopTheGame, 5000);
    }

    if (
      parseInt(window.getComputedStyle(car_1).getPropertyValue("top")) > container_height ||
      parseInt(window.getComputedStyle(car_2).getPropertyValue("top")) > container_height ||
      parseInt(window.getComputedStyle(car_3).getPropertyValue("top")) > container_height
    ) {
      car_passed_sound.play();
    }

    // repaint the elements with every refresh call
    car_down(car_1);
    car_down(car_2);
    car_down(car_3);
    line_down(line_1);
    line_down(line_2);
    line_down(line_3);
    line_down(line_4);

    // recursive call to repaint
    anim_id = requestAnimationFrame(repeat);
  }
}

function car_down(car) {
  let car_current_top = parseInt(
    window.getComputedStyle(car).getPropertyValue("top")
  );
  // check if the car is off the canvas
  if (car_current_top > container_height) {
    // relocate the car to the top of the container and shifted up 200px out of canvas
    car_current_top = -200;
    // asign new left property to the car so that it gets a new position with every tine it gets in the canvas
    let car_left = parseInt(
      Math.random() * (container_width - car_width - line_width_l)
    );
    car.style.left = `${car_left}px`;
  }
  car.style.top = `${car_current_top + speed}px`;
}

function line_down(line) {
  let line_current_top = parseInt(
    window.getComputedStyle(line).getPropertyValue("top")
  );
  if (line_current_top > container_height) {
    line_current_top = -200;
  }
  line.style.top = `${line_current_top + line_speed}px`;
}

// =======================================
// 1. Check the collision between two cars
// 2. Criteria for stopping the game
// 3. Handling the Restart Button
// 4. Scores Handling Methods
// =======================================

// 1. Check the collision between two cars

function isCollided(div1, div2) {
  let car1 = div1.getBoundingClientRect();
  let car2 = div2.getBoundingClientRect();

  /*
        If the bottom of the first car is above the top of the second car (car1.bottom < car2.top).
        If the top of the first car is below the bottom of the second car (car1.top > car2.bottom).
        If the right of the first car is to the left of the left of the second car (car1.right < car2.left).
        If the left of the first car is to the right of the right of the second car (car1.left > car2.right).
    */

  if (
    car1.bottom < car2.top ||
    car1.top > car2.bottom ||
    car1.right < car2.left ||
    car1.left > car2.right
  )
    return false;

  return true;
}

// 2. Criteria for stopping the game

function stopTheGame() {
  // change game_over to true to be recognized by repeat() method to stop rendering.
  game_over = true;

  addNewScore(score);

  // cancel all animations.
  cancelAnimationFrame(anim_id);
  cancelAnimationFrame(move_up);
  cancelAnimationFrame(move_down);
  cancelAnimationFrame(move_right);
  cancelAnimationFrame(move_left);

  // display the restart div.

  restart_div.style.display = "block";

  restart_btn.innerHTML += `
  <p id="cur-score">Score: ${score.innerText}</p>
  <p id="high-score">High Score: ${getHighScore()}</p>
  <small class="small_text"> << Press Enter >> </small>
  `;
  restart_btn.focus();
}

// 3. Handling the Restart Button

restart_btn.addEventListener("click", function () {
  // reset game state to start a new game.
  game_over = false;
  stop_score_increasing = false;

  // hide the restart_div again.
  restart_div.style.display = "none";

  // hide the finishing line image again.
  end_of_game.style.display = "none";

  // make all cars visible again.
  car_1.style.display = "block";
  car_2.style.display = "block";
  car_3.style.display = "block";

  // reload the game page.
  location.reload();
});

// 4. Scores Handling Methods

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

// ================== Mute All Game Sounds ======================

// Get audio elements
const sounds = [
  start_counter_sound,
  engine_start_sound,
  engine_high_sound,
  engine_low_sound,
  car_passed_sound,
  crash_sound,
];

// Initialize mute status
let isMuted = false;

// Toggle mute status
function Mute() {
  isMuted = !isMuted;
  updateMuteButton();

// Toggle mute for each sound
  sounds.forEach((sound) => {
    sound.muted = isMuted;
  });
}

// Update mute button text
function updateMuteButton() {
  const muteBtn = document.getElementById("muteBtn");
  muteBtn.innerText = isMuted ? "🔇" : "🔊";
}

updateMuteButton();