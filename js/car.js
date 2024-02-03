
// Function to select the car
function selectCar(carImage) {

    document.getElementById("carSelection").style.display = "none";
    
    document.getElementById("car").innerHTML = `<img src="assets/images/${carImage}" />`;
    
    startCountdown();
}