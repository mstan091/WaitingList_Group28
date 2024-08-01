# TIC-TAC-TOE Game
---
# *Group 28:* 
* Maria Stancu (300243486)
* Santiago Martinez-Barrera (300234735)

## Implementation
* This is the implementation of the WaitingList app HTML, Javascript, Ajax, PHP, CSS. 
* Assignment 4 - CSI3140

## Implementation details
* <span style="color:red"> Please read </span>the instructions for setting up the application: The implementation details are available under the [design_system.md](/docs/design_system.md) document. 

## Postgres data refresh
* At any time you can refresh the Postgres database using the following script: [refresh Postgres](/docs/design_system/refresh_pg.sql)
* The script will recreate the data in the PG database

## Functionality
* To test the functionality, it is assumed that the application has been setup by following the instructions listed in the file: [design_system.md](/docs/design_system.md)
* Two options are presented when starting the app: Admin and Patient
![Home page](/docs/HomePage.png)
### Admin 
* Admin option reads data from Postgres through an Ajax call and initially  populates the list
  * The initial list is displayed.  
  * The list is <span style="color:red">ordered by time and by severity: the severity has higher priority over time</span>. Patients with higher severity appear on top of the list even if they registered at a point after existing patients.
    * Example: Sam Query has a registration time on 15:45 but appears first on the list because the severity is high
  * In the initial state, the Assign patient button is disabled because there is another patient currently in the "Consultation room": Helen Dupras (In progress)
  
  ![Relative](/docs/waitingList.png)
  
### Admin Tasks: Discharge patient 

* Admin tasks display the existing patient currently being treated (In progress)
* Once a patient is out from the "Consultation Room" it needs to be discharged: Discharge Patient button
  * Discharging a patient updates the tables in Postgres (Ajax Call to PHP API) and changes the "Consultation Room" status from red to green. The "Room" is available.
  * The Discharge button is disabled now
  * Assign patient button is enabled

![Relative](/docs/discharge.png)

### Admin Tasks: Assign patient
* Once the "Consultation room" is Available (which means that a patient has been discharged), you can now click on the "Assign patient" button
* When you assign a patient, the patient at the top of the current list is assigned to the "Consultation Room" and the <span style="color:red">list is updated</span> (Ajax call, page is not refreshed)
* The room status now turns to Red displaying the current patient being treated. 
* Assign Button turns to disabled (you cannot assign another patient until the current patient is discharged)
* Discharge Button becomes available
* The database is updated through Ajax call to the PHP API

![Relative](/docs/assign.png)

* Process can continue in the same manner with 
  * Discharging the patient from the Room
  * Followed by Assigning the patient on top of the list to the Consultation Room 
  * Updating the list
  * At any time you can refresh the Postgres database using the following script: [refresh Postgres](/docs/design_system/refresh_pg.sql)
  
### Patient 
* Clicking on Patient Button will bring the Search by patient last name functionality
* After typing the last name, the patient can obtain its position on the list <span style="color:red">but cannot see the other patients in the waiting list</span>. 
* <strong>Only using functions from the Admin you can see and manipulate all the patients</strong>

![Relative](/docs/patientStatus.png)

![Relative](/docs/patientStatusResult.png)

* Validation is performed: a search by non-existent lastname will return a validation error: 

![Relative](/docs/validation.png)

* From Patient you can switch roles to Admin and vice versa






