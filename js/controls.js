/********************************************\\ Car Movements Using Touchpad //********************************************/

document.addEventListener("wheel",function(e){
    // Check if the wheel is scrolled to the right
    if (e.deltaX < 0) {
      move_right = requestAnimationFrame(()=>ArrowRight(false));
    } 
    // Check if the wheel is scrolled to the left
    else if (e.deltaX > 0) {
      move_left = requestAnimationFrame(()=>ArrowLeft(false))
    } 
})
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
function ArrowLeft(repeat = true) {
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
    repeat && (move_left = requestAnimationFrame(ArrowLeft));
  }
}

// Move the car to the right
function ArrowRight(repeat = true) {
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
    repeat && (move_right = requestAnimationFrame(ArrowRight));
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