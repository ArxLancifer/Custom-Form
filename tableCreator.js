const formData = JSON.parse(localStorage.getItem("myTableData"));
const addRowButton = document.querySelector("#addRow");
const myForm = document.querySelector("#myForm");
const resetFormButton = document.querySelector(".resetForm");
const dummyObject = {};
//Input component generator
function createInputComponent(description){
    const inputComponent =  document.querySelector("#fake-input").cloneNode(true);
    inputComponent.classList.remove("hidden");
    inputComponent.querySelector("label").setAttribute("for", description.toLowerCase());
    inputComponent.querySelector("label").textContent = description;
    inputComponent.querySelector("input").setAttribute("id", description.toLowerCase());
    return inputComponent;
}
// Select component generator
function createSelectComponent(description, options){
    const selectComponent = document.querySelector("#fake-select").cloneNode(true);
    selectComponent.classList.remove("hidden");
    const selectField = selectComponent.querySelector("select");
    selectComponent.querySelector("label").setAttribute("for", description);
    selectComponent.querySelector("label").textContent = description;
    selectField.setAttribute("id", description.toLowerCase());
    options.forEach(option=>{
        selectField.innerHTML += `<option value="${option}">${option}</option>`
    })
    return selectComponent
}

//  Initialize Table data
function createTableColumns(data){
    const descriptionsArray = [];
    for(col in data){
        descriptionsArray.push({title:data[col].description,field:data[col].description.toLowerCase()})
    }
    return descriptionsArray
}


// Button to add row
addRowButton.addEventListener('click', addRow);
function addRow(){
    const rowToBeAdded = Object.assign(dummyObject);
    for(key in rowToBeAdded){
        rowToBeAdded[key] = document.querySelector(`#${key}`).value;
    }
    table.addData(rowToBeAdded)
    clearFormInputs();
}

//  Initialize custom form
for(col in formData){
    dummyObject[formData[col].description.toLowerCase()] = "";
    if(formData[col].type === 'select') {
        myForm.append(createSelectComponent(formData[col].description, formData[col].option))
    }
    else if(formData[col].type === 'input'){
        myForm.append(createInputComponent(formData[col].description))
    }
}

// define data array
const tabledata = [
    // Maybe to add some saved data here
    dummyObject
   ];

// initialize table
const table = new Tabulator("#user-table", {
    data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    maxHeight:"300px",
    layout:"fitColumns",
    columns:[ 
        ...createTableColumns(formData)            //define the table columns
         ],
});


function clearFormInputs(){
    const formInputs = myForm.querySelectorAll("input, select");
    formInputs.forEach(_input=>{
        _input.value = "";
    })
}

// Reset form & delete localeStorage
resetFormButton.addEventListener('click', destroyForm)
function destroyForm(){
    // localStorage.removeItem("myTableData")
    window.location = "http://127.0.0.1:5500/form_creator.html?"
}