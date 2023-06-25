const db = require('../DB/connect.js');
//creat an object student

// Student.create({
//     phone: "123456789",
//     fullname: "Nguyen Van A",
//     birthday: "1999-01-01",
//     gender: "Nam",
//     hightSchool: "THPT Nguyen Van Cu",
//     graduationYear: "2017",
//     address: "Ha Noi",
//     email: "quyennxgch190732@gmail.com",
//     linkFacebook: "https://www.facebook.com/quyen.nguyen.581",
//     phoneNumberFather: "123456789",
//     nameFather: "Nguyen Van B",
//     phoneNumberMother: "123456789",
//     nameMother: "Nguyen Thi C",
//     emailFather: "dfdsf@gmail.com",
//     emailMother: "gfdg@gmail.com",
//     sponsorName: "Nguyen Van D",
//     emailSponsor: "cbvfb@gmail.com",
//     giayChungNhanTotNghiep: "https://www.facebook.com/quyen.nguyen.581",
//     bangTotNghiep: "https://www.facebook.com/quyen.nguyen.581",
//     anhChanDung: "https://www.facebook.com/quyen.nguyen.581",
//     giayKhaiSinh: "https://www.facebook.com/quyen.nguyen.581",
//     hocBaTHPT: "https://www.facebook.com/quyen.nguyen.581",
//     cccd: "https://www.facebook.com/quyen.nguyen.581",
//     chungChiTiengAnh: "https://www.facebook.com/quyen.nguyen.581",
//     cacGiayToKhac: "https://www.facebook.com/quyen.nguyen.581",
// }, (err, res) => {
//     if (err) {

//     } else {
//         console.log(res);
//     }
// });

const Student = function(student) {

    this.Id = student.Id;
    this.SchoolId = student.SchoolId;
    this.PlaceOfBirth = student.PlaceOfBirth;
    this.FullName = student.FullName;
    this.Nationality = student.Nationality;
    this.DateCitizen = student.DateCitizen;
    this.PlaceCitizen = student.PlaceCitizen;
    this.Gender = student.Gender;
    this.Birthday = student.Birthday;
    this.CitizenIdentificationNum = student.CitizenIdentificationNum;
    this.HightSchool = student.HightSchool;
    this.provinceTHPT = student.provinceTHPT;
    this.GraduationYear = student.GraduationYear;
    this.Majors = student.Majors;
    this.Address = student.Address;
    this.Email = student.Email;
    this.Phone = student.Phone;
    this.LinkFacebook = student.LinkFacebook;
    this.NameSponsor1 = student.NameSponsor1;
    this.PhoneNumberSponsor1 = student.PhoneNumberSponsor1;
    this.EmailSponsor1 = student.EmailSponsor1;
    this.NameSponsor2 = student.NameSponsor2;
    this.PhoneNumberSponsor2 = student.PhoneNumberSponsor2;
    this.EmailSponsor2 = student.EmailSponsor2;
    this.TemporaryCertificateOfGraduation = student.TemporaryCertificateOfGraduation;
    this.CertificateOfGraduation = student.CertificateOfGraduation;
    this.PortraitImage = student.PortraitImage;
    this.BirthCertificate = student.BirthCertificate;
    this.StudyRecords = student.StudyRecords;
    this.CitizenIdentification = student.CitizenIdentification;
    this.EnglishCertificate = student.EnglishCertificate;
    this.OtherPapers = student.OtherPapers;
    this.EnglishLevel = student.EnglishLevel;
    this.CoverImage = student.CoverImage;
    this.Admission = student.Admission;
    this.LeadSoure = student.LeadSoure;
    this.ImageFolder = student.ImageFolder;
    this.AllowEditing = student.AllowEditing;
    this.EnoughProfile = student.EnoughProfile;

    this.Commune = student.Commune;
    this.District = student.District;
    this.Province = student.Province;
    this.Scholarship = student.Scholarship;
    this.InnitiatedDate = student.InnitiatedDate;
    this.AccountId = student.AccountId;
    this.AdmissionManager = student.AdmissionManager;



    // this.SchoolId = student.SchoolId;
    // this.Role = student.Role;
    // this.FullName = student.FullName;
    // this.Gender = student.Gender;
    // this.Birthday = student.Birthday;
    // this.HightSchool = student.HightSchool;
    // this.GraduationYear = student.GraduationYear;
    // this.Address = student.Address;
    // this.Email = student.Email;
    // this.Phone = student.Phone;
    // this.LinkFacebook = student.LinkFacebook;
    // this.PlaceOfBirth = student.PlaceOfBirth;
    // this.DateCitizen = student.DateCitizen;
    // this.PlaceCitizen = student.PlaceCitizen;
    // this.Majors = student.Majors;
    // this.CitizenIdentificationNum = student.CitizenIdentificationNum;
    // this.provinceTHPT = student.provinceTHPT;
    // this.NameSponsor1 = student.NameSponsor1;
    // this.PhoneNumberSponsor1 = student.PhoneSponsor1;
    // this.EmailSponsor1 = student.EmailSponsor1;
    // this.NameSponsor2 = student.NameSponsor2;
    // this.PhoneNumberSponsor2 = student.PhoneSponsor2;
    // this.EmailSponsor2 = student.EmailSponsor2;
    // this.TemporaryCertificateOfGraduation =
    //     student.TemporaryCertificateOfGraduation;
    // this.CertificateOfGraduation = student.CertificateOfGraduation;
    // this.PortraitImage = student.PortraitImage;
    // this.BirthCertificate = student.BirthCertificate;
    // this.StudyRecords = student.StudyRecords;
    // this.CitizenIdentification = student.CitizenIdentification;
    // this.EnglishCertificate = student.EnglishCertificate;
    // this.OtherPapers = student.OtherPapers;
    // this.EnglishLevel = student.EnglishLevel;
    // this.CoverImage = student.CoverImage;
    // this.Admission = student.Admission;
    // this.ProfileStatus = student.ProfileStatus;
    // this.ReservationFeeStatus = student.ReservationFeeStatus;
    // this.AdmissionFeeStatus = student.AdmissionFeeStatus;
    // this.LeadSoure = student.LeadSoure;
    // this.ImageFolder = student.ImageFolder;

    // this.Nationality = student.Nationality;


    // this.AllowEditing = student.AllowEditing;
    // this.EnoughProfile = student.EnoughProfile;
};


Student.updateProfile = async function(data, result) {
    await db.query(
        "UPDATE accountant, account SET accountant.FullName = ?, account.FullName = ?, accountant.Email = ?, account.Email = ?, accountant.Gender = ?, accountant.Address = ? WHERE accountant.AccountId = account.Id AND account.ID = ?", [data.FullName, data.FullName, data.Email, data.Email, data.Gender, data.Address, data.AccountId],
        function(err, accountant) {
            if (err) {
                result(true, err);
            } else {
                result(false, accountant);
            }
        }
    );
};


Student.getAllScholarship = async function(result) {
    await db.query("SELECT * FROM ", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


Student.getScholarshipStudent = async function(studentId, result) {
    await db.query("SELECT * FROM student WHERE Id = ?", studentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Student.removeScholarshipStudent = async function(studentId, result) {
    await db.query("UPDATE student SET WHERE Id = ?", studentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


Student.updateScholarshipStudent = async function(studentId, result) {
    await db.query("UPDATE student SET Scholarship = 1 WHERE Id = ?", studentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


Student.createScholarshipStudent = async function(newStudent, result) {
    await db.query("INSERT INTO student SET ?", newStudent, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}


Student.updateAllowEditing = async function(allowEditing, studentId, result) {
    await db.query(`UPDATE student SET AllowEditing = '${allowEditing}' WHERE Id = '${studentId}'`, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log("student : ", res);
            result(true, res);
        }
    });
};


Student.enoughProfile = async function(enoughProfile, studentId, result) {
    await db.query(`UPDATE student SET EnoughProfile = '${enoughProfile}' WHERE Id = '${studentId}'`, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log("student : ", res);
            result(true, res);
        }
    });
};



Student.getStudentsToEvent = async function(data, result) {
    let sql = ''
    if (data.Role == 2) {
        sql = `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
        FROM student s
    INNER JOIN admission a ON s.Admission = a.Id
    WHERE s.Id NOT IN(
        SELECT StudentID
        FROM event_student
        WHERE EventID = '${data.eventID}' AND s.Admission = '${data.AdId}'
    )`
    } else if (data.Role == 3) {

        sql = `SELECT s.Id, s.Email, s.FullName, s.Majors, am.FullName AS Admission
        FROM student s
    INNER JOIN admission_manager am ON s.AdmissionManager = am.Id
    WHERE s.Id NOT IN(
        SELECT StudentID
        FROM event_student
        WHERE EventID = '${data.eventID}' AND s.AdmissionManager = '${data.AdId}'
    )`
        console.log(sql);

    }
    await db.query(
        sql,
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(false, err);
            } else {
                console.log("student : ", res);
                result(true, res);
            }
        }
    );
};


Student.getNameAndAdmission = async function(eventId, result) {
    await db.query(
        `SELECT FullName, Admission
        FROM student
        WHERE Id IN (
            SELECT StudentID
            FROM event_student
            WHERE EventID = '${eventId.toString()}'
        )`,
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(false, err);
            } else {
                console.log("student : ", res);
                result(true, res);
            }
        }
    );
};




Student.getAllStudent = async function(result) {
    let query = 'SELECT * FROM students WHERE 1=1';
    let filter = querystring.parse(req.url.split('?')[1]);
    let params = [];

    if (filter.englishLevels) {
        let englishLevels = filter.englishLevels.split(',');
        query += ' AND englishLevel IN (' + englishLevels.map(() => '?').join(',') + ')';
        params.push(...englishLevels);
    }

    if (filter.sources) {
        let sources = filter.sources.split(',');
        query += ' AND source IN (' + sources.map(() => '?').join(',') + ')';
        params.push(...sources);
    }

    if (filter.semester) {
        query += ' AND semester = ?';
        params.push(filter.semester);
    }

    if (filter.year) {
        query += ' AND year = ?';
        params.push(filter.year);
    }
    await db.query("Select * from student", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log("student : ", res);
            result(true, res);
        }
    });
};

Student.getAllStuentByAdmission = async function(admission, query, result) {
    const { year, semester } = query;
    //convert semester to between month
    let startMonth = 0;
    let endMonth = 0;

    await db.query(
        "Select * from student WHERE Admission = ?", [admission],
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(false, err);
            } else {
                console.log("student : ", res);
                result(true, res);
            }
        }
    );
    // switch (semester) {
    //     case '1':
    //         startMonth = 1;
    //         endMonth = 4;
    //         break;
    //     case '2':
    //         startMonth = 5;
    //         endMonth = 8;
    //         break;
    //     case '3':
    //         startMonth = 9;
    //         endMonth = 12;
    //         break;
    //     default:
    //         break;
    // }
    // //query by admission and semester

    // if (!year) {
    //     await db.query(
    //         "Select * from student WHERE Admission = ?", [admission],
    //         function(err, res) {
    //             if (err) {
    //                 console.log("error: ", err);
    //                 result(false, err);
    //             } else {
    //                 console.log("student : ", res);
    //                 result(true, res);
    //             }
    //         }
    //     );
    // } else if (!semester) {
    //     await db.query(
    //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ?", [admission, year],
    //         function(err, res) {
    //             if (err) {
    //                 console.log("error: ", err);
    //                 result(false, err);
    //             } else {
    //                 console.log("student : ", res);
    //                 result(true, res);
    //             }
    //         }
    //     );
    // } else {
    //     await db.query(
    //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ? AND MONTH(DateCreated) BETWEEN ? AND ?", [admission, year, startMonth, endMonth],
    //         function(err, res) {
    //             if (err) {
    //                 console.log("error: ", err);
    //                 result(false, err);
    //             } else {
    //                 console.log("student : ", res);
    //                 result(true, res);
    //             }
    //         }
    //     );
    // }

};

Student.create = async function(newStudent, result) {

    await db.query("INSERT INTO student SET ?", newStudent, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

Student.getAll = async function(result) {
    await db.query("Select * from student", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("student : ", res);
            result(null, res);
        }
    });
};

Student.getStudentById = async function(studentId, result) {

    await db.query(
        "Select * from student where Id = ?",
        studentId,
        function(err, student) {

            if (err) {

                result(false, err);
            } else {
                if (student.length > 0) {
                    result(true, student[0]);
                } else {
                    result(false, null);
                }


            }
        }
    );
};

Student.getStudentByAccountId = async function(accountId, result) {

    await db.query(
        "Select * from student where AccountId = ?",
        accountId,
        function(err, student) {

            if (err) {

                result(true, err);
            } else {
                if (student.length > 0) {
                    result(false, student[0]);
                } else {
                    result(true, null);
                }


            }
        }
    );
};

Student.getByPhone = async function(phone, result) {
    console.log(phone);
    await db.query(
        
        "Select student.*, payment.Id AS paymentId, payment.StudentId AS paymentStudentId, payment.RequestDate AS paymentRequestDate, payment.PaymentValue AS paymentValue, payment.Status AS paymentStatus, payment.ConfirmDate AS paymentConfirmDate, payment.FeeType AS paymentFeeType from student INNER JOIN payment ON student.Id = payment.StudentId where student.Phone = ?",
        phone,
        function(err, student) {
            if (err) {
                result(false, err);
                // return;
            } else {

                result(true, student);
                // return student[0];
               
            }
        }
    );
};

Student.updateById = async function(Id, data, result) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const updateStatement = keys.reduce((statement, key, index) => {
        if (index === keys.length - 1) {
            return `${statement}student.${key} = ?`;
        }

        return `${statement}student.${key} = ?, `;
    }, `UPDATE student JOIN account ON account.ID = student.AccountId SET account.FullName = '${data.FullName}', account.Email = '${data.Email}', `);

    const sql = `${updateStatement} WHERE student.Id = ?`;

    console.log(sql);

    const updateValues = [...values, Id];
    console.log(updateValues);

    db.query(sql, updateValues, function(error, results) {
        if (error) {
            console.error(error);
            result(false, error);
        } else {
            console.log(`Updated ${results.changedRows} row(s)`);
            result(true, results);
        }
    });

    // await db.query("UPDATE student SET fullname = ?, birthday = ?, gender = ?, hightSchool = ?, graduationYear = ?, address = ?, email = ?, linkFacebook = ?, phoneNumberFather = ?, nameFather = ?, phoneNumberMother = ?, nameMother = ?, emailFather = ?, emailMother = ?, sponsorName = ?, emailSponsor = ?, giayChungNhanTotNghiep = ?, bangTotNghiep = ?, anhChanDung = ?, giayKhaiSinh = ?, hocBaTHPT = ?, cccd = ?, chungChiTiengAnh = ?, cacGiayToKhac = ? WHERE id = ?", [student.fullname, student.birthday, student.gender, student.hightSchool, student.graduationYear, student.address, student.email, student.linkFacebook, student.phoneNumberFather, student.nameFather, student.phoneNumberMother, student.nameMother, student.emailFather, student.emailMother, student.sponsorName, student.emailSponsor, student.giayChungNhanTotNghiep, student.bangTotNghiep, student.anhChanDung, student.giayKhaiSinh, student.hocBaTHPT, student.cccd, student.chungChiTiengAnh, student.cacGiayToKhac, student.id], function(err, res) {

    //     if (err) {
    //         console.log("error: ", err);
    //         result(null, err);
    //     } else {
    //         result(null, res);
    //     }
    // });

    // await db.query("UPDATE student SET FullName = ?, Gender = ?, Birthday = ?, PlaceOfBirth = ?, Nationality = ?, CitizenIdentificationNum = ?, DateCitizen = ?, PlaceCitizen = ?, provinceTHPT = ?, HightSchool = ?, TemporaryCertificateOfGraduation = ?, CertificateOfGraduation = ?, StudyRecords = ?, EnglishCertificate = ?, BirthCertificate = ?, PortraitImage = ?, CitizenIden = ?, OtherPapers = ? WHERE Phone = ?", [data.FullName, data.Gender, data.Birthday, data.PlaceOfBirth, data.Nationlity, data.CitizenIdentificationNum, data.DateCitizen, data.PlaceCitizen, data.provinceTHPT, data.HightSchool, data.TemporaryCertificateOfGraduation, data.CertificateOfGraduation, data.StudyRecords, data.EnglishCertificate, data.BirthCertificate, data.PortraitImage, data.CitizenIden, data.OtherPapers, Phone], function(err, res) {

    //     if (err) {
    //         console.log("error: ", err);
    //         result(false, err);
    //     } else {
    //         result(true, res);
    //     }
    // });
};

//Test API update profile
Student.testUpdateById = async function(phone, student, result) {
    await db.query(
        "UPDATE student SET FullName = ?, Gender = ?, GraduationYear = ?, Email = ?, LinkFacebook = ?, PhoneNumberFather = ?, NameFather = ?, PhoneNumberMother = ?, NameMother = ?, EmailFather = ?, EmailMother = ? WHERE Phone = ?", [
            student.FullName,
            student.Gender,
            student.GraduationYear,
            student.Email,
            student.LinkFacebook,
            student.PhoneNumberFather,
            student.NameFather,
            student.PhoneNumberMother,
            student.NameMother,
            student.EmailFather,
            student.EmailMother,
            phone,
        ],
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(false, err);
            } else {
                result(true, res);
            }
        }
    );
};

Student.remove = async function(id, result) {
    await db.query("DELETE FROM student WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// Student.getByPhoneAndPassword = async function(phone, password, result) {

//     await db.query('SELECT * FROM account WHERE phone = ? AND password = ?', [phone, password], function(err, account) {
//         if (err || account.length == 0) {
//             result("Login failed", null);
//         } else {
//             result("Login successful", account[0]);
//         };
//     });

// }

module.exports = Student;