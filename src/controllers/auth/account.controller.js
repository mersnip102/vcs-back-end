const express = require('express')
const app = express()
const wkx = require('wkx');


app.use(express.static('assets'))
var jwt = require('../../jwt/tokenUtils')
var { prepareResponse } = require('../../common/response.js')
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

var PhanQuyen = require("../../models/phan_quyen.model");
const e = require('express');
const Account = require('../../models/account.model');


const getAllAccount = async(req, res) => {
   
    PhanQuyen.getAll(async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
           
        } else {
            console.log(result);
            for(let i = 0; i < result.length; i++){

                if(result[i].status == 1){
                    result[i].status = "Hoạt động"
                }else if(result[i].status == 0){
                    result[i].status = "Không hoạt động"
                }

                delete result[i].password

                
            }
            console.log(result);
            
            return prepareResponse(res, 200, "Get all bao_cao_hinh_anh success", {data: result})
        }
    });
}


const createAccount = async(req, res) => {
    var data = req.body;
    console.log(data);
    // PhanQuyen.createAccount(data, async function(err, result) {
    //     if (err) {
    //         return prepareResponse(res, 400, "Tạo tài khoản thất bại", result)
            
    //     } else {
    //         return prepareResponse(res, 200, "Tạo tài khoản thành công", { data: result })
            
    //     }
    // });
}

const updateStatusBaoCaoHinhAnh = async(req, res) => {
    let data = req.body;
    // let id = req.body.id;
    console.log(req.body);
    
    PhanQuyen.updateStatus(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Chỉnh sửa báo cáo hình ảnh thất bại", result)
            
        } else {
            return prepareResponse(res, 200, "Chỉnh sửa báo cáo hình ảnh thành công", { data: result })
            
        }
    });
}

const deleteAccount = async(req, res) => {
    var id = req.params;
    console.log(data);
    PhanQuyen.deleteAccount(id, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Xóa tài khoản thất bại", result)
            
        } else {
            return prepareResponse(res, 200, "Xóa tài khoản thành công", { data: result })
            
        }
        
    });
}

const getAccountById = async(req, res) => {
    var id = req.params;
    
    PhanQuyen.getById(id, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Lấy thông tin thất bại", result)
        } else {
           
            

           
             delete   result[0].password
           
            

            return prepareResponse(res, 200, "Lấy thông tin thành công", { data: result })
        }
    });
}
















module.exports = {
    getAllAccount,
    createAccount,
    updateStatusBaoCaoHinhAnh,
    deleteAccount,
    getAccountById

}