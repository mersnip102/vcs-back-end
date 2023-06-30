const express = require("express");
const multer = require('multer');
const path = require('path');
var { prepareResponse } = require('../common/response');
const {validateEmptyBaoCao} = require('../middleware/joiMiddleware');
const {
    getAllNhomNguoiDung,
    createNewNhomNguoiDung,
    updateNhomNguoiDung,
    deleteNhomNguoiDung,
    getBaoCaoHinhAnhById,
} = require("../controllers/nhom_nguoi_dung/nhom_nguoi_dung.controller");
const ImageReport = require("../models/bao_cao_hinh_anh.model");

const nhomNguoiDungRouter = express.Router();

nhomNguoiDungRouter.post(
    "/createNewNhomNguoiDung",
    createNewNhomNguoiDung,
);

// baoCaoHinhAnhRouter.post(
//     "/updateBaoCaoHinhAnh",
//     updateBaoCaoHinhAnh,
// );

nhomNguoiDungRouter.delete(
    "/deleteNhomNguoiDung/:id",
    deleteNhomNguoiDung,
);

nhomNguoiDungRouter.get("/getAllNhomNguoiDung", getAllNhomNguoiDung);
nhomNguoiDungRouter.get("/getBaoCaoHinhAnhById/:id", getBaoCaoHinhAnhById);

nhomNguoiDungRouter.put("/updateNhomNguoiDung/:id", updateNhomNguoiDung);

const storage = multer.diskStorage({

    destination: async(req, file, cb) => {

                cb(null, `../src/assets/uploads`);

    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },

});

const uploadFile = multer({
    storage: storage,
})

nhomNguoiDungRouter.post('/uploadBaoCaoHinhAnh', uploadFile.array('File'), validateEmptyBaoCao, async(req, res) => {
   try {
        let files = req.files
        
        
        let data = {...req.body };
        
        data.File = ''
        for(let i = 0; i < files.length; i++){
            
            
            if(i == files.length - 1){
                data.File += `${files[i].filename}`
            } else {
                data.File += `${files[i].filename}, `
            }
        }
        data.Status = 2
        data.NgayTao = new Date()

        // data.Geo = {
        //     type: 'Point',
        //     coordinates: [21.0278, 105.8342]
        //   }

        data.Geo = 'POINT(-74.0445 40.6892)'
        



        // let keys = Object.keys(files)

        // for (let i = 0; i < keys.length; i++) {
        //     if (req.files[keys[i]] != undefined || req.files[keys[i]] != null) {
        //         data[keys[i]] = req.files[keys[i]][0].filename
        //     }
        // }

       

        await ImageReport.create(data, async function(status, result) {
            if (status) {
                console.log(result)
                return prepareResponse(res, 400, 'Tạo báo báo thất bại', result);
            } else {
                
                return prepareResponse(res, 201, 'Tạo báo báo thành công', { result: result });
            }
        })
    } catch (err) {
        res.status(500).send({
            message: `Could not upload PAKN: ${err}`,
        });
    }
});



module.exports = { nhomNguoiDungRouter };