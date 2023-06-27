const express = require("express");
const multer = require('multer');
const path = require('path');
var { prepareResponse } = require('../common/response');
const {validateEmptyBaoCao} = require('../middleware/joiMiddleware');
const {
    getAllBaoCaoHinhAnh,
    createNewBaoCaoHinhAnh,
    updateBaoCaoHinhAnh,
    deleteBaoCaoHinhAnh,
    getBaoCaoHinhAnhById,
} = require("../controllers/bao_cao_hinh_anh/bao_cao_hinh_anh.controller");
const ImageReport = require("../models/bao_cao_hinh_anh.model");

const baoCaoHinhAnhRouter = express.Router();

baoCaoHinhAnhRouter.post(
    "/createNewBaoCaoHinhAnh",
    createNewBaoCaoHinhAnh,
);

baoCaoHinhAnhRouter.put(
    "/updateBaoCaoHinhAnh",
    updateBaoCaoHinhAnh,
);

baoCaoHinhAnhRouter.delete(
    "/deleteBaoCaoHinhAnh/:Id",
    deleteBaoCaoHinhAnh,
);

baoCaoHinhAnhRouter.get("/getAllBaoCaoHinhAnh", getAllBaoCaoHinhAnh);
baoCaoHinhAnhRouter.get("/getBaoCaoHinhAnhById/:Id", getBaoCaoHinhAnhById);


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

baoCaoHinhAnhRouter.post('/uploadBaoCaoHinhAnh', uploadFile.array('File'), validateEmptyBaoCao, async(req, res) => {
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
        data.Status = 0
        data.NgayTao = new Date()
        data.geo = {
            type: 'Point',
            coordinates: [21.0278, 105.8342]
          }

        //   'POINT(-74.0445 40.6892)'
        



        // let keys = Object.keys(files)

        // for (let i = 0; i < keys.length; i++) {
        //     if (req.files[keys[i]] != undefined || req.files[keys[i]] != null) {
        //         data[keys[i]] = req.files[keys[i]][0].filename
        //     }
        // }

       

        await ImageReport.create(data, async function(status, result) {
            if (status) {
                console.log(result)
                return prepareResponse(res, 400, 'Tạo báo báo failed', result);
               

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

module.exports = { baoCaoHinhAnhRouter };