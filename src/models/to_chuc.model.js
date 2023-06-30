const db = require('../DB/connect.js');
//creat an object student

// Student.create({
//     phone: "123456789",
//     fullname: "Nguyen Van A",
//     birthday: "1999-01-01",
//     gender: "Nam",
//     hightSchool: "THPT Nguyen Van Cu",
//     graduationYear: "2017",
//     address: "Ha Noi",
//     email: "quyennxgch190732@gmail.com",
//     linkFacebook: "https://www.facebook.com/quyen.nguyen.581",
//     phoneNumberFather: "123456789",
//     nameFather: "Nguyen Van B",
//     phoneNumberMother: "123456789",
//     nameMother: "Nguyen Thi C",
//     emailFather: "dfdsf@gmail.com",
//     emailMother: "gfdg@gmail.com",
//     sponsorName: "Nguyen Van D",
//     emailSponsor: "cbvfb@gmail.com",
//     giayChungNhanTotNghiep: "https://www.facebook.com/quyen.nguyen.581",
//     bangTotNghiep: "https://www.facebook.com/quyen.nguyen.581",
//     anhChanDung: "https://www.facebook.com/quyen.nguyen.581",
//     giayKhaiSinh: "https://www.facebook.com/quyen.nguyen.581",
//     hocBaTHPT: "https://www.facebook.com/quyen.nguyen.581",
//     cccd: "https://www.facebook.com/quyen.nguyen.581",
//     chungChiTiengAnh: "https://www.facebook.com/quyen.nguyen.581",
//     cacGiayToKhac: "https://www.facebook.com/quyen.nguyen.581",
// }, (err, res) => {
//     if (err) {

//     } else {
//         console.log(res);
//     }
// });

const ToChuc = function(to_chuc) {

   this.ten_to_chuc = to_chuc.ten_to_chuc;
   

};

// ImageReport.create = async function(newImageReport, result) {
//     await db.query("INSERT INTO bao_cao_hinh_anh SET ?", newImageReport, function(err, res) {
//         if (err) {
//             result(true, err);
//         } else {
//             result(false, res.insertId);
//         }
//     });
// };

ToChuc.create = async function(newGroup, result) {
    
    await db.query("INSERT INTO nhom_nguoi_dung (ten_nhom, mo_ta) VALUES ($1, $2)", [newGroup.ten_nhom, newGroup.mo_ta], function(err, res) {
        if (err) {
            
            result(true, err.message);
        } else {
            result(false, res.insertId);
        }
    }
    );
};

ToChuc.getAll = async function(result) {
    
   
    const sql = "SELECT * FROM to_chuc"
    
   

    await db.query(sql, function(err, res) {
        if (err) {
            result(true, err);
        } else {
           
            result(false, res.rows);
        }
    });
};

ToChuc.getById = async function(id, result) {
    await db.query("SELECT * FROM bao_cao_hinh_anh WHERE id = $1", [id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            console.log(res);
            result(false, res.rows);
        }
    });
};

ToChuc.updateById = async function(id, newGroupUser, result) {
    await db.query("UPDATE nhom_nguoi_dung SET ten_nhom = $1, mo_ta = $2  WHERE id = $3", [newGroupUser.ten_nhom, newGroupUser.mo_ta, id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

ToChuc.updateStatus = async function(statusData, result) {
    await db.query("UPDATE bao_cao_hinh_anh SET status = $1 WHERE id = $2", [statusData.status, statusData.idBaoCao], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

ToChuc.delete = async function(id, result) {
    await db.query("DELETE FROM nhom_nguoi_dung WHERE id = $1", [id], function(err, res) {
        if (err) {
            console.log(err);
            result(true, err);
        } else {
            result(false, res);
        }
    });
};








module.exports = ToChuc;