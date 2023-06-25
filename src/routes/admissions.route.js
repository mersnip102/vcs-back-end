const express = require("express");
const {
    createNewStudent,
    homeAdmission,
    addScholarship,
    removeScholarship,
    updateScholarship,
    getScholarship,
    getAllStuentByAdmission,
    allStudents,
    getListMessageByRoom,
    removeMessage,
    getListStudent,
    getListStudentOutOfDate,
    getListStudentEnoughProfile
} = require("../controllers/admission/admissions.controller");

const { sendEmail } = require("../controllers/admission/sendEmail.controller");

const admissionsRouter = express.Router();

admissionsRouter.post(
    "/newStudent",
    createNewStudent,
);

admissionsRouter.post(
    "/addScholarship",
    addScholarship,
);

admissionsRouter.put(
    "/updateScholarship",
    updateScholarship,
);

admissionsRouter.get("/getAllStuentByAdmission/:Id", getAllStuentByAdmission)

admissionsRouter.get(
    "/allStudents", allStudents,
);

admissionsRouter.delete(
    "/removeScholarship",
    removeScholarship,
);

admissionsRouter.post(
    "/send-email", sendEmail
);

admissionsRouter.get(
    "/getScholarship/:Id",
    getScholarship,
);

admissionsRouter.get(
    "/admission", homeAdmission,
);




admissionsRouter.get(
    "/getListMessageByRoom/:Room", getListMessageByRoom);

admissionsRouter.delete(
    "/removeMessage/:Id", removeMessage);



admissionsRouter.post(
    "/getListStudent", getListStudent)

admissionsRouter.post(
    "/getListStudentEnoughProfile", getListStudentEnoughProfile)

admissionsRouter.post(
    "/getListStudentOutOfDate", getListStudentOutOfDate)

module.exports = { admissionsRouter };