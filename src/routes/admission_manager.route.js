const express = require("express");

const {
    addFee,
    updateFee,
    removeFee,
    getFee,
    getAllFees

} = require("../controllers/admission_manager/manager_admission.controller");




const managerRouter = express.Router();


managerRouter.get("/listFee", getAllFees)
managerRouter.get("/fee/:Id", getFee)

managerRouter.post("/addFee", addFee)

managerRouter.post("/updateFee/:Id", updateFee)

managerRouter.delete("/deleteFee/:Id", removeFee)


module.exports = { managerRouter };