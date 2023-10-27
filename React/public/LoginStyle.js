window.onload = function () {
    Particles.init({
    selector: ".background",
    });

    const candbtn = document.getElementById("candbtn");
    const recbtn = document.getElementById("recbtn");
    const form1 = document.getElementById("form1");
    const form2 = document.getElementById("form2");
    const dropdown = document.getElementById("dropdownOptions");
    const otherInput = document.getElementById("otherInput");
  
    if(candbtn){
      candbtn.addEventListener("click", function () {
        form1.style.display = "block";
        form2.style.display = "none";
      });
    }
  
    if(recbtn){
      recbtn.addEventListener("click", function () {
        form1.style.display = "none";
        form2.style.display = "block";
      });
    }
    candbtn.click();
  
    if(dropdown && otherInput){
      dropdown.addEventListener("change", function () {
        if (dropdown.value === "others") {
          otherInput.style.display = "block";
        } else {
          otherInput.style.display = "none";
        }
      });
    }
};
const particles = Particles.init({
    selector: ".background",
    color: ["#03dac6", "#6058A3", "#ff0266"],
    connectParticles: true,
    responsive: [
    {
        breakpoint: 768,
        options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 80,
        connectParticles: false,
        },
    },
    ],
});