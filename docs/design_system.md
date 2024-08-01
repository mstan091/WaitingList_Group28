# Implementation design
* The Waiting List app was implemented using Javascript, JQuery Ajax, PHP, Bootstrap and CSS

# Folder Structure
* To run the application you will need the following [folder structure](/docs/folderStructure.png) - folder waiting_list under the htdocs folder: C:\xampp\htdocs\waiting_list
  
# Database
## Install Postgres (we used Postgres v16)
* <span style="color:red">Make sure the Postgres Windows service is running </span>
* Postgres must run on port 5432
* The password to connect to Postgres is: <strong>postgres</strong>
* The connectivity to Postgres is defined in the EmergencyData.php class constructor
```
function __construct()
  {
    $this->conn = pg_connect("host=$this->HOSTNAME dbname=$this->DBNAME user=$this->USER password=$this->PWD");
  }
```
## Create database
* After PG is installed and you can connect to it using user postgres with the password postgres, create the database. 
* The database name is: <strong style="color:red"> emergency_waitlist </strong>

![Postgres DB](/docs/emergency_waitlist.png)

## Insert data
* Data is inserted into the Postgres DB by running the following [script](/docs/design_system/refresh_pg.sql) 
  
* The same [script](/docs/design_system/refresh_pg.sql) is also used for refreshing the data and starting the app using the full list (i.e. after making changes in the app)

# XAMPP setup
* <strong style="color:red">Open the php.ini file </strong> from XAMPP Control panel - Config - php.ini
  * Enable the following extensions: 
  ```
  extension=pdo_pgsql
  extension=pdo_sqlite
  extension=pgsql
  ```
  * Stop/Restart XAMPP

# Database modelling

* Database model
  ![Database model](/docs/schema.png)

* Attributes and relationships
  ![Attributes](/docs/schema_details.png)

  ![Attributes](/docs/schema1.png)




