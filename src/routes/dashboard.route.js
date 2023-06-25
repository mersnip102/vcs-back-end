const express = require("express");
const {
    getDashboard
} = require("../controllers/dashboard/dashboard.controller");



const dashboardRouter = express.Router();

dashboardRouter.get(
    "/getDashboard",
    getDashboard,
);

// dashboardRouter.post(
//     "/addScholarship",
//     addScholarship,
// );

// dashboardRouter.put(
//     "/updateScholarship",
//     updateScholarship,
// );

// dashboardRouter.get("/getAllStuentByAdmission/:Id", getAllStuentByAdmission)

// dashboardRouter.get(
//     "/allStudents", allStudents,
// );

// dashboardRouter.delete(
//     "/removeScholarship",
//     removeScholarship,
// );

// dashboardRouter.post(
//     "/send-email", sendEmail
// );

// dashboardRouter.get(
//     "/getScholarship/:Id",
//     getScholarship,
// );

// dashboardRouter.get(
//     "/admission", homeAdmission,
// );




// dashboardRouter.get(
//     "/getListMessageByRoom/:Room", getListMessageByRoom);

// dashboardRouter.delete(
//     "/removeMessage/:Id", removeMessage);



// dashboardRouter.post(
//     "/getListStudent", getListStudent)

// dashboardRouter.post(
//     "/getListStudentEnoughProfile", getListStudentEnoughProfile)

// dashboardRouter.post(
//     "/getListStudentOutOfDate", getListStudentOutOfDate)

module.exports = { dashboardRouter };