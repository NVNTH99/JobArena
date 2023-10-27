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
    status varchar(20),
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

INSERT INTO login_details (username,password,type) VALUES 
('Amal', 'Amal@1234', 'candidate'),
('Aditya', 'Adit@1234', 'recruiter'),
('Gigil', 'Gigi@1234', 'candidate'),
('Thalzih', 'Thal@1234', 'recruiter'),
('Navaneeth', 'Nava@1234', 'candidate');