<?php
class EmergencyData
{
  public $conn;
  private $HOSTNAME = "localhost";
  private $PORT = "5432";
  private $USER = "postgres";
  private $PWD = "postgres";
  private $DBNAME = "emergency_waitlist";



  function __construct()
  {
    $this->conn = pg_connect("host=$this->HOSTNAME dbname=$this->DBNAME user=$this->USER password=$this->PWD");
  }

  function getAdminList()
  {
    if ($this->conn) {
      $sql = "select firstname,lastname, injuryseverity,
              CASE
              WHEN injuryseverity = 'High' THEN 1
              WHEN injuryseverity ='Medium' THEN 2
              WHEN injuryseverity ='Low' THEN 3
              END as Priority, 
              registration_date from
              patient p, registration r
              where p.patient_id = r.patient_id 
              and r.status ='W' 
              order by Priority , registration_date";
      $response = pg_query($this->conn, $sql);
      return $response;
    }
  }

  function getPatientStatus($lname)
  {
    if ($this->conn) {
      $sql = "select firstname,lastname, position_in_list from 
              (SELECT firstname,lastname, rank() OVER (ORDER BY Priority , registration_date ) as position_in_list 
	            FROM waiting_patients) where lastname=upper('" . $lname . "')";
      $response = pg_query($this->conn, $sql);
      return $response;
    }
  }

  function getRoomStatus()
  {
    if ($this->conn) {
      $sql = "select r.status, r.patient_id, p.FirstName, p.LastName
              from room r, patient p
              where r.patient_id=p.patient_id";
      $response = pg_query($this->conn, $sql);
      return $response;
    }
    ;
  }

  function removePatientFromRoom()
  {
    if ($this->conn) {
      $sql1 = "update registration set status = 'D', 
              discharge_date = to_date(to_char(current_timestamp, 
              'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD HH24:MI:SS')
              where patient_id in (select patient_id from room)";
      $response1 = pg_query($this->conn, $sql1);
      $sql2 = "update room set status = 'AVL', patient_id=null";
      $response2 = pg_query($this->conn, $sql2);
      if ($response1 && $response2) {
        return true;
      } else {
        return false;
      }

    }
    ;
  }

  function checkinPatient()
  {
    if ($this->conn) {
      $sql1 = "update room set status='OCP', patient_id = (select patient_id from waiting_patients limit 1 )";
      $response1 = pg_query($this->conn, $sql1);

      $sql2 = "update registration set status ='A'
                where patient_id = (select patient_id from waiting_patients limit 1)";
      $response2 = pg_query($this->conn, $sql2);

      $response3 = $this->getAdminList();
      return $response3;
    }

  }

}
?>