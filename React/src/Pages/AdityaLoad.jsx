function AdityaLoad(){
    const lang_inputField = document.getElementById("langfieldcp");
    const lang_addButton = document.getElementById("langpluscp");
    const lang_itemList = document.getElementById("lang-listcp");
    
    lang_addButton.addEventListener("click", function () {
      const lang_inputValue = lang_inputField.value.trim();
    
      if (lang_inputValue !== "") {
        const lang_newItem = document.createElement("div");
        lang_newItem.classList.add("itemcp");
        lang_newItem.innerHTML = `
                        ${lang_inputValue}
                        <button type="button" class="delbtncp">X</button>
                    `;
        lang_itemList.appendChild(lang_newItem);
        lang_inputField.value = "";
      }
    });
    
    lang_itemList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delbtncp")) {
        event.target.parentNode.remove();
      }
    });
    
    const domain_inputField = document.getElementById("domainfieldcp");
    const domain_addButton = document.getElementById("domainpluscp");
    const domain_itemList = document.getElementById("domain-listcp");
    
    domain_addButton.addEventListener("click", function () {
      const domain_inputValue = domain_inputField.value.trim();
    
      if (domain_inputValue !== "") {
        const domain_newItem = document.createElement("div");
        domain_newItem.classList.add("itemcp");
        domain_newItem.innerHTML = `
                          ${domain_inputValue}
                          <button type="button" class="delbtncp">X</button>
                      `;
        domain_itemList.appendChild(domain_newItem);
        domain_inputField.value = "";
      }
    });
    
    domain_itemList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delbtncp")) {
        event.target.parentNode.remove();
      }
    });
    
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