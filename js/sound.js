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