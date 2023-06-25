const express = require("express");

const eventsRouter = express.Router();
const {
    getAllEvents,
    getStudentsToEvent,
    getStudentEvent,
    addStudentToEvent,
    deleteStudentEvent,
    getEventsByStudent,
    confirmEvent,
    createNewEvent,
    removeEvent,
    getEventById
} = require("../controllers/events/events.controller");





eventsRouter.post(
    "/createEvent", createNewEvent
);

eventsRouter.post(
    "/getStudentsToEvent",
    getStudentsToEvent
);

eventsRouter.post(
    "/getStudentsEvent",
    getStudentEvent
);

eventsRouter.get("/getEventById/:Id", getEventById);

eventsRouter.post(
    "/addStudentsEvent/:id",
    addStudentToEvent
);


eventsRouter.post(
    "/deleteStudentEvent/:id",
    deleteStudentEvent
);

eventsRouter.get(
    "/events", getAllEvents
);

eventsRouter.delete(
    "/deleteEvent/:Id", removeEvent
);


eventsRouter.put(
    "/event"
);

eventsRouter.get(
    "/eventsByStudent/:ID", getEventsByStudent
);

eventsRouter.put(
    "/confirmEvent", confirmEvent
);



module.exports = { eventsRouter };