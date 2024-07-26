<?php
session_start();
$_SESSION = [];
// reloading page will set the following session variables
$_SESSION["initialize"] = 1;
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Waiting List</title>
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
    crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <div class="container" style="width:800px;">
    <h1>Waiting list</h1>
    <div class="row test">
      <div class="row" style="width:100%;">
        <div class="col">
          <div class="d-grid gap-2 my-3 mx-0 rolebuttons">
            <h5> Please select your role: </h5>
            <button class="btn btn-primary" type="button" id="adminButton" onclick="adminFunction()">Admin</button>
            <button class="btn btn-primary" type="button" id="patientButton"
              onclick="patientFunction()">Patient</button>
          </div>
        </div>
      </div>
      <div class="row my-3" style="width:100%;">
        <div class="col test colList mx-3" id="adminTable">
          <h1>Current patient list</h1>
          <table id="patientTable" class="table">
            <thead></thead>
          </table>
        </div>
        <div class="col test" id="adminTasks">
          <div class="d-grid gap-2 my-3 mx-3 adminTasks">
            <h1 style="text-align:center;">Admin tasks</h1>
            <button class="btn btn-primary" type="button" id="roomOne" disabled>Room status</button>
            <button class="btn btn-primary" type="button" id="dischargeButton" onclick="dischargePatient()"
              disabled>Discharge patient</button>
            <button class="btn btn-primary" type="button" id="assignPatient" onclick="assignPatient()" disabled>Assign
              patient</button>
          </div>
          <div class="col-md-12 d-flex roomStatus">

          </div>
        </div>
        <div class="col colList" id="patientInfo" style="display:none">
          <div class="form mx-3 my-5" id="patientForm">
            <label for="lastname">Enter your last name:</label>
            <input type="text" id="lastname" class="form-control" name="lastname" aria-describedby="emailHelp"
              placeholder="Enter last name">
            <button class="btn btn-primary my-3" type="button" id="patientLastName" style="width:100%">Get
              status</button>
          </div>
        </div>
        <!-- Home page picture -->
        <div class="col colList mx-3 my-3" id="homeImage" style="display:block">
          <img src="../docs/waitroom.png" style="object-fit:contain;height:100%;width:100%" alt="Waitroom">
        </div>
      </div>
    </div>
    <!-- <div class="row test">
      <h1>Second row</h1>
    </div> -->
  </div>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
    integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
    crossorigin="anonymous"></script>
  <script src="waitingList.js"></script>
</body>

</html>