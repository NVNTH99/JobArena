function AdityaLoad(){
    const formContainer = document.querySelector(".xtra-formcp");
    const addMoreButton = document.getElementById("addMoreButton");
    const add = document.getElementById("xxx3");
    
    addMoreButton.addEventListener("click", function () {
      const formSection = document
        .querySelector(".xtra-form-container")
        .cloneNode(true);
    
      const inputFields = formSection.querySelectorAll("input");
      inputFields.forEach((input) => {
        input.value = ""; // Clear the value of each input field
      });
    
      formContainer.insertBefore(formSection, add);
    });
    
    formContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("delwkcp")) {
        event.target.parentNode.parentNode.remove();
      }
    });
    
    const formContainer2 = document.querySelector(".xtra-formcp2");
    const addMoreButton2 = document.getElementById("addMoreButton2");
    const add2 = document.getElementById("xxx32");
    
    addMoreButton2.addEventListener("click", function () {
      const formSection2 = document
        .querySelector(".xtra-form-container2")
        .cloneNode(true);
    
      formContainer2.insertBefore(formSection2, add2);
    });
    
    formContainer2.addEventListener("click", function (event) {
      if (event.target.classList.contains("delwkcp")) {
        event.target.parentNode.parentNode.remove();
      }
    });
    
}

export default AdityaLoad;