let slider = document.getElementById("salary-slider")
let output = document.getElementById("slider-output")
output.innerHTML = slider.value;

slider.oninput = function(){
    output.innerHTML = this.value
}