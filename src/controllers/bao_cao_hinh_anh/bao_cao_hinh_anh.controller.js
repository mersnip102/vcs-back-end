const express = require('express')
const app = express()

app.use(express.static('assets'))
var jwt = require('../../jwt/tokenUtils')

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

var Account = require("../../models/account.model");
var ImageReport = require("../../models/bao_cao_hinh_anh.model");


const getAllBaoCaoHinhAnh = async(req, res) => {
    ImageReport.getAll(async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
           
        } else {
            return prepareResponse(res, 200, "Get all bao_cao_hinh_anh success", { bao_cao_hinh_anh: result })
        }
    });
}


const createNewBaoCaoHinhAnh = async(req, res) => {
    var data = req.body;
    console.log(data);
    ImageReport.create(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
            
        } else {
            return prepareResponse(res, 200, "Create bao_cao_hinh_anh success", { bao_cao_hinh_anh: result })
            
        }
    });
}

const updateBaoCaoHinhAnh = async(req, res) => {
    var data = req.body;
    console.log(data);
    ImageReport.updateById(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
            
        } else {
            return prepareResponse(res, 200, "Update bao_cao_hinh_anh success", { bao_cao_hinh_anh: result })
            
        }
    });
}

const deleteBaoCaoHinhAnh = async(req, res) => {
    var data = req.body;
    console.log(data);
    ImageReport.delete(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
            
        } else {
            return prepareResponse(res, 200, "Delete bao_cao_hinh_anh success", { bao_cao_hinh_anh: result })
            
        }
    });
}

const getBaoCaoHinhAnhById = async(req, res) => {
    var data = req.body;
    console.log(data);
    ImageReport.getById(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
        } else {
            return prepareResponse(res, 200, "Get bao_cao_hinh_anh by id success", { bao_cao_hinh_anh: result })
        }
    });
}
















module.exports = {
    getAllBaoCaoHinhAnh,
    createNewBaoCaoHinhAnh,
    updateBaoCaoHinhAnh,
    deleteBaoCaoHinhAnh,
    getBaoCaoHinhAnhById

}