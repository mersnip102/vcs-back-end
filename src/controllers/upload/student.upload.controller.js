const express = require("express");
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var Student = require('../../models/student.model');
const util = require("util");

//get a student by id

const storage = multer.diskStorage({
    // Định nghĩa nơi file upload sẽ được lưu lại
    destination: (req, file, callback) => {
        console.log(req.body.Phone)
        const student = Student.getByPhone(req.body.Phone);

        callback(null, student.imageFolder);
    },

    filename: (req, file, callback) => {
        // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
        // Chỉ cho phép tải lên các loại ảnh png & jpg\

        // let math = ["image/png", "image/jpeg"];
        // if (math.indexOf(file.mimetype) === -1) {
        //     let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
        //     return callback(errorMess, null);
        // }

        // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
        let filename = `${Date.now()}-quyennx-${file.originalname}`;
        callback(null, filename);
    }
});


// const imageFilter = function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };






var upload = multer({ storage: storage });

// Khởi tạo middleware uploadManyFiles với cấu hình như ở trên,
// Bên trong hàm .array() truyền vào name của thẻ input, ở đây mình đặt là "many-files", và tham số thứ hai là giới hạn số file được phép upload mỗi lần, mình sẽ để là 17 (con số mà mình yêu thích). Các bạn thích để bao nhiêu cũng được.

// var uploadManyFiles = upload.fields([{ name: 'giayChungNhanTotNghiep', maxCount: 1 }, { name: 'anhChanDung', maxCount: 1 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 1 }])
//     // có thể  .array('name_input_image', 10) 10 là số lượng file tối đa có thể upload

// var uploadManyFiles = upload.fields([{ name: 'TemporaryCertificateOfGraduation', maxCount: 1 }, { name: 'CertificateOfGraduation', maxCount: 1 }, { name: 'PortraitImage', maxCount: 1 }, { name: 'BirthCertificate', maxCount: 1 }, { name: 'StudyRecords', maxCount: 1 }, { name: 'CitizenIdentification', maxCount: 1 }, { name: 'EnglishCertificate', maxCount: 1 }, { name: 'OtherPapers', maxCount: 1 }])

// Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
// let multipleUploadMiddleware = util.promisify(upload);
module.exports = upload;
// module.exports = {
//     upload: upload,
//     multipleUpload: multipleUpload
// }