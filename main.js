// store the request id of requestAnimationFrame function
let anim_id;

// assign DOM objects to variables
const container = document.getElementById('container'),
    car = document.getElementById('car'),
    car_1 = document.getElementById('car_1'),
    car_2 = document.getElementById('car_2'),
    car_3 = document.getElementById('car_3'),
    line_1 = document.getElementById('line_1'),
    line_2 = document.getElementById('line_2'),
    line_3 = document.getElementById('line_3'),
    line_4 = document.getElementById('line_4'),
    line_5 = document.getElementById('line_5'),
    line_6 = document.getElementById('line_6'),
    restart_div = document.getElementById('restart_div'),
    restart_btn = document.getElementById('restart'),
    score = document.getElementById('score');


//saving some initial setup
var container_left = parseInt(window.getComputedStyle(container).getPropertyValue('left')),
    container_width = parseInt(window.getComputedStyle(container).getPropertyValue('width')),
    container_height = parseInt(window.getComputedStyle(container).getPropertyValue('height')),
    car_width = parseInt(window.getComputedStyle(car).getPropertyValue('width')),
    car_height = parseInt(window.getComputedStyle(car).getPropertyValue('height')),
    line_width_l = parseInt(window.getComputedStyle(line_5).getPropertyValue('width')),
    line_width_r = parseInt(window.getComputedStyle(line_6).getPropertyValue('width'));


//some other declarations
var game_over = false,
    score_counter = 1,
    speed = 5,
    line_speed = 2,
    move_right = false,
    move_left = false,
    move_up = false,
    move_down = false;


anim_id = requestAnimationFrame(repeat);

function repeat() {
    // check if the player does'nt lose the game
    if (game_over === false) {
        // check collision between the player car and the three coming cars
        if (isCollided(car, car_1) || isCollided(car, car_2) || isCollided(car, car_3)) {
            // cancel animation and view and overlay div
            stopTheGame();
        }
        // increase the score counter with every animation refresh
        score_counter++;
        // increase the shown score with 1 point every 20 animation refres
        if (score_counter % 20 == 0) {
            score.innerText = parseInt(score.innerText) + 1;
        }
        // accelerate the movement every 500 animation refresh        
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
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
    var car_current_top = parseInt(window.getComputedStyle(car).getPropertyValue('top'));
    // check if the car is off the canvas 
    if (car_current_top > container_height) {
        // relocate the car to the top of the container and shifted up 200px out of canvas
        car_current_top = -200;
        // asign new left property to the car so that it gets a new position with every tine it gets in the canvas
        var car_left = parseInt(Math.random() * (container_width - car_width - line_width_l));
        car.setAttribute('style',`left:${car_left}`);
    }
    car.setAttribute('style',`top:${car_current_top + speed}`);
}

function line_down(line) {
    var line_current_top = parseInt(window.getComputedStyle(line).getPropertyValue('top'));
    if (line_current_top > container_height) {
        line_current_top = -200;
    }
    line.setAttribute('style',`top:${line_current_top + line_speed}`);
}

// collision function to be added later
function isCollided(car1,car2)
{

}

// stopTheGame function to be added later
function stopTheGame()
{

}