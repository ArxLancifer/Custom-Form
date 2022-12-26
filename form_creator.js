const inputType = document.querySelector('#description-select');
const addFieldButton = document.querySelector('.addField');
const addOption = document.querySelector('#add-option');
const addOptionField = document.querySelector('.optionField');
const trashCanIcons = document.querySelectorAll('.bi-trash');
const confirmButton = document.querySelector('#confirm')
// Input change listener to handle input type and show hide "+" icon
inputType.addEventListener('change',(e)=>{
   if(e.target.value == 'option'){
        addOptionField.classList.add("shown")
   }else {
    addOptionField.classList.remove("shown")
   }
})



addFieldButton.addEventListener('click', addField)

function addField(){
    const inputType = document.querySelector('#description-select');
    const inputDescription = document.querySelector('#description');
    const allInputs = document.querySelector('.all-inputs')
    const errorField = document.querySelector('.error-field')
// Handle not valid inputs
    if(inputType.value === "Type"){
        errorField.textContent = "Please select input type";
        errorField.classList.toggle('error-field-shown');
        setTimeout(()=>{
            errorField.classList.toggle('error-field-shown');
        },3000)
        return
    }else if (!inputDescription.value){
        errorField.textContent = "Please fill input description field";
        errorField.classList.toggle('error-field-shown');
        setTimeout(()=>{
            errorField.classList.toggle('error-field-shown');
        },3000)
        return
    }
    if(inputType.value ==="input"){
        addInputTypeField(allInputs, inputDescription)
    }else if(inputType.value ==="option"){
        // addSelectTypeOption(inputDescription)
        addOptionsTypeField(allInputs, inputDescription)
    }
    

    inputType.value = "";
    inputDescription.value = "";
    document.querySelector('.added-options').innerHTML = "";
    document.querySelector('.optionField').classList.remove('shown')
}

function addInputTypeField(allInputs, inputDescription){
    const inputToAdd = document.createElement('p');
    const removeButton = document.createElement('i');
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add(`column-${allInputs.querySelectorAll("p").length}`)
    fieldContainer.dataset.description = inputDescription.value;
    removeButton.classList.add('bi', 'bi-trash');
    inputToAdd.textContent = `Field type ${inputType.value} is added with header : ` + inputDescription.value;
    fieldContainer.classList.add('type-input')
    fieldContainer.append(inputToAdd, removeButton)
    allInputs.appendChild(fieldContainer);
    // trashcan event listener
    removeButton.addEventListener('click', (e)=>{
        e.target.parentNode.remove();
    })
}

function addOptionsTypeField(allInputs, inputDescription){
    const addedOptions = document.querySelectorAll(".added-options > div > span")
    const fieldContainer = document.createElement('div')
    const removeButton = document.createElement('i');
    removeButton.classList.add('bi', 'bi-trash');
    fieldContainer.innerHTML = `<span>Field type ${inputType.value}  Header:<strong>${inputDescription.value}</strong> options :</span>`;
    fieldContainer.dataset.description = inputDescription.value;
    // const allInputs = document.querySelector('.all-inputs')
    addedOptions.forEach(option=>{
        const clonedOption = option.cloneNode(true)
        clonedOption.classList.add('_option')
        fieldContainer.classList.add('column','type-select')
        fieldContainer.append(clonedOption);
        allInputs.appendChild(fieldContainer);
    })
    fieldContainer.append(removeButton)
    removeButton.addEventListener('click', (e)=>{
        e.target.parentNode.remove();
    })
}

addOption.addEventListener('click', addSelectTypeOption)
function addSelectTypeOption(e){
    const optionDescriptionInput = document.querySelector('#option-description');
    const addedOptions = document.querySelector('.added-options')
    const optionContainer = document.createElement('div'); 
    optionContainer.classList.add('_option')
    const optionDescription = document.createElement('span');
    optionDescription.textContent = optionDescriptionInput.value;
    const removeButton = document.createElement('i');
    removeButton.classList.add('bi','bi-x');
    optionContainer.append(optionDescription, removeButton);
    addedOptions.appendChild(optionContainer);
    // remove option button "x"
    optionDescriptionInput.value = "";
    removeButton.addEventListener('click', (e)=>{
        e.target.parentNode.remove();
    })
}

confirmButton.addEventListener('click', initializeFields)
function initializeFields(){
    const tableStorage = {}
    const userInputs = document.querySelectorAll('.all-inputs > div');
    const errorField = document.querySelector('.error-field');
    userInputs.forEach((input, index)=>{
        const type = input.classList.value.includes('input') ? "input" : "select";
        let optionsArray = [];
        if(type ==="select"){
            input.querySelectorAll('._option').forEach(option=>optionsArray.push(option.textContent))
        }
        tableStorage[`column-${index}`] = {type:type ,description:input.dataset.description, option:optionsArray}; 
    })
    if(Object.keys(tableStorage) < 1){
        errorField.textContent = "You can not submit without any fields";
        errorField.classList.toggle('error-field-shown');
        setTimeout(()=>{
            errorField.classList.toggle('error-field-shown');
        },3000)
       return;
    }
    localStorage.setItem("myTableData", JSON.stringify(tableStorage))
    // console.log(tableStorage)
    window.location ="http://127.0.0.1:5500/finalForm.html?"
}

