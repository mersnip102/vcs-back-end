const db = require('../DB/connect.js');

const AdmissionManager = function(admission) {

    this.Id = admission.Id;

    this.FullName = admission.FullName;

    this.Email = admission.Email;
    this.Phone = admission.Phone;
    this.Address = admission.Address
    this.InnitiatedDate = admission.InnitiatedDate;
    this.AccountId = admission.AccountId;

};



AdmissionManager.getAdmissionManagerByAccountId = async function(accountId, result) {

    await db.query(
        "Select * from admission_manager where AccountId = ?",
        accountId,
        function(err, admissionManager) {

            if (err) {

                result(true, err);
            } else {
                if (admissionManager.length > 0) {
                    result(false, admissionManager[0]);
                } else {
                    result(true, null);
                }


            }
        }
    );
};

AdmissionManager.updateProfile = async function(data, result) {
    await db.query(
        "UPDATE admission_manager, account SET admission_manager.FullName = ?, account.FullName = ?, admission_manager.Email = ?, account.Email = ?, admission_manager.Gender = ?, admission_manager.Address = ? WHERE admission_manager.AccountId = account.Id AND account.ID = ?", [data.FullName, data.FullName, data.Email, data.Email, data.Gender, data.Address, data.AccountId],
        function(err, admission_manager) {
            if (err) {
                result(true, err);
            } else {
                result(false, admission_manager);
            }
        }
    );
};



AdmissionManager.getListStudent = async function(data, result) {
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


    sql += ` WHERE student.AdmissionManager = '${data.Id}'`;



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



AdmissionManager.getListStudentEnoughProfile = async function(data, result) {
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


    sql += ` WHERE student.AdmissionManager = '${data.Id}' AND student.EnoughProfile = '1' AND payment.Status = '1'`;


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


AdmissionManager.getListStudentOutOfDate = async function(data, result) {
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


    sql += ` WHERE student.AdmissionManager = '${data.Id}' AND scholarship.Deadline < CURDATE() AND student.EnoughProfile = '0' AND payment.Status = '0'`;



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






module.exports = AdmissionManager;

// const Event = function(event) {
//     this.Id = event.Id;
//     this.Name = event.Name;
//     this.StartDate = event.StartDate;
//     this.EndDate = event.EndDate;
//     this.Expense = event.Expense;
//     this.Tickets = event.Tickets;
//     this.Description = event.Description;

// }

// Event.updateConfirmEventByStudent = async function(studentId, eventId, status, result) {
//     console.log("status" + studentId);
//     await db.query("UPDATE event_student SET Confirm = ? WHERE StudentID = ? AND EventID = ?", [status, studentId, eventId], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });

// }





// Event.create = async function(newEvent, result) {
//     await db.query("INSERT INTO event SET ?", newEvent, function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             console.log(res);
//             result(true, res);
//         }
//     });
// }

// Event.getAll = async function(result) {
//     await db.query("Select * from event", function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             console.log('event : ', res);
//             result(true, res);
//         }
//     });
// }

// Event.getById = async function(eventId, result) {
//     await db.query("Select * from event where Id = ? ", eventId, function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });
// }



// Event.getEventsByStudent = async function(studentId, result) {
//     await db.query("SELECT e.Description, e.Id, e.Name, es.StudentID, es.EventID, es.Checkin, es.Checkout, es.Confirm FROM event e INNER JOIN event_student es ON es.EventID = e.Id WHERE es.StudentID = ?", studentId, function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });
// }

// Event.updateById = async function(event, result) {

//     await db.query("UPDATE event SET Name = ?, StartDate = ?, EndDate = ?, Expense = ?, Tickets = ?, Description WHERE Id = ?", [event.Name, event.StartDate, event.EndDate, event.Expense, event.Tickets, event.Description, event.Id], function(err, res) {

//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });
// }

// Event.removeEvent = async function(id, result) {
//     // remove event_student by id event
//     await db.query("DELETE FROM event WHERE Id = ?", [id], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });
// }


// Event.removeStudentEvent = async function(studentID, eventID, result) {
//     // remove event_student by id event

//     await db.query("DELETE FROM event_student WHERE StudentID = ? and EventID = ?", [studentID, eventID], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });
// }



// Event.Students_to_Event = async function(listStudentID, eventID, result) {

//     //insert list student to event
//     let promises = [];

//     for (let i = 0; i < listStudentID.length; i++) {
//         console.log(listStudentID[i].Id);
//         let promise = new Promise((resolve, reject) => {
//             db.query("INSERT INTO event_student SET ?", { StudentID: listStudentID[i].Id, EventID: eventID, Checkin: false, Checkout: false, Confirm: false }, function(err, res) {
//                 if (err) {
//                     console.log("error: ", err);
//                     reject(err);
//                 } else {
//                     console.log(res);
//                     resolve(res);
//                 }
//             });
//         });
//         promises.push(promise);
//     }

//     Promise.all(promises)
//         .then((results) => {
//             result(true, results);
//         })
//         .catch((error) => {
//             result(false, error);
//         });
// }


// Event.update_event_student = async function(data, result) {
//     await db.query("UPDATE event_student SET Checkin = ?, Checkout = ?, Confirm = ?", [data.Checkin, data.Checkout, data.Confirm], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(false, err);
//         } else {
//             result(true, res);
//         }
//     });
// }


// Event.get_all_even_student = async function(eventId, result) {



//     await db.query(
//         `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission
//         FROM student s
//         INNER JOIN account a ON s.Admission = a.ID
//         INNER JOIN event_student es ON s.Id = es.StudentID
//         INNER JOIN event e ON es.EventID = e.Id
//         WHERE e.Id = '${eventId}'`,
//         function(err, res) {
//             if (err) {
//                 console.log("error: ", err);
//                 result(false, err);
//             } else {
//                 console.log("students : ", res);
//                 result(true, res);
//             }
//         }
//     );
// }




// module.exports = Event;