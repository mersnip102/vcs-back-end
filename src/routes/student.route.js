const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs')
var { prepareResponse } = require('../common/response');

const { validateDeposit, validateCreateAccountStudent } = require("../middleware/joiMiddleware");

const {
    getStudentById,
    handleUpload,
    getAStudent,
    addPayment,
    updatePayment,
    removePayment,
    getAllPayment,
    testUpdateStudent,
    createNewStudent,

    getPaymentById,
    updateAllowEditing,
    updateEnoughProfile

} = require("../controllers/student/student.controller");

const Student = require("../models/student.model");

const studentRouter = express.Router();
const leg = ''

const {
    multipleUpload
} = require("../controllers/upload/student.upload.controller");
const { authenticateJWT } = require("../middleware/auth.middleware");


const storage = multer.diskStorage({

    destination: async(req, file, cb) => {

        await Student.getStudentById(req.params.Id, async function(status, student) {
            if (status == true) {
                const imageFolder = student.ImageFolder
                const array = await imageFolder.split('\\')

                cb(null, `../src/assets/uploads/${array[8]}/${array[9]}/${array[10]}`);
            }

        })

    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },

});

const uploadFile = multer({
    storage: storage,
})

studentRouter.post('/handleUpload/:Id', uploadFile.fields([{ name: 'CertificateOfGraduation', maxCount: 1 }, { name: 'TemporaryCertificateOfGraduation', maxCount: 1 }, { name: 'StudyRecords', maxCount: 1 },
    { name: 'EnglishCertificate', maxCount: 1 }, { name: 'BirthCertificate', maxCount: 1 }, { name: 'PortraitImage', maxCount: 1 }, { name: 'CitizenIdentification', maxCount: 1 },
    { name: 'OtherPapers', maxCount: 1 }
]), async(req, res) => {
    // console.log(req.files)

    let files = {...req.files };
    // console.log(req.body)

    let data = {...req.body };
    // console.log(req.params.Id)
    try {

        // if (req.files == undefined) {
        //     return res.status(400).send({ message: "Please upload a file!" });
        // }
        // delete data.Nationality

        let keys = Object.keys(files)

        for (let i = 0; i < keys.length; i++) {
            if (req.files[keys[i]] != undefined || req.files[keys[i]] != null) {
                data[keys[i]] = req.files[keys[i]][0].filename
            }
        }

        await Student.updateById(req.params.Id, data, async function(status, student) {
            if (status) {
                console.log(student)
                return prepareResponse(res, 201, 'Update student successfully', { student: student });

            } else {
                return prepareResponse(res, 400, 'Update student Failed', student);

            }
        })
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${err}`,
        });
    }

});





// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '../assets/uploads/'); // Thư mục lưu trữ các file được upload
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname); // Lưu tên gốc của file
//     }
// });

// const upload = multer({ storage: storage });





// const storage = multer.diskStorage({
//     // Định nghĩa nơi file upload sẽ được lưu lại

//     destination: function(req, file, callback) {
//         //save query router param
//         const id = req.query.Id;
//         console.log("abcdeffvf" + id)
//         console.log(req.body)

//         // var dir = ""
//         // const originalPath = await Student.getById(id, function(status, student) {
//         //     if (status) {

//         //         var dateObj = new Date();
//         //         var month = dateObj.getUTCMonth() + 1; //months from 1-12
//         //         var day = dateObj.getUTCDate();
//         //         var year = dateObj.getUTCFullYear();

//         //         var dir = path.join(`${__dirname}/../../assets/uploads/${year}`);

//         //         if (!fs.existsSync(dir)) {
//         //             fs.mkdirSync(dir);
//         //         }
//         //         var semester = '';
//         //         //compare month to create new folder
//         //         if (1 <= month <= 4) {
//         //             semester = 'Spring'
//         //         } else if (5 <= month <= 8) {
//         //             semester = 'Summer'
//         //         } else if (9 <= month <= 12) {
//         //             semester = 'Fall'
//         //         }

//         //         dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}`);
//         //         console.log(dir)

//         //         //create new folder into upload folder with name of date
//         //         if (!fs.existsSync(dir)) {
//         //             fs.mkdirSync(dir);
//         //         }



//         //         // if (!fs.existsSync(dir + "/" + semester + "/" + day + "_" + month + "_" + year + "_" + student.id)) {
//         //         //     fs.mkdirSync(dir + "/" + semester + "/" + day + "_" + month + "_" + year + "_" + student.id);
//         //         // }

//         //         dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}/${day}_${month}_${year}`);
//         //         if (!fs.existsSync(dir)) {
//         //             fs.mkdirSync(dir);

//         //             console.log("cái dir", dir)
//         //         }

//         //         console.log("sdfdsfsdeeee" + student.ImageFolder);
//         //         return student.ImageFolder;
//         //     } else {
//         //         console.log("err");

//         //     }
//         // });
//         // console.log("originalPath" + originalPath)
//         // const pathArray = originalPath.split('\\');
//         // const a = pathArray[9];

//         // await Student.getById(id, async function(status, student) {

//         //     if (status) {
//         //         console.log("sdfdsfsd");
//         //         console.log(student);

//         //         const originalPath = await student.ImageFolder;
//         //         pathArray = await originalPath.split('\\')
//         //         a = await pathArray[9];
//         //         // const newPath = pathArray.slice(6)

//         //         console.log("dcvfdsvcfdsvf" + pathArray[9])



//         //     } else {
//         //         console.log("lỗi");

//         //     }
//         // });




//         callback(null, 'uploads/');
//     },

//     filename: (req, file, callback) => {
//         // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
//         // Chỉ cho phép tải lên các loại ảnh png & jpg\

//         // let math = ["image/png", "image/jpeg"];
//         // if (math.indexOf(file.mimetype) === -1) {
//         //     let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
//         //     return callback(errorMess, null);
//         // }

//         // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
//         // callback(null, file.fieldname + '-' + Date.now() + '-quyennx-' + file.originalname);
//         callback(null, file.originalname);
//     }
// });


// // const imageFilter = function(req, file, cb) {
// //     // Accept images only
// //     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
// //         req.fileValidationError = 'Only image files are allowed!';
// //         return cb(new Error('Only image files are allowed!'), false);
// //     }
// //     cb(null, true);
// // };

// const upload = multer({ storage: storage });

// studentRouter.post(
//     "/handleUpload", upload.fields([{ name: 'CertificateOfGraduation', maxCount: 1 }]), (req, res) => {
//         const id = req.query.Id;
//         console.log(id)
//         console.log("fdgdgvdddđ" + req.body.FullName)
//         console.log(req.files)

//         // // Check if a new image file is uploaded
//         // if (req.files) {
//         //     image = req.file.filename;
//         // }
//         // console.log("fgfdgvfdgfd ssssssdsd" + req.files['CertificateOfGraduation'][0].filename)

//         Student.updateByPhone(req.body.Phone, req.body.FullName, req.files['CertificateOfGraduation'][0].filename, req.files['CertificateOfGraduation'][0].destination,
//             function(status, student) {

//                 if (status) {
//                     return prepareResponse(res, 201, 'Update Student Successfully', { student: student });





//                 } else {

//                     return prepareResponse(res, 400, 'Update Student Failed', err);

//                 }
//             });
//     }

// );

studentRouter.post(
    "/getAStudent",
    getAStudent
);




studentRouter.get(
    "/getStudentById/:Id",
    // getAStudent,
    getStudentById
);

studentRouter.post("/createNewStudent", validateCreateAccountStudent, createNewStudent);

studentRouter.post("/testUpdateStudent", testUpdateStudent);


// studentRouter.get("/payment", authenticateJWT, getAllPayment)

// studentRouter.post("/addPayment", addPayment)

// studentRouter.put("/updatePayment", updatePayment)

// studentRouter.get("/payment/:Id", getPaymentById)

// studentRouter.delete("/deletePayment/:Id", removePayment)




studentRouter.put("/updateAllowEditing", updateAllowEditing)

studentRouter.put("/updateEnoughProfile", updateEnoughProfile)






module.exports = { studentRouter };