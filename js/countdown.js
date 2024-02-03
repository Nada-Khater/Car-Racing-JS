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