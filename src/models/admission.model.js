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

const Admission = function(admission) {

    this.Id = admission.Id;

    this.FullName = admission.FullName;

    this.Email = admission.Email;
    this.Phone = admission.Phone;
    this.Address = admission.Address
    this.InnitiatedDate = admission.InnitiatedDate;
    this.AccountId = admission.AccountId;
    this.AdmissionManager = admission.AdmissionManager
};



Admission.getAdmissionByAccountId = async function(accountId, result) {

    await db.query(
        "Select * from admission where AccountId = ?",
        accountId,
        function(err, admission) {

            if (err) {

                result(true, err);
            } else {
                if (admission.length > 0) {
                    result(false, admission[0]);

                } else {
                    result(true, null);
                }


            }
        }
    );
};


Admission.updateProfile = async function(data, result) {
    await db.query(
        "UPDATE admission, account SET admission.FullName = ?, account.FullName = ?, admission.Email = ?, account.Email = ?, admission.Gender = ?, admission.Address = ? WHERE admission.AccountId = account.Id AND account.ID = ?", [data.FullName, data.FullName, data.Email, data.Email, data.Gender, data.Address, data.AccountId],
        function(err, admission) {
            if (err) {
                result(true, err);
            } else {
                result(false, admission);
            }
        }
    );
};


Admission.getListStudent = async function(data, result) {
    console.log(data);

    const year = data.year;
    const semester = data.semester;
    // const confirmed = data.confirmed;
    const profile = data.profile;
    const fee = data.fee;
    const leadSoure = data.leadSoure;
    const englishLevel = data.englishLevel;

    let startMonth = 0;
    let endMonth = 0;

    switch (semester) {
        case 'Spring':
            startMonth = 1;
            endMonth = 4;
            break;
        case 'Summer':
            startMonth = 5;
            endMonth = 8;
            break;
        case 'Fall':
            startMonth = 9;
            endMonth = 12;
            break;
        default:
            break;
    }
    // `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
    //     FROM student s
    // INNER JOIN admission a ON s.Admission = a.Id

    let sql = 'SELECT student.Id AS studentId, student.AccountId, student.FullName, student.Phone, student.Email, student.Majors, admission.FullName AS AdmissionName, student.EnoughProfile , admission.Id AS AdmissionId, payment.Status';
    sql += ' FROM student';
    sql += ' LEFT JOIN admission ON student.Admission = admission.Id';
    sql += ' LEFT JOIN payment ON payment.StudentId = student.Id';


    sql += ` WHERE student.Admission = '${data.Id}'`;



    if (profile && profile.length > 0) {
        for (let i = 0; i < profile.length; i++) {
            if (i == 0) {
                sql += ` AND (student.EnoughProfile = '${profile[i]}'`;
            } else {
                sql += ` OR student.EnoughProfile = '${profile[i]}'`;
            }

        }
        sql += ')';
    }

    if (fee && fee.length > 0) {
        for (let i = 0; i < fee.length; i++) {
            if (i == 0) {
                sql += ` AND (payment.Status = '${fee[i]}'`;
            } else {
                sql += ` OR payment.Status = '${fee[i]}'`;
            }
        }
        sql += ')';

    }

    if (leadSoure && leadSoure.length > 0) {
        for (let i = 0; i < leadSoure.length; i++) {
            if (i == 0) {
                sql += ` AND (student.LeadSoure = '${leadSoure[i]}'`;
            } else {
                sql += ` OR student.LeadSoure = '${leadSoure[i]}'`;
            }
        }
        sql += ')';

        // sql += ` AND student.LeadSoure = '${leadSoure}'`;
    }


    if (year) {
        sql += ` AND YEAR(student.InnitiatedDate) = '${year}'`;
    }



    if (semester) {
        sql += ` AND (MONTH(student.InnitiatedDate) BETWEEN ${startMonth} AND ${endMonth})`;
    }

    // if (confirmed) {
    //     sql += `AND student.EnoughProfile = ${confirmed}`;
    // }


    // if (nguonHoSo) {
    //     sql += `AND ho_so.nguon_ho_so = '${nguonHoSo}' `;
    // }

    // if (duPhi) {
    //     sql += `AND phi.so_tien ${duPhi === 'true' ? '>' : '<='} 0 `;
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

    await db.query(sql, function(error, results) {
        if (error) {
            console.log("error: ", error);
            result(true, error);

        } else {
            result(false, results);

        }

    });
};



Admission.getListStudentEnoughProfile = async function(data, result) {
    console.log(data);

    const year = data.year;
    const semester = data.semester;
    // const confirmed = data.confirmed;

    const leadSoure = data.leadSoure;
    const englishLevel = data.englishLevel;

    let startMonth = 0;
    let endMonth = 0;

    switch (semester) {
        case 'Spring':
            startMonth = 1;
            endMonth = 4;
            break;
        case 'Summer':
            startMonth = 5;
            endMonth = 8;
            break;
        case 'Fall':
            startMonth = 9;
            endMonth = 12;
            break;
        default:
            break;
    }
    // `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
    //     FROM student s
    // INNER JOIN admission a ON s.Admission = a.Id

    let sql = 'SELECT student.Id AS studentId, student.AccountId, student.FullName, student.Phone, student.Email, student.Majors, admission.FullName AS AdmissionName, student.EnoughProfile , admission.Id AS AdmissionId, payment.Status';
    sql += ' FROM student';
    sql += ' LEFT JOIN admission ON student.Admission = admission.Id';
    sql += ' LEFT JOIN payment ON payment.StudentId = student.Id';


    sql += ` WHERE student.Admission = '${data.Id}' AND student.EnoughProfile = '1' AND payment.Status = '1'`;


    if (leadSoure && leadSoure.length > 0) {
        for (let i = 0; i < leadSoure.length; i++) {
            if (i == 0) {
                sql += ` AND (student.LeadSoure = '${leadSoure[i]}'`;
            } else {
                sql += ` OR student.LeadSoure = '${leadSoure[i]}'`;
            }
        }
        sql += ')';

        // sql += ` AND student.LeadSoure = '${leadSoure}'`;
    }


    if (year) {
        sql += ` AND YEAR(student.InnitiatedDate) = '${year}'`;
    }



    if (semester) {
        sql += ` AND (MONTH(student.InnitiatedDate) BETWEEN ${startMonth} AND ${endMonth})`;
    }

    // if (confirmed) {
    //     sql += `AND student.EnoughProfile = ${confirmed}`;
    // }


    // if (nguonHoSo) {
    //     sql += `AND ho_so.nguon_ho_so = '${nguonHoSo}' `;
    // }

    // if (duPhi) {
    //     sql += `AND phi.so_tien ${duPhi === 'true' ? '>' : '<='} 0 `;
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

    await db.query(sql, function(error, results) {
        if (error) {
            console.log("error: ", error);
            result(true, error);

        } else {
            result(false, results);

        }

    });
};


Admission.getListStudentOutOfDate = async function(data, result) {
    console.log(data);

    const year = data.year;
    const semester = data.semester;
    // const confirmed = data.confirmed;
    const profile = data.profile;

    const leadSoure = data.leadSoure;
    const englishLevel = data.englishLevel;

    let startMonth = 0;
    let endMonth = 0;

    switch (semester) {
        case 'Spring':
            startMonth = 1;
            endMonth = 4;
            break;
        case 'Summer':
            startMonth = 5;
            endMonth = 8;
            break;
        case 'Fall':
            startMonth = 9;
            endMonth = 12;
            break;
        default:
            break;
    }
    // `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
    //     FROM student s
    // INNER JOIN admission a ON s.Admission = a.Id

    let sql = 'SELECT student.Id AS studentId, student.AccountId, student.FullName, student.Phone, student.Email, student.Majors, admission.FullName AS AdmissionName, student.EnoughProfile , admission.Id AS AdmissionId, payment.Status, scholarship.Status AS ScholarshipStatus,  scholarship.Deadline';
    sql += ' FROM student';
    sql += ' LEFT JOIN admission ON student.Admission = admission.Id';
    sql += ' LEFT JOIN payment ON payment.StudentId = student.Id';
    sql += ' LEFT JOIN scholarship ON scholarship.StudentId = student.Id';


    sql += ` WHERE student.Admission = '${data.Id}' AND scholarship.Deadline < CURDATE() AND student.EnoughProfile = '0' AND payment.Status = '0'`;



    if (profile && profile.length > 0) {
        for (let i = 0; i < profile.length; i++) {
            if (i == 0) {
                sql += ` AND (student.EnoughProfile = '${profile[i]}'`;
            } else {
                sql += ` OR student.EnoughProfile = '${profile[i]}'`;
            }

        }
        sql += ')';
    }



    if (leadSoure && leadSoure.length > 0) {
        for (let i = 0; i < leadSoure.length; i++) {
            if (i == 0) {
                sql += ` AND (student.LeadSoure = '${leadSoure[i]}'`;
            } else {
                sql += ` OR student.LeadSoure = '${leadSoure[i]}'`;
            }
        }
        sql += ')';

        // sql += ` AND student.LeadSoure = '${leadSoure}'`;
    }


    if (year) {
        sql += ` AND YEAR(student.InnitiatedDate) = '${year}'`;
    }



    if (semester) {
        sql += ` AND (MONTH(student.InnitiatedDate) BETWEEN ${startMonth} AND ${endMonth})`;
    }

    // if (confirmed) {
    //     sql += `AND student.EnoughProfile = ${confirmed}`;
    // }


    // if (nguonHoSo) {
    //     sql += `AND ho_so.nguon_ho_so = '${nguonHoSo}' `;
    // }

    // if (duPhi) {
    //     sql += `AND phi.so_tien ${duPhi === 'true' ? '>' : '<='} 0 `;
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

    await db.query(sql, function(error, results) {
        if (error) {
            console.log("error: ", error);
            result(true, error);

        } else {
            result(false, results);

        }

    });
};
module.exports = Admission;