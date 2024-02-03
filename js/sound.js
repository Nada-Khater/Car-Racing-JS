// ================== Mute All Game Sounds ======================
// declare sound audo objects
const start_counter_sound = new Audio("./assets/sounds/start_counter.wav");
const engine_start_sound = new Audio("./assets/sounds/engine_start_try.wav");
const engine_high_sound = new Audio("./assets/sounds/engine_low_try.wav");
const engine_low_sound = new Audio("./assets/sounds/engine_low_try.wav");
const car_passed_sound = new Audio("./assets/sounds/pass_try.wav");
const crash_sound = new Audio("./assets/sounds/crash_try.wav");
const final_sound = new Audio("./assets/sounds/bravo 3lek.wav");
engine_low_sound.loop = true;

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