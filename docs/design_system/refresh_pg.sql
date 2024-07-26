
DROP view IF EXISTS public.waiting_patients ;
DROP TABLE IF EXISTS public.Room;
DROP TABLE IF EXISTS public.Registration;
DROP TABLE IF EXISTS public.Patient;
DROP TABLE IF EXISTS public.adminstaff;
DROP TABLE IF EXISTS public.Users;

Create table Users (
User_ID  SERIAL primary key,
Role varchar(20)
);



Create table AdminStaff(
Adm_ID SERIAL primary key,
User_ID  int,
Username varchar(10),
FirstName varchar(20) not null,
LastName varchar(20) not null,
Email varchar(20),
Phone int,
CONSTRAINT uniq_username UNIQUE (Username),
CONSTRAINT fk_admin_user_id
 FOREIGN KEY(User_ID) 
        REFERENCES Users(User_ID)
);



Create table Patient(
Patient_ID SERIAL primary key,
User_ID  int,
FirstName varchar(20) not null,
LastName varchar(20) not null,
Age int,
Gender varchar(1),
Phone int,
Address varchar(40),
CONSTRAINT fk_patirent_user_id
 FOREIGN KEY(User_ID) 
        REFERENCES Users(User_ID)
);

Create table Registration(
Registration_ID SERIAL primary key,
Patient_ID  int,
InjurySeverity  varchar(10) not null,
Status varchar(2) CHECK (status in ('A', 'W','D')),
Registration_Date TIMESTAMP not null,
Discharge_Date TIMESTAMP,
CONSTRAINT fk_reg_patient_id
 FOREIGN KEY(Patient_ID) 
        REFERENCES Patient(Patient_ID)
);

Create table Room(
Room_ID SERIAL primary key,
Patient_ID  int,
Status varchar(3) CHECK (status in ('AVL','OCP')),
CONSTRAINT fk_room_patient_id
 FOREIGN KEY(Patient_ID) 
        REFERENCES Patient(Patient_ID)
);

--Insert sample data
Insert into users (role) values('ADM');
Insert into users (role) values('ADM');
Insert into users (role) values('PAT');
Insert into users (role) values('PAT');
Insert into users (role) values('PAT');
Insert into users (role) values('PAT');
Insert into users (role) values('PAT');
Insert into users (role) values('PAT');




Insert into adminstaff (user_id,username, firstName,lastname,email,phone)
values (1, 'andersona','ADAM', 'ANDERSON', 'anderson@test.com',1234567);

Insert into adminstaff (user_id,username, firstName,lastname,email,phone)
values (2, 'burtonb','BURTON','BOB', 'burtonn@test.com',9871234);


Insert into patient (user_id,firstName,lastname,age,gender,phone,address)
values (3, 'MIKE', 'HULL', 67,'M', 1234567, '450 Carling Ave., Ottawa, On');

Insert into patient (user_id,firstName,lastname,age,gender,phone,address)
values (4, 'NIGELA', 'EMERSON', 37,'F', 2345678, '150 Bank St., Orleans, On');

Insert into patient (user_id,firstName,lastname,age,gender,phone,address)
values (5, 'PAT', 'MCCONNEY', 51,'M', 3456789, '9 Carleton Ave., Kanata, On');

Insert into patient (user_id,firstName,lastname,age,gender,phone,address)
values (6, 'HELEN', 'DUPRAS', 45,'F', 4567890, '100 Constellation Dr., Nepean, On');

Insert into patient (user_id,firstName,lastname,age,gender,phone,address)
values (7, 'LAURIE', 'MCELLIOT', 21,'F', 1098765, '80 Kent St., Ottawa, On');

Insert into patient (user_id,firstName,lastname,age,gender,phone,address)
values (8, 'SAM', 'QUERY', 72,'M', 2987654, '12 Iron Dr., Kanata, On');


Insert into registration (patient_id,InjurySeverity,status,registration_date,discharge_date)
values (1, 'Medium', 'D',TO_TIMESTAMP('2024/07/17/14:05:45', 'YYYY/MM/DD/HH24:MI:ss'),TO_TIMESTAMP('2024/07/17/15:20:25', 'YYYY/MM/DD/HH24:MI:ss' ));

Insert into registration (patient_id,InjurySeverity,status,registration_date)
values (2, 'Low', 'W',TO_TIMESTAMP('2024/07/17/15:35:00', 'YYYY/MM/DD/HH24:MI:ss' ));

Insert into registration (patient_id,InjurySeverity,status,registration_date)
values (3, 'Medium', 'W',TO_TIMESTAMP('2024/07/17/15:23:45', 'YYYY/MM/DD/HH24:MI:ss'));

Insert into registration (patient_id,InjurySeverity,status,registration_date)
values (4, 'High', 'A',TO_TIMESTAMP('2024/07/17/15:25:00', 'YYYY/MM/DD/HH24:MI:ss' ));

Insert into registration (patient_id,InjurySeverity,status,registration_date)
values (5, 'Medium', 'W',TO_TIMESTAMP('2024/07/17/15:30:45', 'YYYY/MM/DD/HH24:MI:ss'));

Insert into registration (patient_id,InjurySeverity,status,registration_date)
values (6, 'High', 'W',TO_TIMESTAMP('2024/07/17/15:45:35', 'YYYY/MM/DD/HH24:MI:ss'));


Insert into room (patient_id,status)
values (4, 'OCP');


create view waiting_patients as
select p.patient_id as patient_id, firstname,lastname , injuryseverity,
CASE
  WHEN injuryseverity = 'High' THEN 1
  WHEN injuryseverity ='Medium' THEN 2
  WHEN injuryseverity ='Low' THEN 3
END as Priority, 
registration_date from
patient p, registration r
where p.patient_id = r.patient_id 
and r.status ='W' 
order by Priority , registration_date ;

