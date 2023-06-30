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

var Account = require("../../models/phan_quyen.model");
var ToChuc = require("../../models/to_chuc.model");
const e = require('express');


const getAllToChuc = async(req, res) => {
   
    ToChuc.getAll(async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Lấy thôn tin tổ chức thất bại", result)
           
        } else {
            console.log(result);
//             for(let i = 0; i < result.length; i++){
//                 // const wkbString = result[i].geo
//                 // const buffer = Buffer.from(wkbString, 'hex');
//                 // const geometry = wkx.Geometry.parse(buffer);
//                 // const point = geometry.toGeoJSON().coordinates;
//                 // console.log(point);
//                 // result[i].geo = point;
//                 if(result[i].geo != null && result[i].geo != undefined && result[i].geo != ''){
//                     const buffer = Buffer.from(result[i].geo, 'hex');
//                     const geometry = wkx.Geometry.parse(buffer);
//                     const geojson = geometry.toGeoJSON();
//                     console.log(geojson.coordinates);
//                     result[i].geo = geojson.coordinates;


//                 }

// //                 const buffer = Buffer.from(result[i].geo, 'hex');
// // const geometry = wkx.Geometry.parse(buffer);
// // const geojson = geometry.toGeoJSON();
// // console.log(geojson);

//                 if(result[i].status == 1){
//                     result[i].status = "Đã duyệt"
//                 }else if(result[i].status == 0){
//                     result[i].status = "Không duyệt"
//                 }else if(result[i].status == 2) {
//                     result[i].status = "Chờ duyệt"
//                 }

                
//             }
//             console.log(result);
            
            return prepareResponse(res, 200, "Lấy thông tin tổ chức thành công", {data: result})
        }
    });
}


const createNewNhomNguoiDung = async(req, res) => {
    var data = req.body;
    console.log(data);
    GroupUser.create(data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Tạo nhóm người dùng thất bại", result)
            
        } else {
            return prepareResponse(res, 200, "Tạo nhóm người dùng thành công", { data: result })
            
        }
    });
}

const updateNhomNguoiDung = async(req, res) => {
    let data = req.body;
    const id = req.params.id;

    console.log(data);
    
    GroupUser.updateById(id, data, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Chỉnh sửa nhóm người dùng thất bại", result)
            
        } else {
            return prepareResponse(res, 200, "Chỉnh sửa nhóm người dùng thành công", { data: result })
            
        }
    });
}

const deleteNhomNguoiDung = async(req, res) => {
    var data = req.params;
    console.log(data);
    GroupUser.delete(data.id, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Xóa nhóm người dùng thất bại", result)
            
        } else {
            return prepareResponse(res, 200, "Xóa nhóm người dùng thành công", { bao_cao_hinh_anh: result })
            
        }
    });
}

const getBaoCaoHinhAnhById = async(req, res) => {
    var data = req.params;
    console.log(data);
    GroupUser.getById(data.id, async function(err, result) {
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
    getAllToChuc,
    createNewNhomNguoiDung,
    updateNhomNguoiDung,
    deleteNhomNguoiDung,
    getBaoCaoHinhAnhById

}