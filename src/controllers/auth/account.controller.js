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

                
            }
            console.log(result);
            
            return prepareResponse(res, 200, "Get all bao_cao_hinh_anh success", {data: result})
        }
    });
}


const createNewBaoCaoHinhAnh = async(req, res) => {
    var data = req.body;
    console.log(data);
    PhanQuyen.create(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
            
        } else {
            return prepareResponse(res, 200, "Create bao_cao_hinh_anh success", { bao_cao_hinh_anh: result })
            
        }
    });
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

const deleteBaoCaoHinhAnh = async(req, res) => {
    var data = req.params;
    console.log(data);
    PhanQuyen.delete(data.id, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Xóa báo cáo hình ảnh thất bại", result)
            
        } else {
            return prepareResponse(res, 200, "Xóa báo cáo hình ảnh thành công", { bao_cao_hinh_anh: result })
            
        }
    });
}

const getBaoCaoHinhAnhById = async(req, res) => {
    var data = req.params;
    console.log(data);
    PhanQuyen.getById(data.id, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Lấy thông tin thất bại", result)
        } else {
           
            if(result[0].geo && result[0].geo != null && result[0].geo != undefined && result[0].geo != ''){
                const buffer = Buffer.from(result[0].geo, 'hex');
                const geometry = wkx.Geometry.parse(buffer);
                const geojson = geometry.toGeoJSON();
                
                result[0].geo = {}
                result[0].geo.lat =  geojson.coordinates[0]
                result[0].geo.lng =  geojson.coordinates[1]
                

                
            }

            if(result[0].status == 1){
                result[0].status = "Đã duyệt"
            }else if(result[0].status == 0){
                result[0].status = "Không duyệt"
            }else if(result[0].status == 2) {
                result[0].status = "Chờ duyệt"
            }
            

            return prepareResponse(res, 200, "Lấy thông tin thành công", { data: result })
        }
    });
}
















module.exports = {
    getAllAccount,
    createNewBaoCaoHinhAnh,
    updateStatusBaoCaoHinhAnh,
    deleteBaoCaoHinhAnh,
    getBaoCaoHinhAnhById

}