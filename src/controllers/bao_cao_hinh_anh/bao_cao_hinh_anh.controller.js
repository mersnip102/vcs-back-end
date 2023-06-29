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

var Account = require("../../models/account.model");
var ImageReport = require("../../models/bao_cao_hinh_anh.model");
const e = require('express');


const getAllBaoCaoHinhAnh = async(req, res) => {
    const query = req.query
    ImageReport.getAll(query, async function(err, result) {
        if (err) {
            return prepareResponse(res, 400, "Failed", result)
           
        } else {
            console.log(result);
            for(let i = 0; i < result.length; i++){
                // const wkbString = result[i].geo
                // const buffer = Buffer.from(wkbString, 'hex');
                // const geometry = wkx.Geometry.parse(buffer);
                // const point = geometry.toGeoJSON().coordinates;
                // console.log(point);
                // result[i].geo = point;
                if(result[i].geo != null && result[i].geo != undefined && result[i].geo != ''){
                    const buffer = Buffer.from(result[i].geo, 'hex');
                    const geometry = wkx.Geometry.parse(buffer);
                    const geojson = geometry.toGeoJSON();
                    console.log(geojson.coordinates);
                    result[i].geo = geojson.coordinates;


                }

//                 const buffer = Buffer.from(result[i].geo, 'hex');
// const geometry = wkx.Geometry.parse(buffer);
// const geojson = geometry.toGeoJSON();
// console.log(geojson);

                if(result[i].status == 1){
                    result[i].status = "Đã duyệt"
                }else if(result[i].status == 0){
                    result[i].status = "Không duyệt"
                }else if(result[i].status == 2) {
                    result[i].status = "Chờ duyệt"
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
    // ImageReport.create(data, async function(err, result) {
    //     if (err) {
    //         return prepareResponse(res, 400, "Failed", result)
            
    //     } else {
    //         return prepareResponse(res, 200, "Create bao_cao_hinh_anh success", { bao_cao_hinh_anh: result })
            
    //     }
    // });
}

const updateStatusBaoCaoHinhAnh = async(req, res) => {
    let data = req.body;
    // let id = req.body.id;
    console.log(req.body);
    
    ImageReport.updateStatus(data, async function(err, result) {
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
    ImageReport.delete(data.id, async function(err, result) {
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
    ImageReport.getById(data.id, async function(err, result) {
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
            console.log(result[0].geo)

            return prepareResponse(res, 200, "Lấy thông tin thành công", { data: result })
        }
    });
}
















module.exports = {
    getAllBaoCaoHinhAnh,
    createNewBaoCaoHinhAnh,
    updateStatusBaoCaoHinhAnh,
    deleteBaoCaoHinhAnh,
    getBaoCaoHinhAnhById

}