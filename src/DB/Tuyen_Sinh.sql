-- DROP TABLE IF EXISTS tuyen_Sinh;
CREATE DATABASE tuyen_Sinh DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE tuyen_Sinh;


CREATE TABLE IF NOT EXISTS Account (
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Phone VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    FullName VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    Role INT NOT NULL,
    Status INT NOT NULL
    );

INSERT INTO Account (Phone, Password, Email, Fullname, Address, Role, Status) VALUES
('0379172187','123456', 'cothechuquyen@gmail.com', 'Nguyen Xuan Quyen', 'Ha Noi', 0, 1);


CREATE TABLE admission (
  Id VARCHAR(50) PRIMARY KEY NOT NULL,
  FullName VARCHAR(50) NOT NULL,
  Phone VARCHAR(50) NOT NULL,
  Email VARCHAR(50) UNIQUE NOT NULL,
  Address VARCHAR(50),  
	InnitiatedDate DATE NOT NULL,
  AccountId VARCHAR(50) NOT NULL,
    AdmissionManager VARCHAR(50) NOT NULL,
  FOREIGN KEY (AccountId) REFERENCES account(ID),
    FOREIGN KEY (AdmissionManager) REFERENCES admission_manager(Id)
);


SQL
-- USE tuyen_Sinh;
--  CREATE TABLE IF NOT EXISTS Student (
--     Id VARCHAR(50) NOT NULL PRIMARY KEY,
--     SchoolId VARCHAR(50) UNIQUE,
--     Role INT NOT NULL,
--     PlaceOfBirth VARCHAR(50),
--     FullName VARCHAR(50) NOT NULL,
--     DateCitizen VARCHAR(50),
--     PlaceCitizen VARCHAR(50),
--     Gender VARCHAR(50),
--     Birthday DATE NOT NULL,
--     CitizenIdentificationNum INT NOT NULL,
--     HightSchool VARCHAR(50),
--     provinceTHPT VARCHAR(50),
--     GraduationYear VARCHAR(50),
--     Majors VARCHAR(50),
--     privateAddress VARCHAR(50),
--     Email VARCHAR(50),
--     Phone VARCHAR(50) NOT NULL UNIQUE,
--     LinkFacebook VARCHAR(50),
     
--     NameSponsor1 VARCHAR(50),
--     PhoneNumberSponsor1 VARCHAR(50),
--     EmailSponsor1 VARCHAR(50),
     
--     NameSponsor2 VARCHAR(50),
--     PhoneNumberSponsor2 VARCHAR(50),
--     EmailSponsor2 VARCHAR(50),
     
--     TemporaryCertificateOfGraduation VARCHAR(100), 
--     CertificateOfGraduation VARCHAR(100), 
--     PortraitImage VARCHAR(100), 
--     BirthCertificate VARCHAR(100), 
--     StudyRecords VARCHAR(100), 
--     CitizenIdentification VARCHAR(100), 
--     EnglishCertificate VARCHAR(100), 
    
--     OtherPapers VARCHAR(100),

--     EnglishLevel VARCHAR(50),
--     CoverImage VARCHAR(100),

--     Admission VARCHAR(50) NOT NULL,

--     ProfileStatus VARCHAR(50),
--     ReservationFeeStatus VARCHAR(50), 
--     AdmissionFeeStatus VARCHAR(50), 

--     LeadSoure VARCHAR(50) NOT NULL,
--     ImageFolder VARCHAR(100),
-- 	FOREIGN KEY (`Phone`) REFERENCES account(Phone),
--     FOREIGN KEY (`Addmission`) REFERENCES account(ID)
--     );


    // thêm một trường tuyển sinh cho năm học nào
    CREATE TABLE IF NOT EXISTS Student (
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    SchoolId VARCHAR(50) UNIQUE,
    Role INT NOT NULL,
    FullName VARCHAR(50) NOT NULL,
    Gender VARCHAR(50),
    Birthday DATE NOT NULL,
    HightSchool VARCHAR(50),
    GraduationYear VARCHAR(50),
    Address VARCHAR(50),
    Email VARCHAR(50),
    Phone VARCHAR(50) NOT NULL UNIQUE,
    LinkFacebook VARCHAR(50),
    PhoneNumberFather VARCHAR(50),
    NameFather VARCHAR(50),
    PhoneNumberMother VARCHAR(50),
    NameMother VARCHAR(50),
    EmailFather VARCHAR(50),
    EmailMother VARCHAR(50),
    SponsorName VARCHAR(50),
    EmailSponsor VARCHAR(50),// sdt
    TemporaryCertificateOfGraduation VARCHAR(100), // giấy  chung nhan tot nghiep tam thoi
    CertificateOfGraduation VARCHAR(100), // bằng tốt nghiệp
    PortraitImage VARCHAR(100), // anh chan dung
    BirthCertificate VARCHAR(100), //giay khai sinh
    StudyRecords VARCHAR(100), // học bạ THPT
    CitizenIdentification VARCHAR(100), //cccd
    EnglishCertificate VARCHAR(100), // chứng chỉ tiếng anh dịch là 
    //thieu dia chi rieng cua thpt va dc
    OtherPapers VARCHAR(100), //các giay to khác
   

--    Cần tạo thêm
--    CitizenIdentificationNum // CCCD số
--    provinceTHPT //địa chỉ trường thpt chia 3 cấp
--    districtTHPT
--    communeTHPT
--    Majors
--    Province //địa chỉ nhà riêng chia 4 cấp
--    District
--    Commune
--    privateAddress
--    SponsorPhone // sdt ng bảo hộ


    EnglishLevel VARCHAR(50),
    CoverImage VARCHAR(100),

    Admission VARCHAR(50) NOT NULL,

    ProfileStatus VARCHAR(50), //trangThaiHoSo
    TuitionFeeStatus BOOLEAN, //trangThaiPhiGiuCho
    AdmissionFeeStatus BOOLEAN, //trangThaiPhiXetTuyen

    LeadSoure VARCHAR(50) NOT NULL,
    ImageFolder VARCHAR(100),

    AllowEditing BOOLEAN NOT NULL,
    EnoughProfile BOOLEAN NOT NULL, //BOOLEAN là kiểu dữ liệu boolean trong MySQL (true/false) 

	FOREIGN KEY (`Phone`) REFERENCES account(Phone),
    FOREIGN KEY (`Admission`) REFERENCES admissionaccount(Id)
    );
    // 3 loại status
    // học bổng - quan hệ một nhiều


    // Bảng log change : sinh viên, cán bộ, loại thay đổi, ngày tháng, gia tri cu, gia tri moi
    // Bảng học bổng: loại học bổng, trị giá, vai trò người cấp
    // bảng đong học phí: loai hoc phi, sinh vien, ngày đóng, số tiền - một nhiều

    
    //create table LogChange
    CREATE TABLE IF NOT EXISTS LogChange (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    StudentId INT NOT NULL,
    Field VARCHAR(50) NOT NULL,
    DateChange DATE NOT NULL,
    NewValue VARCHAR(50) NOT NULL,
    FOREIGN KEY (`StudentId`) REFERENCES Student(Id));
    

    admissions officer, trưởng ban, trưởng phòng
    //create table Admission, THÊM MỘT BẢNG ACCOUNT của tuyển sinh, trưởng phòng, trưởng ban
    CREATE TABLE IF NOT EXISTS AdmissionAccount (
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Phone VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    FullName VARCHAR(50) NOT NULL,
    Address VARCHAR(50),
    TypeAdmission VARCHAR(50) NOT NULL,
    InnitiatedDate DATE NOT NULL,
    );
    

    CREATE TABLE IF NOT EXISTS Fee (
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    SchoolYear DATE NOT NULL,
    Fee INT NOT NULL,
    FeeType VARCHAR(50) NOT NULL
    );


    //create table Scholarship
    CREATE TABLE IF NOT EXISTS Scholarship (
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
   
    TypeScholarship VARCHAR(50) NOT NULL,
    ValueScholarship VARCHAR(50) NOT NULL,
    AdmissionId VARCHAR(50),
    DatePropose DATE NOT NULL,
    FOREIGN KEY (`AdmissionId`) REFERENCES account(ID)
    )

    // create table Payment, thanh toán cho loại phí gì, loại phí, năm học
   CREATE TABLE IF NOT EXISTS Payment (
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    FeeType VARCHAR(50) NOT NULL,
    StudentId VARCHAR(50) NOT NULL,
    PaymentDate DATE NOT NULL,
    PaymentValue INTEGER NOT NULL,
    FOREIGN KEY (`StudentId`) REFERENCES student(Id));

    // create table event


    CREATE TABLE IF NOT EXISTS Event (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    StartDate VARCHAR(50) NOT NULL,
    EndDate VARCHAR(50) NOT NULL,
    Expense INTEGER NOT NULL, // có cần chi phí không?
    Tickets INTEGER NOT NULL,
    Description VARCHAR(50));



    CREATE TABLE IF NOT EXISTS Event_Student ( // checkin, check out, confirm
    StudentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    EventId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Checkin VARCHAR(50),
    Checkout VARCHAR(50),
    Confirm VARCHAR(50),
    FOREIGN KEY (`StudentId`) REFERENCES Student(Id),
    FOREIGN KEY (`EventId`) REFERENCES Event(Id));
    


    -- CREATE TABLE IF NOT EXISTS Status (
    -- id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- student_id INTEGER NOT NULL,
    -- status VARCHAR(50),
    -- FOREIGN KEY (`student_id`) REFERENCES Student(id));


    --  CREATE TABLE IF NOT EXISTS HocPhi (
    -- id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- student_id INTEGER NOT NULL,
    -- so_tien INTEGER,
    -- type VARCHAR(50),
    -- date VARCHAR(50),
    -- FOREIGN KEY (`student_id`) REFERENCES Student(id));


    -- create table email
    CREATE TABLE IF NOT EXISTS SentEmail (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    RoleId INTEGER NOT NULL,
    EmailSent VARCHAR(50) NOT NULL,
   
    Subject VARCHAR(50),
    Message TEXT,
    DateSent VARCHAR(50) NOT NULL,
    FileSent VARCHAR(100),
    FOREIGN KEY (`RoleId`) REFERENCES Admission(Id));


    //create send email student
    CREATE TABLE IF NOT EXISTS SentEmailStudent (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    EmailReceived VARCHAR(50) NOT NULL,
    SeId INTEGER NOT NULL,
    FOREIGN KEY (`SeId`) REFERENCES SentEmail(Id));


   
  CREATE TABLE IF NOT EXISTS messages (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Content TEXT NOT NULL,
    SenderId VARCHAR(50) NOT NULL,
    ReceiverId VARCHAR(50) NOT NULL,
    File VARCHAR(50),
    FOREIGN KEY (SenderId) REFERENCES account(ID),
    FOREIGN KEY (ReceiverId) REFERENCES account(ID)
  )


