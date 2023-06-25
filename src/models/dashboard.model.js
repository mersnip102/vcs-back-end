const db = require('../DB/connect.js');
const moment = require('moment');

const Dashboard = function(dashboard) {

    // this.Id = admission.Id;

    // this.FullName = admission.FullName;

    // this.Email = admission.Email;
    // this.Phone = admission.Phone;
    // this.Address = admission.Address
    // this.InnitiatedDate = admission.InnitiatedDate;
    // this.AccountId = admission.AccountId;
    // this.AdmissionManager = admission.AdmissionManager
};

Dashboard.getDashboard = async function(data, result) {
   

// const today = moment(); // Lấy ngày hiện tại
// const oneMonthAgo = today.subtract(1, 'months'); // Trừ đi 1 tháng
// const formattedDate = oneMonthAgo.format('YYYY-MM-DD'); // Định dạng ngày tháng

// console.log(formattedDate); // In ra ngày cách đây đúng 1 tháng trong định dạng YYYY-MM-DD
    let sql = "";
    
    if (data.Role == 2) {
        "SELECT h.id AS head_id, a.id AS admission_id, COUNT(s.id) AS student_count FROM admission a LEFT JOIN student s ON a.id = s.admission_id INNER JOIN headoffadmission h ON a.headoffadmission_id = h.id GROUP BY h.id, a.id"
        sql = "SELECT studeadmission.Id, COUNT(student.Id) AS student_count FROM admission LEFT JOIN student ON admission.Id = student.Admission GROUP BY Admission.Id"
        sql = `SELECT * FROM student WHERE (InnitiatedDate BETWEEN '${data.start}' AND '${data.end}') AND Admission = '${data.AdmisionId}'`;
        console.log(sql);
    } else if (data.Role == 3) {
        sql = "SELECT admission.Id, COUNT(student.Id) AS student_count FROM admission LEFT JOIN student ON admission.Id = student.Admission GROUP BY Admission.Id WHERE (InnitiatedDate BETWEEN '${data.start}' AND '${data.end}') AND Admission = '${data.AdmisionId}'"
        sql = `SELECT * FROM student WHERE InnitiatedDate BETWEEN ('${data.start}' AND '${data.end}') AND AdmissionManager = '${data.AdmisionId}'`;
        console.log(sql);
    } else if (data.Role == 4) {
        sql = `SELECT * FROM student WHERE InnitiatedDate BETWEEN ('${data.start}' AND '${data.end}') AND AdmissionManager = '${data.AdmisionId}'`;
    }

    await db.query(
        sql,
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(false, err);
            } else {
                console.log("students : ", res);
                result(true, res);
            }
        }
    );
}




// Admission.getAdmissionByAccountId = async function(accountId, result) {

//     await db.query(
//         "Select * from admission where AccountId = ?",
//         accountId,
//         function(err, admission) {

//             if (err) {

//                 result(true, err);
//             } else {
//                 if (admission.length > 0) {
//                     result(false, admission[0]);

//                 } else {
//                     result(true, null);
//                 }


//             }
//         }
//     );
// };


// Admission.updateProfile = async function(data, result) {
//     await db.query(
//         "UPDATE admission, account SET admission.FullName = ?, account.FullName = ?, admission.Email = ?, account.Email = ?, admission.Gender = ?, admission.Address = ? WHERE admission.AccountId = account.Id AND account.ID = ?", [data.FullName, data.FullName, data.Email, data.Email, data.Gender, data.Address, data.AccountId],
//         function(err, admission) {
//             if (err) {
//                 result(true, err);
//             } else {
//                 result(false, admission);
//             }
//         }
//     );
// };


// Admission.getListStudent = async function(data, result) {
//     console.log(data);

//     const year = data.year;
//     const semester = data.semester;
//     // const confirmed = data.confirmed;
//     const profile = data.profile;
//     const fee = data.fee;
//     const leadSoure = data.leadSoure;
//     const englishLevel = data.englishLevel;

//     let startMonth = 0;
//     let endMonth = 0;

//     switch (semester) {
//         case 'Spring':
//             startMonth = 1;
//             endMonth = 4;
//             break;
//         case 'Summer':
//             startMonth = 5;
//             endMonth = 8;
//             break;
//         case 'Fall':
//             startMonth = 9;
//             endMonth = 12;
//             break;
//         default:
//             break;
//     }
//     // `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
//     //     FROM student s
//     // INNER JOIN admission a ON s.Admission = a.Id

//     let sql = 'SELECT student.Id AS studentId, student.AccountId, student.FullName, student.Phone, student.Email, student.Majors, admission.FullName AS AdmissionName, student.EnoughProfile , admission.Id AS AdmissionId, payment.Status';
//     sql += ' FROM student';
//     sql += ' LEFT JOIN admission ON student.Admission = admission.Id';
//     sql += ' LEFT JOIN payment ON payment.StudentId = student.Id';


//     sql += ` WHERE student.Admission = '${data.Id}'`;



//     if (profile && profile.length > 0) {
//         for (let i = 0; i < profile.length; i++) {
//             if (i == 0) {
//                 sql += ` AND (student.EnoughProfile = '${profile[i]}'`;
//             } else {
//                 sql += ` OR student.EnoughProfile = '${profile[i]}'`;
//             }

//         }
//         sql += ')';
//     }

//     if (fee && fee.length > 0) {
//         for (let i = 0; i < fee.length; i++) {
//             if (i == 0) {
//                 sql += ` AND (payment.Status = '${fee[i]}'`;
//             } else {
//                 sql += ` OR payment.Status = '${fee[i]}'`;
//             }
//         }
//         sql += ')';

//     }

//     if (leadSoure && leadSoure.length > 0) {
//         for (let i = 0; i < leadSoure.length; i++) {
//             if (i == 0) {
//                 sql += ` AND (student.LeadSoure = '${leadSoure[i]}'`;
//             } else {
//                 sql += ` OR student.LeadSoure = '${leadSoure[i]}'`;
//             }
//         }
//         sql += ')';

//         // sql += ` AND student.LeadSoure = '${leadSoure}'`;
//     }


//     if (year) {
//         sql += ` AND YEAR(student.InnitiatedDate) = '${year}'`;
//     }



//     if (semester) {
//         sql += ` AND (MONTH(student.InnitiatedDate) BETWEEN ${startMonth} AND ${endMonth})`;
//     }

//     // if (confirmed) {
//     //     sql += `AND student.EnoughProfile = ${confirmed}`;
//     // }


//     // if (nguonHoSo) {
//     //     sql += `AND ho_so.nguon_ho_so = '${nguonHoSo}' `;
//     // }

//     // if (duPhi) {
//     //     sql += `AND phi.so_tien ${duPhi === 'true' ? '>' : '<='} 0 `;
//     // }


//     // //query by admission and semester

//     // if (!year) {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ?", [admission],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // } else if (!semester) {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ?", [admission, year],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // } else {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ? AND MONTH(DateCreated) BETWEEN ? AND ?", [admission, year, startMonth, endMonth],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // }

//     await db.query(sql, function(error, results) {
//         if (error) {
//             console.log("error: ", error);
//             result(true, error);

//         } else {
//             result(false, results);

//         }

//     });
// };



// Admission.getListStudentEnoughProfile = async function(data, result) {
//     console.log(data);

//     const year = data.year;
//     const semester = data.semester;
//     // const confirmed = data.confirmed;

//     const leadSoure = data.leadSoure;
//     const englishLevel = data.englishLevel;

//     let startMonth = 0;
//     let endMonth = 0;

//     switch (semester) {
//         case 'Spring':
//             startMonth = 1;
//             endMonth = 4;
//             break;
//         case 'Summer':
//             startMonth = 5;
//             endMonth = 8;
//             break;
//         case 'Fall':
//             startMonth = 9;
//             endMonth = 12;
//             break;
//         default:
//             break;
//     }
//     // `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
//     //     FROM student s
//     // INNER JOIN admission a ON s.Admission = a.Id

//     let sql = 'SELECT student.Id AS studentId, student.AccountId, student.FullName, student.Phone, student.Email, student.Majors, admission.FullName AS AdmissionName, student.EnoughProfile , admission.Id AS AdmissionId, payment.Status';
//     sql += ' FROM student';
//     sql += ' LEFT JOIN admission ON student.Admission = admission.Id';
//     sql += ' LEFT JOIN payment ON payment.StudentId = student.Id';


//     sql += ` WHERE student.Admission = '${data.Id}' AND student.EnoughProfile = '1' AND payment.Status = '1'`;


//     if (leadSoure && leadSoure.length > 0) {
//         for (let i = 0; i < leadSoure.length; i++) {
//             if (i == 0) {
//                 sql += ` AND (student.LeadSoure = '${leadSoure[i]}'`;
//             } else {
//                 sql += ` OR student.LeadSoure = '${leadSoure[i]}'`;
//             }
//         }
//         sql += ')';

//         // sql += ` AND student.LeadSoure = '${leadSoure}'`;
//     }


//     if (year) {
//         sql += ` AND YEAR(student.InnitiatedDate) = '${year}'`;
//     }



//     if (semester) {
//         sql += ` AND (MONTH(student.InnitiatedDate) BETWEEN ${startMonth} AND ${endMonth})`;
//     }

//     // if (confirmed) {
//     //     sql += `AND student.EnoughProfile = ${confirmed}`;
//     // }


//     // if (nguonHoSo) {
//     //     sql += `AND ho_so.nguon_ho_so = '${nguonHoSo}' `;
//     // }

//     // if (duPhi) {
//     //     sql += `AND phi.so_tien ${duPhi === 'true' ? '>' : '<='} 0 `;
//     // }


//     // //query by admission and semester

//     // if (!year) {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ?", [admission],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // } else if (!semester) {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ?", [admission, year],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // } else {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ? AND MONTH(DateCreated) BETWEEN ? AND ?", [admission, year, startMonth, endMonth],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // }

//     await db.query(sql, function(error, results) {
//         if (error) {
//             console.log("error: ", error);
//             result(true, error);

//         } else {
//             result(false, results);

//         }

//     });
// };


// Admission.getListStudentOutOfDate = async function(data, result) {
//     console.log(data);

//     const year = data.year;
//     const semester = data.semester;
//     // const confirmed = data.confirmed;
//     const profile = data.profile;

//     const leadSoure = data.leadSoure;
//     const englishLevel = data.englishLevel;

//     let startMonth = 0;
//     let endMonth = 0;

//     switch (semester) {
//         case 'Spring':
//             startMonth = 1;
//             endMonth = 4;
//             break;
//         case 'Summer':
//             startMonth = 5;
//             endMonth = 8;
//             break;
//         case 'Fall':
//             startMonth = 9;
//             endMonth = 12;
//             break;
//         default:
//             break;
//     }
//     // `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
//     //     FROM student s
//     // INNER JOIN admission a ON s.Admission = a.Id

//     let sql = 'SELECT student.Id AS studentId, student.AccountId, student.FullName, student.Phone, student.Email, student.Majors, admission.FullName AS AdmissionName, student.EnoughProfile , admission.Id AS AdmissionId, payment.Status, scholarship.Status AS ScholarshipStatus,  scholarship.Deadline';
//     sql += ' FROM student';
//     sql += ' LEFT JOIN admission ON student.Admission = admission.Id';
//     sql += ' LEFT JOIN payment ON payment.StudentId = student.Id';
//     sql += ' LEFT JOIN scholarship ON scholarship.StudentId = student.Id';


//     sql += ` WHERE student.Admission = '${data.Id}' AND scholarship.Deadline < CURDATE() AND student.EnoughProfile = '0' AND payment.Status = '0'`;



//     if (profile && profile.length > 0) {
//         for (let i = 0; i < profile.length; i++) {
//             if (i == 0) {
//                 sql += ` AND (student.EnoughProfile = '${profile[i]}'`;
//             } else {
//                 sql += ` OR student.EnoughProfile = '${profile[i]}'`;
//             }

//         }
//         sql += ')';
//     }



//     if (leadSoure && leadSoure.length > 0) {
//         for (let i = 0; i < leadSoure.length; i++) {
//             if (i == 0) {
//                 sql += ` AND (student.LeadSoure = '${leadSoure[i]}'`;
//             } else {
//                 sql += ` OR student.LeadSoure = '${leadSoure[i]}'`;
//             }
//         }
//         sql += ')';

//         // sql += ` AND student.LeadSoure = '${leadSoure}'`;
//     }


//     if (year) {
//         sql += ` AND YEAR(student.InnitiatedDate) = '${year}'`;
//     }



//     if (semester) {
//         sql += ` AND (MONTH(student.InnitiatedDate) BETWEEN ${startMonth} AND ${endMonth})`;
//     }

//     // if (confirmed) {
//     //     sql += `AND student.EnoughProfile = ${confirmed}`;
//     // }


//     // if (nguonHoSo) {
//     //     sql += `AND ho_so.nguon_ho_so = '${nguonHoSo}' `;
//     // }

//     // if (duPhi) {
//     //     sql += `AND phi.so_tien ${duPhi === 'true' ? '>' : '<='} 0 `;
//     // }


//     // //query by admission and semester

//     // if (!year) {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ?", [admission],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // } else if (!semester) {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ?", [admission, year],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // } else {
//     //     await db.query(
//     //         "Select * from student WHERE Admission = ? AND YEAR(DateCreated) = ? AND MONTH(DateCreated) BETWEEN ? AND ?", [admission, year, startMonth, endMonth],
//     //         function(err, res) {
//     //             if (err) {
//     //                 console.log("error: ", err);
//     //                 result(false, err);
//     //             } else {
//     //                 console.log("student : ", res);
//     //                 result(true, res);
//     //             }
//     //         }
//     //     );
//     // }

//     await db.query(sql, function(error, results) {
//         if (error) {
//             console.log("error: ", error);
//             result(true, error);

//         } else {
//             result(false, results);

//         }

//     });
// };
module.exports = Dashboard;