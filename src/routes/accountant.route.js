const express = require("express");

const {
    addFee,
    updateFee,
    removeFee,
    getFee,
    getAllFees

} = require("../controllers/admission_manager/manager_admission.controller");


const {
    getStudentById,
    handleUpload,
    getAStudent,
    addPayment,
    updatePayment,
    removePayment,
    getAllPayment,
    testUpdateStudent,
    createNewStudent,

    getPaymentById,
    updateAllowEditing,
    updateEnoughProfile

} = require("../controllers/student/student.controller.js");

const { authenticateJWT } = require("../middleware/auth.middleware");


const accountantRouter = express.Router();


accountantRouter.get("/listFee", getAllFees)
accountantRouter.get("/fee/:Id", getFee)

accountantRouter.post("/addFee", addFee)

accountantRouter.put("/updateFee/:Id", updateFee)

accountantRouter.delete("/deleteFee/:Id", removeFee)


accountantRouter.get("/payment", authenticateJWT, getAllPayment)

accountantRouter.post("/addPayment", addPayment)

accountantRouter.put("/updatePayment", updatePayment)

accountantRouter.get("/payment/:Id", getPaymentById)

accountantRouter.delete("/deletePayment/:Id", removePayment)


module.exports = { accountantRouter };