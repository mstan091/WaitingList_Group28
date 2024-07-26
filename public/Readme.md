# Waiting List
---
# *Group 28:* 
* Maria Stancu (300243486)
* Santiago Martinez-Barrera (300234735)

## Implementation
* This is the iomplementation of the WaitingList app HTML, Javascript, Ajax, PHP, CSS. 
* Assignment 4 - CSI3140

## Implementation details
* <span style="color:red"> Please read </span>the instructions for setting up the application: The implementation details are available under the [design_system.md](/docs/design_system.md) document. 

## Postgres data refresh
* At any time you can refresh the Postgres database using the following script: [refresh Postgres](/docs/design_system/refresh_pg.sql)
* The script will recreate the data in the PG database

## Functionality
* Two options are presented when starting the app: Admin and Patient

### Admin 
* Admin option reads data from Postgres through an Ajax call populates the list
  * The list is displayed.  
  * The list is <span style="color:red">ordered by time and by severity: the severity has higher priority over time</span>. Patients with higher severity appear on top of the list even if they registered at a point after existing patients.
  * Assign patient button is disabled
  
  ![Relative](/docs/waitingList.png)
  
### Admin Tasks 

* Admin tasks display the existing patient currently being treated (In progress)
* Once a patient is out from the "Consultation Room" it needs to be discharged: The Discharge Patient button
  * Discharging a patient updates the tables in Postgres (Ajax Call to PHP API) and changes the "Consultation Room" status from red to green. The "Room" is available.
  * The discharge button is disabled now
  * Assign patient button is enabled

![Relative](/docs/discharge.png)

* If you click on the "Assign patient" button, the patient at the top of the list is assigned to the "Consultation Room" and the <strong>list is updated</strong>
* The room status turns to Red displaying the current patient being treated. 
* Assign Button turns to disabled (you cannot assign another patient until the current patient is discharged)
* Discharge Button becomes available
* The database is updated through Ajax call to the PHP API

![Relative](/docs/assign.png)

* Process can continue in the same manner with 
  * Discharging the patient from the Room
  * Followed by Assigning tiop of the list to the Room 
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

* From Patient you can switch to Admin and vice versa






