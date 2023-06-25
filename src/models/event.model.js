const db = require('../DB/connect.js');

const Event = function(event) {
    this.Id = event.Id;
    this.Name = event.Name;
    this.StartDate = event.StartDate;
    this.EndDate = event.EndDate;
    this.Expense = event.Expense;
    this.Tickets = event.Tickets;
    this.Description = event.Description;

}

Event.updateConfirmEventByStudent = async function(studentId, eventId, status, result) {
    console.log("status" + studentId);
    await db.query("UPDATE event_student SET Confirm = ? WHERE StudentID = ? AND EventID = ?", [status, studentId, eventId], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });

}





Event.create = async function(newEvent, result) {
    await db.query("INSERT INTO event SET ?", newEvent, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log(res);
            result(true, res);
        }
    });
}

Event.getAll = async function(result) {
    await db.query("Select * from event", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log('event : ', res);
            result(true, res);
        }
    });
}

Event.getById = async function(eventId, result) {
    await db.query("Select * from event where Id = ? ", eventId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(true, err);
        } else {
            result(false, res[0]);
        }
    });
}



Event.getEventsByStudent = async function(studentId, result) {
    await db.query("SELECT e.Description, e.StartDate, e.EndDate, e.Id, e.Name, es.StudentID, es.EventID, es.Checkin, es.Checkout, es.Confirm FROM event e INNER JOIN event_student es ON es.EventID = e.Id WHERE es.StudentID = ?", studentId, function(err, res) {
        if (err) {

            result(false, err);
        } else {

            result(true, res);
        }
    });
}

Event.updateById = async function(event, result) {

    await db.query("UPDATE event SET Name = ?, StartDate = ?, EndDate = ?, Expense = ?, Tickets = ?, Description WHERE Id = ?", [event.Name, event.StartDate, event.EndDate, event.Expense, event.Tickets, event.Description, event.Id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}

Event.removeEvent = async function(id, result) {
    // remove event_student by id event
    await db.query("DELETE FROM event WHERE Id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}


Event.removeStudentEvent = async function(studentId, eventID, result) {
   
    await db.query("DELETE FROM event_student WHERE EventID = ? AND StudentID = ?", [eventID, studentId], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}





Event.Students_to_Event = async function(listStudentID, eventID, result) {
    //insert list student to event
    let promises = [];

    for (let i = 0; i < listStudentID.length; i++) {
        console.log("okee");
        let promise = new Promise((resolve, reject) => {
            db.query("INSERT INTO event_student SET ?", { StudentID: listStudentID[i].Id, EventID: eventID, Checkin: false, Checkout: false, Confirm: false }, function(err, res) {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    console.log(res);
                    resolve(res);
                }
            });
        });
        promises.push(promise);
    }

    Promise.all(promises)
        .then((results) => {
            result(true, results);
        })
        .catch((error) => {
            result(false, error);
        });
}


Event.update_event_student = async function(data, result) {
    await db.query("UPDATE event_student SET Checkin = ?, Checkout = ?, Confirm = ?", [data.Checkin, data.Checkout, data.Confirm], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}


Event.get_all_even_student = async function(data, result) {
    let sql = ''
    if (data.Role == 2) {
        sql = `SELECT s.Id, s.Email, s.FullName, s.Majors, a.FullName AS Admission, s.Phone, s.EnoughProfile, s.Majors, es.EventID
        FROM student s
        INNER JOIN admission a ON s.Admission = a.Id
        INNER JOIN event_student es ON s.Id = es.StudentID
        INNER JOIN event e ON es.EventID = e.Id
        WHERE e.Id = '${data.eventID}' AND s.Admission = '${data.AdId}'`
    } else if (data.Role == 3) {

        sql = `SELECT s.Id, s.Email, s.FullName, s.Majors, am.FullName AS Admission, s.Phone, s.EnoughProfile, s.Majors, es.EventID
        FROM student s
        INNER JOIN admission_manager am ON s.AdmissionManager = am.Id
        INNER JOIN event_student es ON s.Id = es.StudentID
        INNER JOIN event e ON es.EventID = e.Id
        WHERE e.Id = '${data.eventID}' AND s.AdmissionManager = '${data.AdId}'`
        console.log(sql);

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




module.exports = Event;