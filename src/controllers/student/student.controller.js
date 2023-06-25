const express = require('express')

const multer = require('multer')
const path = require('path')
const fs = require('fs') //filesystem để xử lý file, đọc file, ghi file như private key
const hbs = require('hbs')
const util = require("util");

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

var token = require("../../jwt/tokenUtils");

var nodemailer = require('nodemailer');


const app = express()

app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);


var Student = require('../../models/student.model');
var Scholarship = require('../../models/scholarship.model');
var Account = require('../../models/account.model');
var Payment = require('../../models/payment.model');
var upload = require('../upload/student.upload.controller');

var { prepareResponse } = require('../../common/response');
const { get } = require('http')
const Fee = require('../../models/fee.model')

// HANDLE UPLOAD
// var multipleUpload = multer().fields([{ name: 'giayChungNhanTotNghiep', maxCount: 10 }, { name: 'anhChanDung', maxCount: 10 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 10 }])

// let handleUpload = async(req, res) => {

//     multipleUpload(req, res, function(err) {
//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }

//         let giayChungNhanTotNghiep = req.giayChungNhanTotNghiep.filename;
//         let anhChanDung = req.anhChanDung.filename;
//         let bangTotNghiepTHPT = req.bangTotNghiepTHPT.filename;
//         let giayKhaiSinh = req.giayKhaiSinh.filename;
//         let hocBaTHPT = req.hocBaTHPT.filename;
//         let cccd = req.cccd.filename;
//         let chungChiTiengAnh = req.chungChiTiengAnh.filename;
//         let giayToKhac = req.giayToKhac.filename;

//         // var dateObj = new Date();
//         // var month = dateObj.getUTCMonth() + 1; //months from 1-12
//         // var day = dateObj.getUTCDate();
//         // var year = dateObj.getUTCFullYear();

//         // var dir = "../assets/upload/" + day + "_" + month + "_" + year;
//         // console.log(dir)

//         // //create new folder into upload folder with name of date
//         // if (!fs.existsSync(dir)) {
//         //     fs.mkdirSync(dir);
//         // }

//         let student = new Student({
//             id: req.body.id,
//             role: req.body.role,
//             fullname: req.body.fullname,
//             birthday: req.body.birthday,
//             gender: req.body.gender,
//             hightSchool: req.body.hightSchool,
//             graduationYear: req.body.graduationYear,
//             address: req.body.address,
//             email: req.body.email,
//             phone: req.body.phone,
//             linkFacebook: req.body.linkFacebook,
//             phoneNumberFather: req.body.phoneNumberFather,
//             nameFather: req.body.nameFather,
//             phoneNumberMother: req.body.phoneNumberMother,
//             nameMother: req.body.nameMother,
//             emailFather: req.body.emailFather,
//             emailMother: req.body.emailMother,
//             sponsorName: req.body.sponsorName,
//             emailSponsor: req.body.emailSponsor,
//             giayChungNhanTotNghiep: giayChungNhanTotNghiep,
//             anhChanDung: anhChanDung,
//             bangTotNghiepTHPT: bangTotNghiepTHPT,
//             giayKhaiSinh: giayKhaiSinh,
//             hocBaTHPT: hocBaTHPT,
//             cccd: cccd,
//             chungChiTiengAnh: chungChiTiengAnh,
//             giayToKhac: giayToKhac,
//         });
//         Student.updateById(student, function(err, student) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(student);
//             }
//         });
//     });
// }


const updateAllowEditing = (req, res) => {
    try {
        let id = req.body.id;
        let allowEditing = req.body.allowEditing;
        Student.updateAllowEditing(allowEditing, id, function(status, student) {
            if (status) {
                return prepareResponse(res, 201, 'Update allowEditing successfully', { student: student });

            } else {
                return prepareResponse(res, 500, 'Update allowEditing failed', null);

            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Update allowEditing failed', null);
    }

}

const updateEnoughProfile = (req, res) => {
    try {
        let id = req.body.id;
        let enoughProfile = req.body.enoughProfile;
        Student.enoughProfile(enoughProfile, id, function(status, student) {
            if (status) {
                return prepareResponse(res, 200, "Update enoughProfile successfully", { student: student });
            } else {
                return prepareResponse(res, 400, "Update enoughProfile failed", null);
            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Update enoughProfile failed', null);
    }

}


var getAStudent = async(req, res) => {
    try {

        let listPayment = [];
        const listFeeType = [];
        let Phone = req.body.Phone;
        await Fee.getAll(function(status, feeTypes) {
            if (status) {
                feeTypes.forEach((feeType) => {
                    listFeeType.push({
                        Id: feeType.Id,
                        SchoolYear: feeType.SchoolYear,
                        Fee: feeType.Fee,
                        FeeType: feeType.FeeType,

                    })
                })



            }
        });


        Student.getByPhone(Phone, function(status, student) {
            if (status) {
                
                // Payment.getAllPaymentByStudentId(student.Id, function(status, payments) {
                //         if (status) {
                //             console.log(payments)
                //             payments.forEach((payment) => {
                //                 listFeeType.forEach((feeType) => {
                //                     if (payment.FeeType == feeType.Id) {
                //                         payment.FeeType = {...feeType };
                //                     }

                //                 })
                //             })
                //             listPayment.push(...payments)
                //             console.log(listPayment)

                //             return prepareResponse(res, 200, 'Get Student Successfully', { student: student, payments: listPayment });
                //         } else {
                //             return prepareResponse(res, 400, 'Get Student Failed', err);
                //         }
                //     })
                let payments = []
                student.map((student) => {
                    payments.push({
                        Id: student.paymentId,
                        StudentId: student.paymentStudentId,
                        FeeType: student.paymentFeeType,
                        RequestDate: student.paymentRequestDate,
                        PaymentValue: student.paymentValue,
                        Status: student.paymentStatus,
                        ConfirmDate: student.paymentConfirmDate,
                    })

                    delete student.paymentId
                    delete student.paymentStudentId
                    delete student.paymentFeeType
                    delete student.paymentRequestDate
                    delete student.paymentValue
                    delete student.paymentStatus
                    delete student.paymentConfirmDate
                    

                    
                })

                console.log(student[0])

                return prepareResponse(res, 200, 'Get Student Successfully', { student: student[0], payments: payments });
                    //     if (status) {
                    //         payments.forEach((payment) => {
                    //             feeTypes.forEach((feeType) => {
                    //                 if (payment.FeeType == feeType.Id) {
                    //                     listPayment.push({
                    //                         Id: payment.Id,
                    //                         FeeTypeId: payment.FeeTypeId,
                    //                         FeeTypeName: feeType.Name,
                    //                         StudentId: payment.StudentId,
                    //                         RequestDate: payment.RequestDate,
                    //                         PaymentValue: payment.PaymentValue,
                    //                         Status: payment.Status,
                    //                         Note: payment.Note,
                    //                         CreatedAt: payment.CreatedAt,
                    //                         UpdatedAt: payment.UpdatedAt
                    //                     })
                    //                 }
                    //             })
                    //         })

            } else {
                return prepareResponse(res, 400, 'Get Student Failed', err);
            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Get Student Failed', err);
    }
}

//Test update student
let testUpdateStudent = (req, res) => {
    let student = req.body.student;
    let phone = req.body.phone;
    console.log(student)
    Student.testUpdateById(phone, student, function(status, student) {

        if (student) {
            console.log(student);
            res.status(200).json({ student: student })
        } else {
            res.status(400);
        }
    });
}


let debug = console.log.bind(console);
let handleUpload = async(req, res) => {


    let Phone = req.body;
    console.log(Phone.Phone + "fđsgfg");
    let FullName = req.body.FullName;
    console.log(FullName + "fđsgfg");






    await upload.fields([{ name: 'CertificateOfGraduation', maxCount: 1 }])(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.log("esrrsdfdsf");
            // Xử lý lỗi của multer
        } else if (err) {
            // Xử lý lỗi khác
            console.log("grdgd");
            console.log(err);
        } else {
            console.log(Phone + "fđsgfg"); // in ra giá trị của trường text
            let file = req.files['CertificateOfGraduation'][0];
            let filename = file.filename;

            Student.updateByPhone(Phone, FullName, filename, function(err, student) {
                if (student) {
                    console.log(student);
                    prepareResponse(res, 201, 'Update Student Successfully', { student });
                } else {
                    prepareResponse(res, 400, 'Update Student Profile', err);
                }
            });
            console.log(a);
            // console.log(req.files['CertificateOfGraduation'][0]); // in ra thông tin tập tin đã được tải lên

        }
    });





    // try {
    //     // thực hiện upload
    //     const storage = multer.diskStorage({
    //         // Định nghĩa nơi file upload sẽ được lưu lại
    //         destination: (req, file, callback) => {
    //             const student2 = Student.getByPhone(phone);
    //             callback(null, student2.imageFolder);
    //         },

    //         filename: (req, file, callback) => {
    //             // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    //             // Chỉ cho phép tải lên các loại ảnh png & jpg
    //             let math = ["image/png", "image/jpeg"];
    //             if (math.indexOf(file.mimetype) === -1) {
    //                 let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
    //                 return callback(errorMess, null);
    //             }
    //             // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
    //             let filename = `${Date.now()}-quyennx-${file.originalname}`;
    //             callback(null, filename);
    //         }
    //     });


    //     // const imageFilter = function(req, file, cb) {
    //     //     // Accept images only
    //     //     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    //     //         req.fileValidationError = 'Only image files are allowed!';
    //     //         return cb(new Error('Only image files are allowed!'), false);
    //     //     }
    //     //     cb(null, true);
    //     // };

    //     // var upload = multer({ storage: storage });

    //     // Khởi tạo middleware uploadManyFiles với cấu hình như ở trên,
    //     // Bên trong hàm .array() truyền vào name của thẻ input, ở đây mình đặt là "many-files", và tham số thứ hai là giới hạn số file được phép upload mỗi lần, mình sẽ để là 17 (con số mà mình yêu thích). Các bạn thích để bao nhiêu cũng được.

    //     // var uploadManyFiles = upload.fields([{ name: 'giayChungNhanTotNghiep', maxCount: 1 }, { name: 'anhChanDung', maxCount: 1 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 1 }])
    //     //     // có thể  .array('name_input_image', 10) 10 là số lượng file tối đa có thể upload

    //     var uploadManyFiles = upload.fields([{ name: 'TemporaryCertificateOfGraduation', maxCount: 1 }, { name: 'CertificateOfGraduation', maxCount: 1 }, { name: 'PortraitImage', maxCount: 1 }, { name: 'BirthCertificate', maxCount: 1 }, { name: 'StudyRecords', maxCount: 1 }, { name: 'CitizenIdentification', maxCount: 1 }, { name: 'EnglishCertificate', maxCount: 1 }, { name: 'OtherPapers', maxCount: 1 }])

    //     // Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
    //     let multipleUploadMiddleware = util.promisify(uploadManyFiles);

    //     await multipleUploadMiddleware(req, res);
    //     // Nếu upload thành công, không lỗi thì tất cả các file của bạn sẽ được lưu trong biến req.files
    //     debug(req.files);
    //     // let student = new Student({
    //     //     ID: student.Id,
    //     //     SchoolId: student.SchoolId,
    //     //     Role: student.Role,
    //     //     FullName: student.FullName,
    //     //     Gender: student.Gender,
    //     //     Birthday: student.Birthday,
    //     //     HightSchool: student.HightSchool,
    //     //     GraduationYear: student.GraduationYear,
    //     //     Address: student.Address,
    //     //     Email: student.Email,
    //     //     Phone: student.Phone,
    //     //     LinkFacebook: student.LinkFacebook,
    //     //     PhoneNumberFather: student.PhoneNumberFather,

    //     //     NameFather: student.nameFather,
    //     //     PhoneNumberMother: student.phoneNumberMother,
    //     //     NameMother: student.nameMother,
    //     //     EmailFather: student.emailFather,
    //     //     EmailMother: student.emailMother,
    //     //     SponsorName: student.sponsorName,
    //     //     EmailSponsor: student.emailSponsor,

    //     //     CertificateOfGraduation: student.CertificateOfGraduation.path, // bằng tốt nghiệp

    //     //     // TemporaryCertificateOfGraduation: req.files['TemporaryCertificateOfGraduation'][0], // giấy  chung nhan tot nghiep tam thoi
    //     //     // PortraitImage: req.files['PortraitImage'][0], // anh chan dung
    //     //     // BirthCertificate: req.files['BirthCertificate'][0], //giay khai sinh
    //     //     // StudyRecords: req.files['StudyRecords'][0], // học bạ THPT
    //     //     // CitizenIdentification: req.files['CitizenIdentification'][0], //cccd
    //     //     // EnglishCertificate: req.files['EnglishCertificate'][0], // chứng chỉ tiếng anh dịch là 

    //     //     // OtherPapers: req.files['OtherPapers'][0], //các giay to khác

    //     //     EnglishLevel: student.englishLevel,
    //     //     CoverImage: student.coverImage,

    //     //     Addmission: student.addmission,

    //     //     ProfileStatus: null, //trangThaiHoSo
    //     //     ReservationFeeStatus: null, //trangThaiPhiGiuCho
    //     //     AdmissionFeeStatus: null, //trangThaiPhiXetTuyen

    //     //     LeadSoure: student.leadSoure,

    //     //     ImageFolder: student.imageFolder,
    //     // });


    //     // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client
    //     // if (req.files.length <= 0) {
    //     //     return res.send(`You must select at least 1 file or more.`);
    //     // }
    //     // trả về cho người dùng thông tin student:

    //     Student.updateByPhone(student, function(err, student) {
    //         if (student) {
    //             console.log(student);
    //             res.status(200).json({ student: student })
    //         } else {
    //             res.status(401);
    //         }
    //     });
    // } catch (error) {
    //     // Nếu có lỗi thì debug lỗi xem là gì ở đây
    //     debug(error);
    //     // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần
    //     if (error.code === "LIMIT_UNEXPECTED_FILE") {
    //         return res.send(`Exceeds the number of files allowed to upload.`);
    //     }
    //     return res.send(`Error when trying upload many files: ${error}}`);
    // }
};


const uploadProfile = async(req, res) => {
    //add new a student 


    // // name of the input is sampleFile
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    // uploadPath = __dirname + '../../../assets/upload/' + sampleFile.name;

    // sampleFile = req.files.sampleFile;

    // // Use the mv() method to place the file somewhere on your server
    // giayChungNhanTotNghiep
    //     .mv(uploadPath, function(err) {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.send('File uploaded!');
    //     });
    // res.render('student/profile');
}

const createNewStudent = async(req, res) => {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var accountSend = req.body.account;
    console.log(accountSend.Admission)

    //validate account


    let account = new Account({
        ID: uuidv4(),
        Phone: accountSend.Phone,
        Password: "123456",
        Email: accountSend.Email,
        FullName: accountSend.FullName,
        Role: 0,
        Status: 1,

    });

    let student = new Student({
        Id: uuidv4(),

        Role: 1,
        FullName: accountSend.FullName,

        Email: accountSend.Email,
        Phone: accountSend.Phone,

        AllowEditing: 1,
        Admission: accountSend.Admission,
        AdmissionManager: accountSend.AdmissionManager,



        LeadSoure: accountSend.LeadSoure,
        InnitiatedDate: new Date(),
        AccountId: account.ID,


    });

    var dir = path.join(`${__dirname}/../../assets/uploads/${year}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var semester = '';
    //compare month to create new folder
    if (1 <= month <= 4) {
        semester = 'Spring'
    } else if (5 <= month <= 8) {
        semester = 'Summer'
    } else if (9 <= month <= 12) {
        semester = 'Fall'
    }

    dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}`);
    console.log(dir)


    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}/${day}_${month}_${year}_${account.Phone}`);
    if (!fs.existsSync(dir)) {
        await fs.mkdirSync(dir);

    }

    student.ImageFolder = dir;
    console.log("cái dir", student.ImageFolder)




    Account.createAccount(account, function(err, account) {
        if (err) {
            if (account == null) {
                return prepareResponse(res, 400, 'Phone Number is already exist', err);

            } else {
                return prepareResponse(res, 400, 'Add Account Failed', err);
            }


        } else {
            Student.create(student, async function(err, studentData) {
                if (err) {
                    return prepareResponse(res, 400, 'Add Student Failed', err);

                } else {
                    console.log(account.Phone);
                    // const user = await token.make(account.Phone)
                    // console.log(user);
                    const transporter = await nodemailer.createTransport({

                        service: 'gmail',
                        auth: {
                            user: 'quyennxgch190732@fpt.edu.vn',
                            pass: 'rwojhdshuppghyqz'
                        }
                    });


                    console.log(account.Phone)
                    console.log(account.Password)
                    const url = `http://localhost:4200/auth/login?phone=${account.Phone}&password=${(account.Password)}`;


                    const mailOptions = {
                        from: 'quyennxgch190732@fpt.edu.vn',
                        to: account.Email,
                        subject: 'Your account has been created',
                        html: `<h1>Hi ${account.FullName}</h1>
                                <p>Your account has been created successfully.</p>
                                <p>Click the link below to login to your account.</p>
                                <a href="${url}">Login</a>`
                    };
                    console.log(mailOptions)


                    await transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('Error occurred while sending email:', error.message);
                            return;
                        }
                        console.log('Email sent:', info.response);
                    });


                    return prepareResponse(res, 201, 'Add Student Successfully', { account: account, student: student });

                }
            });

        }
    });

}


const checkProfile = async(student) => {

    if (student.birthday == null ||
        student.hightSchool == null ||
        student.graduationYear == null ||
        student.address == null ||
        student.phoneNumberFather == null ||
        student.phoneNumberMother == null ||
        student.nameFather == null ||
        student.nameMother == null ||
        student.giayChungNhanTotNghiep == null ||
        student.anhChanDung == null ||
        student.bangTotNghiepTHPT == null ||
        student.giayKhaiSinh == null ||
        student.hocBaTHPT == null ||
        student.cccd == null ||
        student.englishLevel == null ||
        student.phiGiuCho == null ||
        student.phiXetTuyen == null
    ) {
        return "Chưa đủ hồ sơ"
    } else {
        return "Đủ hồ sơ"
    }
}

const checkPhiGiuCho = async(student) => {
    //check phi giu cho

    if (student.phiGiuCho == null || student.phiGiuCho <= 5000000) {
        return "Chưa đóng phí giữ chỗ"
    } else {
        return "Đã đóng phí giữ chỗ"
    }
}



const checkPhiXetTuyen = async(student) => {
    //check phi xet tuyen

    if (student.phiXetTuyen == null || student.phiXetTuyen <= 10500000) {
        return "Chưa đóng phí xét tuyển"
    } else {
        return "Đã đóng phí xét tuyển"
    }
}

const getStudentById = async(req, res) => {
    try {
        const Id = req.params.Id;
        const listPayment = [];
        const listFeeType = [];

        await Fee.getAll(function(status, feeTypes) {
            if (status) {

                feeTypes.forEach((feeType) => {
                    listFeeType.push({
                        Id: feeType.Id,
                        SchoolYear: feeType.SchoolYear,
                        Fee: feeType.Fee,
                        FeeType: feeType.FeeType,

                    })
                })



            }
        });


        Student.getStudentById(Id, function(status, student) {
            if (status) {
                Payment.getAllPaymentByStudentId(Id, function(status, payments) {
                        if (status) {
                            console.log(payments)
                            payments.forEach((payment) => {
                                listFeeType.forEach((feeType) => {
                                    if (payment.FeeType == feeType.Id) {
                                        payment.FeeType = {...feeType };
                                    }

                                })
                            })
                            listPayment.push(...payments)
                            console.log(listPayment)

                            return prepareResponse(res, 200, 'Get Student Successfully', { student: student, payments: listPayment });
                        } else {
                            return prepareResponse(res, 400, 'Get Student Failed', err);
                        }
                    })
                    //     if (status) {
                    //         payments.forEach((payment) => {
                    //             feeTypes.forEach((feeType) => {
                    //                 if (payment.FeeType == feeType.Id) {
                    //                     listPayment.push({
                    //                         Id: payment.Id,
                    //                         FeeTypeId: payment.FeeTypeId,
                    //                         FeeTypeName: feeType.Name,
                    //                         StudentId: payment.StudentId,
                    //                         RequestDate: payment.RequestDate,
                    //                         PaymentValue: payment.PaymentValue,
                    //                         Status: payment.Status,
                    //                         Note: payment.Note,
                    //                         CreatedAt: payment.CreatedAt,
                    //                         UpdatedAt: payment.UpdatedAt
                    //                     })
                    //                 }
                    //             })
                    //         })

            } else {
                return prepareResponse(res, 400, 'Get Student Failed', student);
            }
        });
        // return prepareResponse(res, 200, 'Get Student Successfully', { student: student });

        // } else {

        //     return prepareResponse(res, 400, 'Get Student Failed', err);
        // }
        // });

    } catch (error) {
        return prepareResponse(res, 500, 'Get Student Failed', error);
    }


}


async function updateOrCreatePayment(req, res) {

    const promises = [];

    const data = {

        StudentId: req.body.StudentId,
        RequestDate: req.body.RequestDate,
        PaymentValue: req.body.PaymentValue,

    };


    const feeTypes = req.body.FeeType;
    console.log(feeTypes);



    feeTypes.forEach((feeType) => {

        const promise = new Promise((resolve, reject) => {

            //check feetype and studentid is exist
            Payment.checkPaymentExist(data.StudentId, feeType.Id, function(status, payment) {
                if (status) {
                    console.log(payment.length);
                    if (payment.length > 0) {
                        console.log(payment[0].FeeType)

                        Payment.updateById(payment[0].Id, data, function(status, payment) {
                            if (status) {
                                resolve(payment);

                            } else {
                                reject(payment);

                            }
                        });
                    } else {

                        const values = [];
                        values.push([uuidv4(), data.StudentId, data.PaymentValue, feeType.Id, data.RequestDate, 0]);
                        Payment.create(values, function(status, payment) {
                            if (status) {
                                resolve(payment);

                            } else {
                                reject(payment);
                            }
                        });
                    }
                } else {
                    reject(payment);
                }
            });
        });


        promises.push(promise);

        // values.push([uuidv4(), data.StudentId, data.PaymentValue, feeType.Id, data.RequestDate]);
    });

    // Payment.create(values, function(status, payment) {
    //     if (status) {
    //         return prepareResponse(res, 200, 'Add Payment Successfully', { payment: payment });

    //     } else {
    //         return prepareResponse(res, 400, 'Add Payment Failed', { err: payment });
    //     }
    // });



    return Promise.all(promises);
}

//add Payment for student
const addPayment = async(req, res) => {
    // let newPayment = new Payment({
    //     Id: uuidv4(),
    //     StudentId: req.body.StudentId,
    //     PaymentValue: req.body.PaymentValue,
    //     FeeType: req.body.FeeType,
    //     RequestDate: req.body.RequestDate,
    //     Status: req.body.Status,
    //     ConfirmDate: req.body.ConfirmDate,
    // });

    try {
        if (req.body.FeeType.length <= 0) {
            return prepareResponse(res, 400, 'Add Payment Failed', { err: 'FeeType is required' });
        } else {
            updateOrCreatePayment(req, res)
                .then(results => {

                    console.log(results);
                    return prepareResponse(res, 201, 'Add Payment Successfully', { payment: results });
                })
                .catch(error => {

                    console.log(error);
                    return prepareResponse(res, 400, 'Add Payment Failed', { err: error });
                })
                .finally(() => {
                    console.log('Done');

                });

        }



    } catch (error) {
        return prepareResponse(res, 500, 'Add Payment Failed', err);
    }


}

//update payment for student
const updatePayment = async(req, res) => {
    try {
        let payment = {
            Id: req.body.Id,


            Status: req.body.Status,


        }
        Payment.updateById(payment.Id, payment, function(status, payment) {
            if (status) {
                return prepareResponse(res, 201, 'Update Payment Successfully', { payment: payment });

            } else {
                return prepareResponse(res, 400, 'Update Payment Failed', { er: payment });
            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Update Payment Failed', err);

    }


}

//remove payment for student
const removePayment = async(req, res) => {
    try {
        var id = req.params.Id
        Payment.remove(id, function(status, payment) {
            if (status) {
                return prepareResponse(res, 201, 'Remove Payment Successfully', { payment: payment });

            } else {
                return prepareResponse(res, 400, 'Remove Payment Failed', { err: payment });
            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Remove Payment Failed', err);

    }


}

//get all payment of student
const getPaymentById = async(req, res) => {
    try {
        var Id = req.query.Id;
        Payment.getById(Id, function(status, payment) {
            if (status) {
                return prepareResponse(res, 201, 'Get Payment Successfully', { payment: payment });
            } else {
                return prepareResponse(res, 400, 'Get Payment Failed', { err: err })

            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Get Payment Failed', err);

    }

}

const getAllPayment = async(req, res) => {
    try {

        let listPayment = []

        await Payment.getAll(function(status, payments) {
            if (status) {
                listPayment = payments;

                const promises = [];
                for (let i = 0; i < listPayment.length; i++) {
                    const promise = new Promise(async(resolve, reject) => {
                        await Student.getStudentById(listPayment[i].StudentId, function(status, student) {
                            if (status) {
                                listPayment[i].Student = student;
                                resolve(listPayment[i]);
                                console.log(listPayment[i])
                            } else {
                                listPayment[i].Student = null;
                                reject(listPayment[i]);
                            }
                        });
                    });
                    promises.push(promise);
                }

                Promise.all(promises).then(results => {
                    console.log(results);
                    return prepareResponse(res, 201, 'Get Payment Successfully', { payment: results });

                }).catch(error => {
                    return prepareResponse(res, 400, 'Get Payment Failed', { err: error })
                });;
                // listPayment.forEach(async(payment) => {
                //         console.log(payment.StudentId)
                //         const promise = new Promise(async(resolve, reject) => {
                //             await Student.getStudentById(payment.StudentId, function(status, student) {
                //                 if (status) {


                //                     payment.Student = student;
                //                     resolve(payment);


                //                 } else {

                //                     payment.Student = null;
                //                     reject(payment);
                //                 }
                //             });
                //         });
                //         console.log(promise);
                //     })
                // Promise.all(promises);
                // listPayment = payments;


            } else {
                return prepareResponse(res, 400, 'Get Payment Failed', { err: payments })

            }
        });

    } catch (error) {
        return prepareResponse(res, 500, 'Get Payment Failed', err);

    }


}

module.exports = { updateAllowEditing, getPaymentById, updateEnoughProfile, createNewStudent, getStudentById, uploadProfile, handleUpload, uploadProfile, getAStudent, addPayment, updatePayment, removePayment, getAllPayment, testUpdateStudent }


// UPLOAD IMAGE C2
// const profileStudent = async(req, res) => {
//     let giayChungNhanTotNghiep;
//     let anhChanDung;
//     let bangTotNghiepTHPT;
//     let giayKhaiSinh;
//     let hocBaTHPT;
//     let cccd;
//     let chungChiTiengAnh;
//     let giayToKhac;
//     let uploadPath;
//     // name of the input is sampleFile
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     uploadPath = __dirname + '../../../assets/upload/' + sampleFile.name;

//     sampleFile = req.files.sampleFile;

//     // Use the mv() method to place the file somewhere on your server
//     giayChungNhanTotNghiep.mv(uploadPath, function(err) {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.send('File uploaded!');
//     });