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
  
          //play the win sound
          final_sound.play();
  
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
      kerbs_down();
  
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
  
  function kerbs_down()
  {
    let kerb_current_top = parseInt(
      window.getComputedStyle(line_5).getPropertyValue("top")
    );
    if(kerb_current_top >= 0)
    {
      line_5.style.top = `-100%`;
      line_6.style.top = `-100%`;
    }
    else {
      line_5.style.top = `${kerb_current_top + line_speed}px`;
      line_6.style.top = `${kerb_current_top + line_speed}px`;
    }
  }