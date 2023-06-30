const express = require("express");
const multer = require('multer');
const path = require('path');
var { prepareResponse } = require('../common/response');
const {validateEmptyBaoCao} = require('../middleware/joiMiddleware');
const {
    getAllAccount,
    getAccountById,
    createAccount,
    deleteAccount
    // createNewNhomNguoiDung,
    // updateNhomNguoiDung,
    // deleteNhomNguoiDung,
    // getBaoCaoHinhAnhById,
} = require("../controllers/auth/account.controller")
const Account = require("../models/phan_quyen.model");

const accountRouter = express.Router();

accountRouter.post(
    "/createAccount",
    createAccount,
);

// baoCaoHinhAnhRouter.post(
//     "/updateBaoCaoHinhAnh",
//     updateBaoCaoHinhAnh,
// );

accountRouter.delete(
    "/deleteAccount/:id",
    deleteAccount,
);

accountRouter.get("/getAllAccount", getAllAccount);
accountRouter.get("/getAccountById/:id", getAccountById);

// accountRouter.put("/updateNhomNguoiDung/:id", updateNhomNguoiDung);

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

accountRouter.post('/uploadBaoCaoHinhAnh', uploadFile.array('File'), validateEmptyBaoCao, async(req, res) => {
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



module.exports = { accountRouter };