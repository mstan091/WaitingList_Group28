<?php
require_once ('_config.php');
session_start();
header("Content-Type: application/json");

switch ($_GET["action"]) {
  case "initialize":
    // Initial setup of connection to database
    if (isset($_SESSION["initialize"])) {
      $erData = new EmergencyData();
      $data = [];
      if ($erData->conn) {
        $data["connResult"] = "Connection successful";
        // Get the room status
        $dataRoom = [];
        $roomStatus = $erData->getRoomStatus();
        while ($row = pg_fetch_assoc($roomStatus)) {
          array_push($dataRoom, $row);
        }
        echo json_encode(array($data, $dataRoom));
      }
    }
    ;
    break;
  
  case "getAdminList":
    $dataPatients = [];
    // Initial setup of connection to database
    $erData = new EmergencyData();
    if ($erData->conn) {
      // Get the list of patients
      $list = $erData->getAdminList();
      while ($row = pg_fetch_assoc($list)) {
        array_push($dataPatients, $row);
      }
      // Get the room status
      $dataRoom = [];
      $roomStatus = $erData->getRoomStatus();
      while ($row = pg_fetch_assoc($roomStatus)) {
        array_push($dataRoom, $row);
      }
      $data = array($dataPatients, $dataRoom);
      echo json_encode($data);
    }
    ;
    break;


  case "dischargePatient":
    $data = [];
    $erData = new EmergencyData();
    if ($erData->conn) {
      $discharge = $erData->removePatientFromRoom();
    }
    if ($discharge) {
      $data["discharge"] = true;
    } else {
      $data["discharge"] = false;
    }
    echo json_encode($data);
    break;

  case "checkinPatient":
    $dataPatients = [];
    $erData = new EmergencyData();
    if ($erData->conn) {
      $updatedList = $erData->checkinPatient();
      while ($row = pg_fetch_assoc($updatedList)) {
        array_push($dataPatients, $row);
      }
      // Get the room status
      $dataRoom = [];
      $roomStatus = $erData->getRoomStatus();
      while ($row = pg_fetch_assoc($roomStatus)) {
        array_push($dataRoom, $row);
      }

      $data = array($dataPatients, $dataRoom);
      echo json_encode($data);
    }
    ;
    break;

  case "getPatientStatus":
    $data = [];
    $erData = new EmergencyData();
    $lastname = $_GET['lname'];
    if ($erData->conn) {
      $patientStatus = $erData->getPatientStatus($lastname);
      $status = [];
      while ($row = pg_fetch_assoc($patientStatus)) {
        array_push($status, $row);
      }
    }
    $data['status'] = $status;
    echo json_encode($data);
    break;
}
?>