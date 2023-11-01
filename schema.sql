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
    email varchar(100),
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
(11,'Vimal','Vimal@2001','candidate'),
(12,'shaheem','shaheem@1234','recruiter'),
(13, 'Samantha', 'Sam@1234', 'candidate'),
(14, 'Rahul', 'Rahul@1234', 'recruiter'),
(15, 'Priya', 'Priya@1234', 'candidate'),
(16, 'Karthik', 'Karthik@1234', 'recruiter'),
(17, 'Anjali', 'Anjali@1234', 'candidate'),
(18, 'Rajesh', 'Rajesh@1234', 'recruiter'),
(19, 'Aisha', 'Aisha@1234', 'candidate'),
(20, 'Siddharth', 'Sid@1234', 'recruiter');






INSERT INTO Organizations(org_id,Organization_name) VALUES 
(1,'TCS'),
(2,'Infosys'),
(3,'Wipro'),
(4,'Accenture'),
(5,'Cognizant'),
(6,'Google'),
(7,'Amazon'),
(8,'Microsoft'),
(9,'Facebook'),
(10,'Apple'),
(11,'IBM'),
(12,'Intel'),
(13,'Cisco'),
(14,'Oracle'),
(15,'HCL'),
(16,'Capgemini'),
(17,'Tata'),
(18,'L&T'),
(19,'Honeywell'),
(20,'Dell'),
(21, 'IBM'),
(22, 'Oracle'),
(23, 'Intel'),
(24, 'HP Inc.'),
(25, 'Cisco Systems'),
(26, 'Dell Technologies'),
(27, 'Siemens'),
(28, 'General Electric'),
(29, 'Alphabet Inc. (Google)'),
(30, 'Microsoft'),
(31, 'Facebook'),
(32, 'Twitter'),
(33, 'Netflix'),
(34, 'Amazon'),
(35, 'Samsung Electronics'),
(36, 'Sony Corporation'),
(37, 'Adobe Inc.'),
(38, 'NVIDIA'),
(39, 'Tesla, Inc.'),
(40, 'Uber Technologies'),
(41, 'SpaceX'),
(42, 'PayPal Holdings'),
(43, 'Visa Inc.'),
(44, 'Mastercard Inc.'),
(45, 'Walmart Inc.'),
(46, 'Target Corporation'),
(47, 'Nike, Inc.'),
(48, 'McDonald\s Corporation'),
(49, 'Starbucks Corporation'),
(50, 'The Coca-Cola Company'),
(51, 'PepsiCo, Inc.'),
(52, 'The Walt Disney Company'),
(53, 'Warner Bros. Entertainment Inc.'),
(54, 'Universal Pictures'),
(55, 'Sony Pictures Entertainment'),
(56, 'ViacomCBS Inc.'),
(57, 'Alphabet Inc. (Google)'),
(58, 'Verizon Communications Inc.'),
(59, 'AT&T Inc.'),
(60, 'Comcast Corporation'),
(61, 'Boeing Company'),
(62, 'Lockheed Martin Corporation'),
(63, 'General Motors Company'),
(64, 'Ford Motor Company'),
(65, 'ExxonMobil Corporation'),
(66, 'Chevron Corporation'),
(67, 'Royal Dutch Shell plc'),
(68, 'BP plc'),
(69, 'TotalEnergies SE'),
(70, 'Saudi Aramco'),
(71, 'Alibaba Group Holding Limited'),
(72, 'Tencent Holdings Limited'),
(73, 'Samsung Group'),
(74, 'Sony Group Corporation'),
(75, 'LG Corporation'),
(76, 'Nestle S.A.'),
(77, 'Procter & Gamble Co.'),
(78, 'Johnson & Johnson'),
(79, 'Berkshire Hathaway Inc.'),
(80, 'JPMorgan Chase & Co.'),
(81, 'Goldman Sachs Group Inc.'),
(82, 'Morgan Stanley'),
(83, 'Citigroup Inc.'),
(84, 'Wells Fargo & Co.'),
(85, 'The Coca-Cola Company'),
(86, 'PepsiCo, Inc.'),
(87, 'The Home Depot, Inc.'),
(88, 'Lowe\s Companies, Inc.'),
(89, 'Costco Wholesale Corporation'),
(90, 'Walmart Inc.'),
(91, 'Amazon.com, Inc.'),
(92, 'Alphabet Inc. (Google)'),
(93, 'Facebook, Inc.'),
(94, 'Meta Platforms, Inc.'),
(95, 'Twitter, Inc.'),
(96, 'Snap Inc.'),
(97, 'Salesforce.com, Inc.'),
(98, 'Adobe Inc.'),
(99, 'Intuit Inc.'),
(100, 'Cisco Systems, Inc.');





INSERT INTO Recruiter_details(rec_id,First_name,Last_name,org_id) VALUES 
(2,'Aditya','S',1),
(4,'Thalzih','S',2),
(7,'Nithin','S',3),
(8,'Christo','S',4),
(10,'Sreeraj','S',5),
(12,'shaheem','S',6),
(14,'Rahul','S',7),
(16,'Karthik','S',8),
(18,'Rajesh','S',9),
(20,'Siddharth','S',10);


INSERT INTO Jobs (job_id, Title, Description, Responsibility, Requirements, Deadline, Location, salary, work_days, work_hours, job_type, category, rec_id) VALUES 
(1, 'Software Engineer', 'Developing software', 'Developing software', 'B.Tech in Computer Science', '2024-05-30 00:00:00', 'Kochi', 50000, 5, '9:00-5:00', 'Full Time', 'Software Development', 2),
(2, 'Data Analyst', 'Analysing data', 'Analysing data', 'B.Tech in Computer Science', '2024-05-30 00:00:00', 'Bangalore', 90000, 5, '9:00-5:00', 'Full Time', 'Software Development', 4),
(3, 'Full Stack Developer', 'Developing and maintaining websites', 'Developing and maintaining websites', 'B.Tech in Computer Science', '2024-05-30 00:00:00', 'Chennai', 30000, 5, '9:00-5:00', 'Full Time', 'Software Development', 7),
(4, 'Software Development Engineer', 'Developing software', 'Developing software', 'B.Tech in Computer Science', '2024-05-30 00:00:00', 'Kochi', 50000, 5, '9:00-5:00', 'Full Time', 'Software Development', 8),
(5, 'Software Engineer', 'Developing software', 'Developing software', 'B.Tech in Computer Science', '2024-05-30 00:00:00', 'Kochi', 50000, 5, '9:00-5:00', 'Full Time', 'Software Development', 10),
(6, 'Data Scientist', 'Analyzing and interpreting complex data', 'Analyzing and interpreting complex data', 'M.Sc in Data Science', '2024-06-15 00:00:00', 'Mumbai', 70000, 5, '9:00-5:00', 'Full Time', 'Data Science', 12),
(7, 'UI/UX Designer', 'Designing user interfaces and experiences', 'Designing user interfaces and experiences', 'B.Design in Graphic Design', '2024-06-15 00:00:00', 'Pune', 55000, 5, '9:00-5:00', 'Full Time', 'Design', 15),
(8, 'Network Engineer', 'Managing and maintaining computer networks', 'Managing and maintaining computer networks', 'B.Tech in Computer Science', '2024-06-15 00:00:00', 'Delhi', 48000, 5, '9:00-5:00', 'Full Time', 'Networking', 18),
(9, 'Machine Learning Engineer', 'Developing machine learning algorithms', 'Developing machine learning algorithms', 'M.Tech in Artificial Intelligence', '2024-06-15 00:00:00', 'Hyderabad', 75000, 5, '9:00-5:00', 'Full Time', 'Machine Learning', 20),
(10, 'Web Developer', 'Creating and maintaining websites', 'Creating and maintaining websites', 'B.Tech in Computer Science', '2024-06-15 00:00:00', 'Chennai', 45000, 5, '9:00-5:00', 'Full Time', 'Web Development', 22);


INSERT INTO Candidate_details (cand_id, First_name, Last_name, Gender, Disability, Date_of_Birth, Linkedin, Phone, Languages, Address, Nationality, Skills, preference_category,email)
VALUES
(1, 'Amal', 'Mani', 'Male', 'None', '1990-01-01', 'linkedin.com/amal', '1234567890', 'English', '123 Main St, City, Country', 'US', 'Programming, Data Analysis', 'Software Development','amal@gmail.com'),
(3, 'Gigil', 'James', 'Male', 'None', '1985-05-05', 'linkedin.com/gigil', '9876543210', 'English', '456 Elm St, City, Country', 'Canada', 'Data Science, Machine Learning', 'Data Science','gigil@gmail.com'),
(5, 'Navaneeth', 'Shanavasan', 'Male', 'None', '1992-10-15', 'linkedin.com/navaneeth', '1112233445', 'English', '789 Oak St, City, Country', 'UK', 'Web Development, Frontend Development', 'Web Development','navaneeth@gmail.com'),
(6, 'Sreerag', 'unnithan', 'Male', 'None', '1988-07-20', 'linkedin.com/sreerag', '9988776655', 'English', '101 Pine St, City, Country', 'Australia', 'Database Management, SQL', 'Database Management','sreerag@gmail.com'),
(9, 'Abhiram', 'J', 'Male', 'None', '1995-03-12', 'linkedin.com/abhiram', '1122334455', 'English', '202 Maple St, City, Country', 'India', 'Networking, Security', 'Networking','abhiram@gmail.com'),
(11, 'Vimal', 'Vijay', 'Male', 'None', '1983-12-30', 'linkedin.com/vimal', '1122233344', 'English', '303 Cedar St, City, Country', 'India', 'Project Management, Leadership', 'Management','vimal@gmail.com'),
(13, 'Samantha', 'Johnson', 'Female', 'None', '1991-08-25', 'linkedin.com/samantha', '9988776655', 'English', '404 Oak St, City, Country', 'US', 'UI/UX Design, Graphic Design', 'Design','samantha@gmail.com'),
(15, 'Priya', 'Kumar', 'Female', 'None', '1993-07-18', 'linkedin.com/priya', '1122334455', 'English', '505 Pine St, City, Country', 'India', 'Mobile App Development, Android, iOS', 'Mobile Development','priya@gmail.com'),
(17, 'Anjali', 'Ahmed', 'Female', 'None', '1994-04-05', 'linkedin.com/anjali', '9988776655', 'English', '606 Elm St, City, Country', 'UK', 'Digital Marketing, SEO, SEM', 'Marketing','anjali@gmail.com'),
(19, 'Aisha', 'Smith', 'Female', 'None', '1987-11-11', 'linkedin.com/aisha', '1122233344', 'English', '707 Maple St, City, Country', 'Canada', 'Database Management, SQL, NoSQL', 'Database Management','aisha@gmail.com');



INSERT INTO Work_Exp (cand_id, job_Title, org_name, start_year, end_year) VALUES 
(1, 'Software Engineer', 'TCS', 2015, 2020),
(3, 'Data Analyst', 'Infosys', 2015, 2020),
(5, 'Full Stack Developer', 'Wipro', 2015, 2020),
(6, 'Software Development Engineer', 'Accenture', 2015, 2020),
(9, 'Software Engineer', 'Cognizant', 2015, 2020),
(11, 'Software Engineer', 'TCS', 2015, 2020),
(13, 'UI/UX Designer', 'Google', 2015, 2020),
(15, 'Network Engineer', 'Amazon', 2015, 2020),
(17, 'Machine Learning Engineer', 'Microsoft', 2015, 2020),
(19, 'Web Developer', 'Facebook', 2015, 2020);

INSERT INTO Projects (cand_id, org_name, Project_Title, Project_Desc, start_date, end_date) VALUES 
(1, 'TCS', 'Project 1', 'Project 1 Description', '2015-01-01', '2015-01-01'),
(3, 'Infosys', 'Project 2', 'Project 2 Description', '2015-01-01', '2015-01-01'),
(5, 'Wipro', 'Project 3', 'Project 3 Description', '2015-01-01', '2015-01-01'),
(6, 'Accenture', 'Project 4', 'Project 4 Description', '2015-01-01', '2015-01-01'),
(9, 'Cognizant', 'Project 5', 'Project 5 Description', '2015-01-01', '2015-01-01'),
(11, 'TCS', 'Project 6', 'Project 6 Description', '2015-01-01', '2015-01-01'),
(13, 'Google', 'Project 7', 'Project 7 Description', '2015-01-01', '2015-01-01'),
(15, 'Amazon', 'Project 8', 'Project 8 Description', '2015-01-01', '2015-01-01'),
(17, 'Microsoft', 'Project 9', 'Project 9 Description', '2015-01-01', '2015-01-01'),
(19, 'Facebook', 'Project 10', 'Project 10 Description', '2015-01-01', '2015-01-01');

INSERT INTO Education (cand_id, Degree, Major, Institution, start_year, end_year, score, max_score) VALUES 
(1, 'B.Tech', 'Computer Science', 'IIT Madras', 2011, 2015, 9.1, 10),
(3, 'B.Tech', 'Computer Science', 'NIT CALICUT', 2011, 2015, 9.2, 10),
(5, 'B.Tech', 'Computer Science', 'IIT KGP', 2011, 2015, 9.3, 10),
(6, 'B.Tech', 'Computer Science', 'IIT Bombay', 2011, 2015, 9.4, 10),
(9, 'B.Tech', 'Computer Science', 'IIT Guwahati ', 2011, 2015, 9.5, 10),
(11, 'B.Tech', 'Computer Science', 'IIT Kanpur', 2011, 2015, 9.6, 10),
(13, 'B.Tech', 'Computer Science', 'IIT Roorkee', 2011, 2015, 9.7, 10),
(15, 'B.Tech', 'Computer Science', 'IIT Delhi', 2011, 2015, 9.8, 10),
(17, 'B.Tech', 'Computer Science', 'IIT BHU', 2011, 2015, 9.9, 10),
(19, 'B.Tech', 'Computer Science', 'IIT Hyderabad', 2011, 2015, 10, 10);

INSERT INTO Applications (App_id, cand_id, job_id, status) VALUES 
(1, 1, 1, 'Pending'),
(2, 3, 2, 'Shortlisted'),
(3, 5, 3, 'Offered'),
(4, 6, 4, 'Accepted'),
(5, 9, 5, 'Rejected'),
(6, 11, 1, 'Pending'),
(7, 13, 2, 'Shortlisted'),
(8, 15, 3, 'Offered'),
(9, 17, 4, 'Accepted'),
(10, 19, 5, 'Rejected');

INSERT INTO Interviews (App_id, DATE_TIME, link, venue) VALUES 
(2, '2023-11-30 00:00:00', 'meet.google.com/abc', 'Bangalore'),
(7, '2023-10-15 00:00:00', 'meet.google.com/def', 'Pune');



INSERT INTO Notifications (cand_id, message) VALUES 

(3, 'You have been shortlisted for the job'),
(5, 'Congratulations! you have been placed'),
(7, 'You have been shortlisted for the job'),
(8, 'Congratulations! you have been placed');








