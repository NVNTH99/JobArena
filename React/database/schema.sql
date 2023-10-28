DROP TABLE IF EXISTS Notifications;
DROP TABLE IF EXISTS Interviews;
DROP TABLE IF EXISTS Applications;
DROP TABLE IF EXISTS Education;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Work_Exp;
DROP TABLE IF EXISTS Candidate_details;
DROP TABLE IF EXISTS Jobs;
DROP TABLE IF EXISTS Recruiter_details;
DROP TABLE IF EXISTS Organizations;
DROP TABLE IF EXISTS Login_details;

CREATE TABLE Login_details(
    id integer,
    username varchar(255) UNIQUE,
    password varchar(255),
    type varchar(20),
    PRIMARY Key(id)
);

CREATE TABLE Organizations(
    org_id integer,
    Organization_name varchar(50),
    PRIMARY KEY(org_id)
);

CREATE TABLE Recruiter_details(
    rec_id integer,
    prof_pic BLOB,
    First_name varchar(30),
    Last_name varchar(30),
    org_id integer,
    PRIMARY KEY (rec_id),
    FOREIGN KEY (org_id) REFERENCES Organizations(org_id),
    FOREIGN KEY (rec_id) REFERENCES Login_details(id)
);

CREATE TABLE Jobs(
    job_id integer,
    Title varchar(30),
    Description text,
    Responsibility text,
    Requirements text,
    Deadline TIMESTAMP,
    Location varchar(50),
    salary integer,
    work_days integer,
    work_hours varchar(15),
    job_type varchar(15),
    category text,
    rec_id integer,
    PRIMARY KEY (job_id),
    FOREIGN KEY (rec_id) REFERENCES Recruiter_details(rec_id)
);

CREATE TABLE Candidate_details(
    cand_id integer,
    prof_pic BLOB,
    First_name varchar(30),
    Last_name varchar(30),
    Gender varchar(20),
    Disability varchar(30),
    Date_of_Birth DATE,
    Linkedin varchar(255),
    Phone varchar(20),
    Languages text,
    Address text,
    Nationality varchar(50),
    Resume BLOB,
    Skills text,
    preference_category text,
    PRIMARY KEY (cand_id),
    FOREIGN KEY (cand_id) REFERENCES Login_details(id)
);

CREATE TABLE Work_Exp(
    cand_id integer,
    job_Title varchar(50),
    org_name varchar(100),
    start_year YEAR,
    end_year YEAR,
    FOREIGN KEY (cand_id) REFERENCES Candidate_details(cand_id)
    -- FOREIGN KEY (org_id) REFERENCES Organizations(org_id)
);

CREATE TABLE Projects(
    cand_id integer,
    org_name varchar(100),
    Project_Title varchar(50),
    Project_Desc text,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (cand_id) REFERENCES Candidate_details(cand_id)
    -- FOREIGN KEY (org_id) REFERENCES Organizations(org_id)
);

CREATE TABLE Education(
    cand_id integer,
    Degree varchar(30),
    Major varchar(50),
    Institution varchar(100),
    start_year YEAR,
    end_year YEAR,
    score DECIMAL(5,2),
    max_score integer,
    FOREIGN KEY (cand_id) REFERENCES Candidate_details(cand_id)
);

CREATE TABLE Applications(
    App_id integer,
    cand_id integer,
    job_id integer,
    status varchar(30),
    PRIMARY KEY (App_id),
    FOREIGN KEY (cand_id) REFERENCES Candidate_details(cand_id),
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);

CREATE TABLE Interviews(
    App_id integer,
    DATE_TIME TIMESTAMP,
    link varchar(100),
    venue varchar(100),
    FOREIGN KEY (App_id) REFERENCES Applications(App_id)
);

CREATE TABLE Notifications(
    cand_id integer,
    message text,
    FOREIGN KEY (cand_id) REFERENCES Candidate_details(cand_id)
);

-- with open("Amal.jpg", "rb") as image_file:
--     binary_data1 = image_file.read()
-- with open("Aditya.jpg", "rb") as image_file:
--     binary_data2 = image_file.read()
-- with open("Gigil.jpg", "rb") as image_file:
--     binary_data3 = image_file.read()
-- with open("Thalzih.jpg", "rb") as image_file:
--     binary_data4 = image_file.read()
-- with open("Navaneeth.jpg", "rb") as image_file:
--     binary_data5 = image_file.read()
-- with open("Sreerag.jpg", "rb") as image_file:
--     binary_data6 = image_file.read()
-- with open("Nithin.jpg", "rb") as image_file:
--     binary_data7 = image_file.read()
-- with open("Christo.jpg", "rb") as image_file:
--     binary_data8 = image_file.read()
-- with open("Abhiram.jpg", "rb") as image_file:
--     binary_data9 = image_file.read()
-- with open("Sreeraj.jpg", "rb") as image_file:
--     binary_data10 = image_file.read()
-- with open("Vimal.jpg", "rb") as image_file:
--     binary_data11 = image_file.read()
-- with open('Amal_Resume.pdf', 'rb') as pdf_file:
--     binary_data12 = pdf_file.read()
-- with open('Aditya_Resume.pdf', 'rb') as pdf_file:
--     binary_data13 = pdf_file.read()
-- with open('Gigil_Resume.pdf', 'rb') as pdf_file:
--     binary_data14 = pdf_file.read()
-- with open('Thalzih_Resume.pdf', 'rb') as pdf_file:
--     binary_data15 = pdf_file.read()
-- with open('Navaneeth_Resume.pdf', 'rb') as pdf_file:
--     binary_data16 = pdf_file.read()
-- with open('Sreerag_Resume.pdf', 'rb') as pdf_file:
--     binary_data17 = pdf_file.read()
-- with open('Nithin_Resume.pdf', 'rb') as pdf_file:
--     binary_data18 = pdf_file.read()
-- with open('Christo_Resume.pdf', 'rb') as pdf_file:
--     binary_data19 = pdf_file.read()
-- with open('Abhiram_Resume.pdf', 'rb') as pdf_file:  
--     binary_data20 = pdf_file.read()
-- with open('Sreeraj_Resume.pdf', 'rb') as pdf_file:  
--     binary_data21 = pdf_file.read()
-- with open('Vimal_Resume.pdf', 'rb') as pdf_file:
--     binary_data22 = pdf_file.read()



INSERT INTO login_details (id,username,password,type) VALUES 
(1,'Amal', 'Amal@1234', 'candidate'),
(2,'Aditya', 'Adit@1234', 'recruiter'),
(3,'Gigil', 'Gigi@1234', 'candidate'),
(4,'Thalzih', 'Thal@1234', 'recruiter'),
(5,'Navaneeth', 'Nava@1234', 'candidate'),
(6,'Sreerag', 'Sree@1234', 'candidate'),
(7,'Nithin','Nithin@1234','recruiter'),
(8,'Christo' ,'Christo@1234','recruiter'),
(9,'Abhiram','Abhi@1234','candidate'),
(10,'Sreeraj','Sree@1234','recruiter'),
(11,'Vimal','Vimal@2001','candidate');



INSERT INTO Organizations(org_id,Organization_name) VALUES 
(1,'TCS'),
(2,'Infosys'),
(3,'Wipro'),
(4,'Accenture'),
(5,'Cognizant');

INSERT INTO Recruiter_details(rec_id,First_name,Last_name,org_id) VALUES 
(2,'Aditya','S',1),
(4,'Thalzih','S',2),
(7,'Nithin','S',3),
(8,'Christo','S',4),
(10,'Sreeraj','S',5);

INSERT INTO Jobs (job_id, Title, Description, Responsibility, Requirements, Deadline, Location, salary, work_dayy, work_hours, job_type, category, rec_id) VALUES 
(1, 'Software Engineer', 'Developing software', 'Developing software', 'B.Tech in Computer Science', '2021-05-30 00:00:00', 'Kochi', 50000, 5, '9:00-5:00', 'Full Time', 'Software', 2),
(2, 'Data Analyst', 'Analysing data', 'Analysing data', 'B.Tech in Computer Science', '2021-05-30 00:00:00', 'Bangalore', 90000, 5, '9:00-5:00', 'Full Time', 'Software', 4),
(3, 'Full Stack Developer', 'Developing and maintaining websites', 'Developing and maintaining websites', 'B.Tech in Computer Science', '2021-05-30 00:00:00', 'Chennai', 30000, 5, '9:00-5:00', 'Full Time', 'Software', 7),
(4, 'Software Development Engineer', 'Developing software', 'Developing software', 'B.Tech in Computer Science', '2021-05-30 00:00:00', 'Kochi', 50000, 5, '9:00-5:00', 'Full Time', 'Software', 8),
(5, 'Software Engineer', 'Developing software', 'Developing software', 'B.Tech in Computer Science', '2021-05-30 00:00:00', 'Kochi', 50000, 5, '9:00-5:00', 'Full Time', 'Software', 10);


INSERT INTO Candidate_details (cand_id, First_name, Last_name, Gender, Disability, Date_of_Birth, Linkedin, Phone, Languages, Address, Nationality, Skills, preference_category)
VALUES
(1, 'Amal', 'Mani', 'Male', 'None', '1990-01-01', 'linkedin.com/amal', '1234567890', 'English', '123 Main St, City, Country', 'US', 'Programming, Data Analysis', 'Software Development'),
(3, 'Gigil', 'James', 'Male', 'None', '1985-05-05', 'linkedin.com/gigil', '9876543210', 'English', '456 Elm St, City, Country', 'Canada', 'Data Science, Machine Learning', 'Data Science'),
(5, 'Navaneeth', 'Shanavasan', 'Male', 'None', '1992-10-15', 'linkedin.com/navaneeth', '1112233445', 'English', '789 Oak St, City, Country', 'UK', 'Web Development, Frontend Development', 'Web Development'),
(6, 'Sreerag', 'unnithan', 'Male', 'None', '1988-07-20', 'linkedin.com/sreerag', '9988776655', 'English', '101 Pine St, City, Country', 'Australia', 'Database Management, SQL', 'Database Management'),
(9, 'Abhiram', 'J', 'Male', 'None', '1995-03-12', 'linkedin.com/abhiram', '1122334455', 'English', '202 Maple St, City, Country', 'India', 'Networking, Security', 'Networking'),
(11, 'Vimal', 'Vijay', 'Male', 'None', '1983-12-30', 'linkedin.com/vimal', '1122233344', 'English', '303 Cedar St, City, Country', 'India', 'Project Management, Leadership', 'Management');


INSERT INTO Work_Exp (cand_id, job_Title, org_id, start_year, end_year) VALUES 
(1, 'Software Engineer', 1, 2015, 2020),
(3, 'Data Analyst', 2, 2015, 2020),
(5, 'Full Stack Developer', 3, 2015, 2020),
(6, 'Software Development Engineer', 4, 2015, 2020),
(9, 'Software Engineer', 5, 2015, 2020),
(11, 'Software Engineer', 1, 2015, 2020);

INSERT INTO Projects (cand_id, org_id, Project_Title, Project_Desc, start_date, end_date) VALUES 
(1, 1, 'Project 1', 'Project 1 Description', '2015-01-01', '2015-01-01'),
(3, 2, 'Project 2', 'Project 2 Description', '2015-01-01', '2015-01-01'),
(5, 3, 'Project 3', 'Project 3 Description', '2015-01-01', '2015-01-01'),
(6, 4, 'Project 4', 'Project 4 Description', '2015-01-01', '2015-01-01'),
(9, 5, 'Project 5', 'Project 5 Description', '2015-01-01', '2015-01-01'),
(11, 1, 'Project 6', 'Project 6 Description', '2015-01-01', '2015-01-01'); 

INSERT INTO Education (cand_id, Degree, Major, Institution, start_year, end_year, score, max_score) VALUES 
(1, 'B.Tech', 'Computer Science', 'IIT Madras', 2011, 2015, 9.1, 10),
(3, 'B.Tech', 'Computer Science', 'NIT CALICUT', 2011, 2015, 9.2, 10),
(5, 'B.Tech', 'Computer Science', 'IIT KGP', 2011, 2015, 9.3, 10),
(6, 'B.Tech', 'Computer Science', 'IIT Bombay', 2011, 2015, 9.4, 10),
(9, 'B.Tech', 'Computer Science', 'IIT Guwahati ', 2011, 2015, 9.5, 10),
(11, 'B.Tech', 'Computer Science', 'IIT Kanpur', 2011, 2015, 9.6, 10);

INSERT INTO Applications (App_id, cand_id, job_id, status) VALUES 
(1, 1, 1, 'Pending'),
(2, 3, 2, 'Shortlisted'),
(3, 5, 3, 'Offered'),
(4, 6, 4, 'Accepted'),
(5, 9, 5, 'Rejected'),
(6, 11, 1, 'Pending');

INSERT INTO Interviews (App_id, DATE_TIME, link, venue) VALUES 
(2, '2021-05-30 00:00:00', 'meet.google.com/abc', 'Bangalore');


INSERT INTO Notifications (cand_id, message) VALUES 

(3, 'You have been shortlisted for the job'),
(5, 'Congratulations! you have been placed');








