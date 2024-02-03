// =======================================
// 1. Check the collision between two cars
// 2. Criteria for stopping the game
// 3. Handling the Restart Button
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