function guideBtn() {
  document.getElementById("guide").style.display = "block";
}

function guideBackBtn() {
  document.getElementById("guide").style.display = "none";
}

document.getElementById("guide_btn").addEventListener("click", guideBtn);

document.getElementById("guide_back_btn").addEventListener("click", guideBackBtn);