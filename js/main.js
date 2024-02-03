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















