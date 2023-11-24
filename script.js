let empId = 1000;
let formState = "create"; // create or update
const employeeList = [];
const form = document.getElementById("form");
const recordsConatiner = document.getElementById("recordsContainer");
const createButton = document.querySelector("#form button");

const onSubmitForm = (event) => {
  event.preventDefault();

  if (formState === "create") {
    const employee = {
      id: ++empId,
      name: form.name.value,
      salary: form.salary.value,
      role: form.role.value,
      team: form.team.value,
      CompanyName: form.CompanyName.value,
    };
    employeeList.push(employee);
    printRecord(employeeList);
  } else if (formState == "update") {
    //update the employee record
    let employeeID = parseInt(form.id.value);
    employeeList.forEach((emp) => {
      if (emp.id === employeeID) {
        emp.name = form.name.value;
        emp.salary = form.salary.value;
        emp.role = form.role.value;
        emp.team = form.team.value;
        emp.CompanyName = form.CompanyName.value;
      }
    });
    printRecord(employeeList);
    formState = "create";
    createButton.innerText = "Create Employee";
  }

  // to clear the form input value after prevent default
  form.reset();
};

function printRecord(employeeList) {
  //add emp object record inside the table
  // create tr append inside record conatiner

  recordsConatiner.innerText = "";
  employeeList.forEach((emp) => {
    const tr = document.createElement("tr");

    for (let key in emp) {
      const td = document.createElement("td");
      td.innerText = emp[key];

      tr.appendChild(td);
    }

    const optiontd = document.createElement("td");
    const editBtn = document.createElement("span");

    editBtn.className = "material-icons icon";
    editBtn.innerText = "edit";
    editBtn.setAttribute("data-empID", emp.id);

    editBtn.addEventListener("click", editRecord);
    //meta data for edit function

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "material-icons icon";
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("data-empID", emp.id);
    deleteBtn.addEventListener("click", deleteRecord);

    optiontd.append(editBtn, deleteBtn);
    tr.appendChild(optiontd);
    recordsConatiner.appendChild(tr);
  });
}

//delete - feature

function deleteRecord(event) {
  //get the tr node and delete it

  if (formState === "update") {
    alert("Please update the record before deleting the anything");
    return;
  }

  const deleteButton = event.target;
  const pNode = deleteButton.parentNode.parentNode;

  //remove that row
  pNode.remove();

  //delete record from array
  // search for the index of employee with that perticular id in array of employee object to be deleted
  const currentEmployeeId = deleteButton.getAttribute("data-empID");

  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].id == currentEmployeeId) {
      //delete the record from the array
      employeeList.splice(i, 1);
      break;
    }
  }
}

//edit => feature

function editRecord(event) {
  // get the data of that employee by getting empId from custom atrribute

  const editButton = event.target;
  const currentEmployeeId = editButton.getAttribute("data-empID");

  for (let i = 0; i < employeeList.length; i++) {
    if (currentEmployeeId == employeeList[i].id) {
      fillFormWithData(employeeList[i]);
      break;
    }
  }

  //fill the form with that data
  // change the inner text of the submit button to update employee
}

function fillFormWithData(employee) {
  /*  
   id: ++empId,
    name: form.name.value,
    salary: form.salary.value,
    role: form.role.value,
    team: form.team.value,
    CompanyName: form.CompanyName.value,
  */

  // pre-fill the form
  for (let key in employee) {
    if (key !== "id") {
      form[key].value = employee[key];
    }
  }
  form.id.value = employee.id;
  createButton.innerText = "Update Employee";
  formState = "update";
}

form.addEventListener("submit", onSubmitForm);
