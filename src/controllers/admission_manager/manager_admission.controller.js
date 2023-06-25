const express = require('express')

const multer = require('multer')
const path = require('path')
const fs = require('fs') //filesystem để xử lý file, đọc file, ghi file như private key
const hbs = require('hbs')
const util = require("util");
const Fee = require('../../models/fee.model');

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');




const app = express()

app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))


// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);



var { prepareResponse } = require('../../common/response');
const { get } = require('http')

//add Fee for student
const addFee = async(req, res) => {
    const dateObj = new Date(req.body.SchoolYear);

    dateObj.setDate(dateObj.getDate() + 1);

    // Định dạng lại đối tượng ngày tháng thành chuỗi ngày tháng năm
    const formattedDate = dateObj.toISOString().split('-')[0];
    console.log(dateObj);

    let newFee = new Fee({
        Id: uuidv4(),
        SchoolYear: formattedDate,
        Fee: req.body.Fee,
        FeeType: req.body.FeeType,
    });

    Fee.create(newFee, function(status, fee) {
        if (status) {
            return prepareResponse(res, 201, 'Add Fee Successfully', { fee: fee });

        } else {
            return prepareResponse(res, 400, 'Add Fee Failed', { error: fee });

        }
    });
}

//update Fee for student
const updateFee = async(req, res) => {

    const dateObj = new Date(req.body.SchoolYear);

    dateObj.setDate(dateObj.getDate() + 1);

    console.log(dateObj);


    // Định dạng lại đối tượng ngày tháng thành chuỗi ngày tháng năm
    const formattedDate = dateObj.toISOString().split('-')[0];

    let fee = new Fee({
        Id: req.params.Id,
        SchoolYear: formattedDate,
        Fee: req.body.Fee,
        FeeType: req.body.FeeType,
    });
    console.log(fee);
    Fee.updateById(fee, function(status, fee) {
        if (status) {
            return prepareResponse(res, 201, 'Update fee Successfully', { fee: fee });

        } else {

            return prepareResponse(res, 400, 'Update fee Failed', { error: fee });
        }
    });
}

//remove fee for student
const removeFee = async(req, res) => {
    var id = req.params.Id;
    Fee.remove(id, function(status, fee) {
        if (status) {
            return prepareResponse(res, 201, 'Remove fee Successfully', { fee: fee });

        } else {
            return prepareResponse(res, 400, 'Remove fee Failed', err);

        }
    });

}

//get all fee of student
const getFee = async(req, res) => {
    var Id = req.params.Id;
    Fee.getById(Id, function(status, fee) {
        if (status) { return prepareResponse(res, 201, 'Get fee Successfully', { fee: fee }); } else {
            return prepareResponse(res, 400, 'Get fee Failed', err);

        }
    });
}


const getAllFees = async(req, res) => {

    Fee.getAll(function(status, fee) {
        if (status) {
            console.log(fee);
            return prepareResponse(res, 201, 'Get fees Successfully', { fee: fee })
        } else {
            return prepareResponse(res, 400, 'Get fees Failed', { err: fee });

        }
    });
}

module.exports = { addFee, updateFee, removeFee, getFee, getAllFees }