const express = require('express')

const multer = require('multer')
const path = require('path')
const hbs = require('hbs')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

const { prepareResponse } = require('../../common/response')
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);


var Event = require('../../models/event.model');
var Student = require('../../models/student.model');


const confirmEvent = async(req, res) => {

    try {
        var eventId = req.body.eventId;
        var status = req.body.status;
        var studentId = req.body.studentId;
        Event.updateConfirmEventByStudent(studentId, eventId, status, function(status, event) {
            if (status) {
                return prepareResponse(res, 200, 'Confirm Event Successfully', { event: event });
            } else {
                return prepareResponse(res, 400, 'Confirm Event Failed', { event: event });
            }
        });
    } catch (error) {
        return prepareResponse(res, 500, 'Confirm Event Failed', error);
    }
}




const addStudentToEvent = async(req, res) => {
    try {
        var listStudentId = req.body.listStudent;

        var eventId = req.params.id;

        await Event.Students_to_Event(listStudentId, eventId, function(status, event) {
            if (status) {
                return prepareResponse(res, 200, 'Add Student to Event Successfully', { event: event });
            } else {
                return prepareResponse(res, 400, 'Add Student to Event Failed', { event: event });
            }
        });
    } catch (error) {
        return prepareResponse(res, 500, 'Add Student to Event Failed', error);
    }
}


const deleteStudentEvent = async(req, res) => {
    try {
        var studentId = req.body.studentId[0].Id;

        var eventId = req.params.id;

        Event.removeStudentEvent(studentId, eventId, function(status, event) {
            if (status) {
                return prepareResponse(res, 200, 'Remove Student to Event Successfully', { event: event });
            } else {
                return prepareResponse(res, 400, 'Remove Student to Event Failed', { event: event });
            }
        });
    } catch (error) {
        return prepareResponse(res, 500, 'Remove Student to Event Failed', error);
    }
}





const getStudentsToEvent = async(req, res) => {
    try {

        const data = req.body;


        Student.getStudentsToEvent(data, function(status, students) {
            if (status) {
                console.log(students)
                return prepareResponse(res, 200, 'Get Students Successfully', { students: students });

            } else {
                return prepareResponse(res, 400, 'Get Students Failed', { students: students });
            }
        });
    } catch (error) {
        return prepareResponse(res, 500, 'Get Students Failed', error);
    }
}

const getEventsByStudent = async(req, res) => {
    try {
        var studentID = req.params.ID;

        Event.getEventsByStudent(studentID, function(status, events) {
            if (status) {

                return prepareResponse(res, 200, 'Get Events Successfully', { events: events });
            } else {
                return prepareResponse(res, 400, 'Get Events Failed', { events: events });
            }
        });
    } catch (error) {
        return prepareResponse(res, 500, 'Get Events Failed', error);
    }
}








const getAllEvents = async(req, res) => {
    try {
        await Event.getAll(function(srtatus, events) {
            if (srtatus) {
                console.log(events)
                return prepareResponse(res, 200, 'Get events successfully', { events: events });


            } else {
                console.log(events)
                return prepareResponse(res, 400, 'Get events failed', events);

            }

        })
    } catch (error) {
        return prepareResponse(res, 500, 'Get events failed', error);
    }
}



// index create new event
const indexCreateNewEvent = async(req, res) => {
    let listStudent = await Student.getAll();
    res.render('events/createNewEvent', { listStudent: listStudent })
}

// const addStudentToEvent = async(req, res) => {
//     try {
//         const { studentID, eventID, admission } = req.body

//         const listStudent = await Student.getAllStuentByAdmission(admission, function(srtatus, students) {
//             if (srtatus) {
//                 console.log(students)
//                 return prepareResponse(res, 200, 'Get students successfully', { students: students });
//             } else {
//                 console.log(students)
//                 return prepareResponse(res, 400, 'Get students failed', students);
//             }
//         })

//         let id = req.params.id;

//         let listStudentSelected = await Event.get_event_student(id);
//         res.render('events/addStudentToEvent', { listStudent: listStudent, listStudentSelected: listStudentSelected, id: id })
//     } catch (error) {
//         console.log(error)
//     }
// }


const getStudentEvent = async(req, res) => {
    try {
        var data = req.body;

        Event.get_all_even_student(data, function(srtatus, students) {
            if (srtatus) {
                console.log(students)
                return prepareResponse(res, 200, 'Get students_ eventsuccessfully', { students: students });
            } else {
                console.log(students)
                return prepareResponse(res, 400, 'Get students_events failed', { students: students });
            }


        })
    } catch (error) {
        return prepareResponse(res, 500, 'Get students_events failed', error);
    }
}




const removeStudenstEvent = async(req, res) => {
    try {
        let id = req.params.id;
        let listStudent = await Student.getAll();
        let listStudentSelected = await Event.get_event_student(id);
        res.render('events/addStudentToEvent', { listStudent: listStudent, listStudentSelected: listStudentSelected, id: id })
    } catch (error) {
        console.log(error)
    }
}



const createNewEvent = async(req, res) => {
    // const Event = function(event) {
    //     this.Id = event.Id;
    //     this.Name = event.Name;
    //     this.StartDate = event.StartDate;
    //     this.EndDate = event.EndDate;
    //     this.Expense = event.Expense;
    //     this.Tickets = event.Tickets;
    //     this.Description = event.Description;

    // }
    console.log(req.body)
    let eventData = new Event({
        Id: uuidv4(),
        Name: req.body.Name,
        StartDate: new Date(req.body.StartDate),
        EndDate: new Date(req.body.EndDate),
        Expense: req.body.Expense,
        Tickets: req.body.Tickets,
        Description: req.body.Description,

    })

    // //get list student selected from all students
    // let listStudent = req.body.listStudent;



    //add event
    Event.create(eventData, function(status, event) {
        if (!status) {
            return prepareResponse(res, 400, 'Add event failed', event);
        } else {
            //add event_student

            //Students_to_Event

            // Event.Students_to_Event(listStudent, eventData.Id, function(status, event_student) {
            //     if (status) {
            //         return prepareResponse(res, 200, 'Add event successfully', { event: eventData, student: listStudent });

            //     } else {
            //         return prepareResponse(res, 400, 'Add event failed', event_student);
            //     }
            // });
            return prepareResponse(res, 200, 'Add event successfully', { event: event });



        }
    });
}

// selected function
// const selected = async(req, res) => {

//     let id = req.params.id;

//     Event.getById(id, function(err, event) {

//         if (err) {
//             res.send(err);
//         } else {
//             Student.getAll(function(err, students) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     Event.get_event_student(id, function(err, event_students) {
//                         if (err) {
//                             res.send(err);
//                         } else {
//                             let listStudent = [];
//                             for (let i = 0; i < students.length; i++) {
//                                 let student = students[i];
//                                 let selected = false;
//                                 for (let j = 0; j < event_students.length; j++) {
//                                     let event_student = event_students[j];
//                                     if (student.id == event_student.student_id) {
//                                         selected = true;
//                                         break;
//                                     }
//                                 }
//                                 listStudent.push({ id: student.id, name: student.name, selected: selected });
//                             }
//                             res.render('event/selected', { event: event, listStudent: listStudent });
//                         }
//                     });
//                 }
//             });
//         }
//     })
// }

//get an event
const getEvent = async(req, res) => {
    let id = req.params.id;
    //get list student
    let listStudent = await Student.getAll();
    //get event
    let event = await Event.getById(id);
    //get event_student
    let event_students = await Event.get_event_student(id);

    //send data to view
    res.render('events/updateEvent', { event: event, listStudent: listStudent, event_students: event_students })

}

const homeEvents = async(req, res) => {
    Event.getAll(function(err, events) {
        if (err) {
            res.send(err);
        } else {
            res.render('event/index', { events: events });
        }
    });
}

//update event
const updateEvent = async(req, res) => {
    let event = new Event({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time_zone: req.body.time_zone,
        expense: req.body.expense,
        tickets: req.body.tickets,
        description: req.body.description
    })

    //get list student selected from all students
    let listStudent = req.body.listStudent;
    let listStudentSelected = [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].selected == true) {
            listStudentSelected.push(listStudent[i]);
        }
    }

    //update event
    Event.updateById(event, function(err, event) {
        if (err) {
            res.send(err)
        } else {
            //remove all event_student by event_id
            Event.removeEventStudent(event.id, function(err, event) {
                if (err) {
                    res.send(err);
                } else {
                    //add event_student
                    listStudentSelected.forEach(student => {
                        Event.create_event_student(event, student, function(err, event) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send(prepareResponse(event));
                            }
                        });

                    });

                }
            });


        }
    })
}

const getEventById = async(req, res) => {
    let id = req.params.Id;
    Event.getById(id, function(err, event) {
        if (err) {
            return prepareResponse(res, 400, "Get event failed", { err: err });
        } else {
            return prepareResponse(res, 200, "Get event successfully", { event: event });
        }
    });
}


//remove event
const removeEvent = async(req, res) => {
    let id = req.params.Id;
    console.log(id)

    Event.removeStudentEvent(id, function(status, event) {
        if (!status) {
            return prepareResponse(res, 400, "Delete failed", { err: event });
        } else {
            Event.removeEvent(id, function(status, event) {
                if (!status) {

                    return prepareResponse(res, 400, "Delete failed", { err: event });
                } else {
                    return prepareResponse(res, 200, "Delete OK", { event: event });
                }
            });
        }
    });
}

module.exports = { getEventById, confirmEvent, getEventsByStudent, deleteStudentEvent, addStudentToEvent, getStudentEvent, getStudentsToEvent, homeEvents, createNewEvent, updateEvent, removeEvent, getAllEvents }