const list = document.getElementById("list");
const patientTable = document.getElementById("patientTable");
const roomOne = document.getElementById("roomOne");
const adminButton = document.getElementById("adminButton");
const patientButton = document.getElementById("patientButton");
const dischargeButton = document.getElementById("dischargeButton");
const assignButton = document.getElementById("assignPatient");
const adminTable = document.getElementById("adminTable");
const adminTasks = document.getElementById("adminTasks");
const patientInfo = document.getElementById("patientInfo");
const patientForm = document.getElementById("patientForm");
const patientLastName = document.getElementById("lastname");
const homeImage = document.getElementById("homeImage");

function createTable(data) {
  const headerRow = document.createElement("tr");
  headers = ["#", "First name", "Last name", "Severity", "Registration time"];
  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });
  const thead = document.createElement("thead");
  thead.appendChild(headerRow);
  patientTable.appendChild(thead);

  var tbdy = document.createElement("tbody");
  // Data returned from PHP -> Patients: data[0].   Room: data[1]
  for (var i = 0; i < data[0].length; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 5; j++) {
      if (i == data[0].length && j == 4) {
        break;
      } else {
        var td = document.createElement("td");
        switch (j) {
          case 0:
            td.appendChild(document.createTextNode(i + 1));
            break;
          case 1:
            td.appendChild(document.createTextNode(data[0][i].firstname));
            break;
          case 2:
            td.appendChild(document.createTextNode(data[0][i].lastname));
            break;
          case 3:
            td.appendChild(document.createTextNode(data[0][i].injuryseverity));
            break;
          case 4:
            td.appendChild(
              document.createTextNode(data[0][i].registration_date)
            );
            break;
        }
        tr.appendChild(td);
      }
    }
    tbdy.appendChild(tr);
  }
  patientTable.appendChild(tbdy);
}

function updateTable(data) {
  var tbdy = document.getElementsByTagName("tbody");
  // Data returned from PHP: Patients: data[0].   Room: data[1]
  var rows = tbdy[0].childNodes;
  // compare data with rows: updating the table by looping throught the table not by refreshing it
  // in case existing rows in table > data from PHP:
  let existingRows = rows.length;
  let dataRows = data[0].length;
  if (existingRows > dataRows) {
    // more rows than data
    // i=rows, j=columns
    for (var i = 0; i < existingRows; i++) {
      // get the row
      var tr = rows[i];
      if (i >= dataRows) {
        // delete all rows left
        console.log(tbdy[0].lastChild);
        let lastRow = tbdy[0].lastChild;
        tbdy[0].removeChild(lastRow);
        continue;
      }
      for (var j = 0; j < 5; j++) {
        var td = rows[i].childNodes;
        switch (j) {
          case 0:
            td[j].innerHTML = i + 1;
            break;
          case 1:
            td[j].innerHTML = data[0][i].firstname;
            break;
          case 2:
            td[j].innerHTML = data[0][i].lastname;
            break;
          case 3:
            td[j].innerHTML = data[0][i].injuryseverity;
            break;
          case 4:
            td[j].innerHTML = data[0][i].registration_date;
            break;
        }
      }
    }
  } else {
    for (var i = 0; i < dataRows; i++) {
      // get the row
      var tr = rows[i];
      if (i > 1) {
        // delete all rows left.
        console.log(tbdy[0].lastChild);
        let lastRow = tbdy[0].lastChild;
        tbdy[0].removeChild(lastRow);
        continue;
      }
      for (var j = 0; j < 5; j++) {
        var td = rows[i].childNodes;
        switch (j) {
          case 0:
            td[j].innerHTML = i + 1;
            break;
          case 1:
            td[j].innerHTML = data[0][i].firstname;
            break;
          case 2:
            td[j].innerHTML = data[0][i].lastname;
            break;
          case 3:
            td[j].innerHTML = data[0][i].injuryseverity;
            break;
          case 4:
            td[j].innerHTML = data[0][i].injuryseverity;
            break;
        }
      }
    }
  }
}

function adminFunction() {
  // CLEAR THE TABLE!!!
  let child = patientTable.lastElementChild;
  while (child) {
    patientTable.removeChild(child);
    child = patientTable.lastElementChild;
  }
  // Hide home image
  homeImage.style.display = "none";
  // Display table and tasks
  adminTable.style.display = "";
  adminTasks.style.display = "";

  // Hide the patientInfo
  patientInfo.style.display = "none";

  $.ajax({
    type: "GET",
    url: "waitingListAPI.php?action=getAdminList",
    // dataType: 'json',
    // data: { register: move, boardId: e.target.id},
    success: function (data) {
      console.log(data);
      createTable(data);

      var oRows = document
        .getElementById("patientTable")
        .getElementsByTagName("tr");
      var iRowCount = oRows.length;
      console.log(iRowCount);
      // Set the room status: data[1]=Room status
      if (data[1].length == 0) {
        // table was empty = room available
        roomOne.innerHTML = "Available";
        roomOne.className = "btn btn-success";

        // disable discahrge: room is available
        dischargeButton.disabled = true;
      } else {
        data[1].forEach((elem, indx) => {
          console.log("Room status", elem.status);
          // Set the room status
          if (elem.status === "OCP") {
            roomOne.innerHTML =
              "In progress - patient name:  " +
              data[1][0].firstname +
              " " +
              data[1][0].lastname;
            roomOne.className = "btn btn-danger";
            // enable discharge: room is not available
            dischargeButton.disabled = "";
          } else {
            roomOne.innerHTML = "Available";
            roomOne.className = "btn btn-success";
            // disable discahrge: room is available
            dischargeButton.disabled = true;
          }
        });
      }

      // Disable admin button
      // adminButton.disabled = true;
      // Enable Patient button
      // patientButton.setAttribute("disabled", false);
      // patientButton.disabled = "";
    },
    error: function (jqXHR, textstatus, error) {
      console.log(error);
      console.log(textstatus);
      console.log(jqXHR);
    },
  });
}

function patientFunction() {
  // Hide Admin tasks
  adminTable.style.display = "none";
  adminTasks.style.display = "none";
  // Hide home image
  homeImage.style.display = "none";
  // Display patient info
  patientInfo.style.display = "";
  // Remove previous lastname
  patientLastName.value = "";
  // If exists, remove the h3 info
  var h3 = patientForm.getElementsByTagName("h3")[0];
  if (h3) {
    patientForm.removeChild(h3);
  }

  // Edd event listener for the sTatus button
  buttonStatus = document.getElementById("patientLastName");
  buttonStatus.addEventListener("click", getPatientStatus);
}

function getPatientStatus() {
  // Erase existing h3
  var h3 = patientForm.getElementsByTagName("h3")[0];
  if (h3) {
    patientForm.removeChild(h3);
  }
  const lastName = document.getElementById("lastname").value;
  if (lastName === "") {
    h3 = document.createElement("h3");
    h3.innerHTML = "Please type your lastname";
    h3.style.color = "red";
    patientForm.appendChild(h3);
    return;
  }

  console.log("get patient status", lastName);
  $.ajax({
    type: "GET",
    url: "waitingListAPI.php?action=getPatientStatus",
    dataType: "json",
    data: { lname: lastName },
    success: function (data) {
      if (data["status"].length == 0) {
        h3 = document.createElement("h3");
        h3.innerHTML =
          "Patient not found. Please register first. (function not implemented)";
        patientForm.appendChild(h3);
      } else {
        console.log(data);
        console.log("Firstrname:", data["status"][0].firstname);
        let status =
          data["status"][0].firstname +
          " " +
          data["status"][0].lastname +
          " is at position " +
          data["status"][0].position_in_list +
          " in the waiting list.";
        h3 = document.createElement("h3");
        h3.innerHTML = status;
        patientForm.appendChild(h3);
      }
    },
    error: function (jqXHR, textstatus, error) {
      console.log(error);
      console.log(textstatus);
      console.log(jqXHR);
    },
  });
}

function initializeConnection() {
  $.ajax({
    type: "GET",
    url: "waitingListAPI.php?action=initialize",
    success: function (data) {
      console.log(data[0]);
      console.log(data[1]);
    },
    error: function (jqXHR, textstatus, error) {
      console.log(error);
      console.log(textstatus);
      console.log(jqXHR);
    },
  });
  adminTable.style.display = "none";
  adminTasks.style.display = "none";
  homeImage.style.display = "";
}

function dischargePatient() {
  console.log("discharge");
  // remove patient from room
  // connect db
  // update roomStatus to available
  $.ajax({
    type: "GET",
    url: "waitingListAPI.php?action=dischargePatient",
    success: function (data) {
      console.log(data.discharge);
      if (data.discharge) {
        // Set the room status: data[1]=Room status
        roomOne.innerHTML = "Available";
        roomOne.className = "btn btn-success";
        dischargeButton.disabled = true;
        // assignButton will be available:
        assignButton.disabled = "";
      }
    },
    error: function (jqXHR, textstatus, error) {
      console.log(error);
      console.log(textstatus);
      console.log(jqXHR);
    },
  });
}

function assignPatient() {
  $.ajax({
    type: "GET",
    url: "waitingListAPI.php?action=checkinPatient",
    success: function (data) {
      console.log("UpdatePatient", data);
      // Update table
      updateTable(data);

      // Set the room status: data[1]=Room status
      if (data[1].length == 0) {
        // table was empty = room available
        roomOne.innerHTML = "Available";
        roomOne.className = "btn btn-success";

        // disable discharge: room is available
        dischargeButton.disabled = true;
      } else {
        data[1].forEach((elem, indx) => {
          console.log("Room status", elem.status);
          // Set the room status
          if (elem.status === "OCP") {
            roomOne.innerHTML =
              "In progress - patient name:  " +
              data[1][0].firstname +
              " " +
              data[1][0].lastname;
            roomOne.className = "btn btn-danger";
            // enable discharge: room is not available
            dischargeButton.disabled = "";
            assignButton.disabled = "true";
          } else {
            roomOne.innerHTML = "Available";
            roomOne.className = "btn btn-success";
            // disable discharge: room is available
            dischargeButton.disabled = true;
          }
        });
      }
      patientButton.disabled = "";
    },
    error: function (jqXHR, textstatus, error) {
      console.log(error);
      console.log(textstatus);
      console.log(jqXHR);
    },
  });
}

initializeConnection();
