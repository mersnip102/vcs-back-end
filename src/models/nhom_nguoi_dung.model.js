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

const GroupUser = function(nhom) {

    // this.Id = baocao.Id;
    // this.TieuDe = baocao.TieuDe;
    // this.NoiDung = baocao.NoiDung;
    // this.KienNghi = baocao.KienNghi;
    // this.LoaiBaoCao = baocao.LoaiBaoCao;
    // this.DoiTuong = baocao.DoiTuong;
    // this.DonViChuTri = baocao.DonViChuTri;
    // this.DonViLiQuan = baocao.DonViLiQuan;
    // this.LoaiVuViec = baocao.LoaiVuViec;
    // this.File = baocao.File;
    // this.KinhDo = baocao.KinhDo;
    // this.ViDo = baocao.ViDo;
    // this.DiaChi = baocao.DiaChi;
    // this.NgayTao = baocao.NgayTao;
    // this.Status = baocao.Status;

    this.ten_nhom = nhom.ten_nhom;
    this.mo_ta = nhom.mo_ta;
   

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

GroupUser.create = async function(newGroup, result) {
    
    await db.query("INSERT INTO nhom_nguoi_dung (ten_nhom, mo_ta) VALUES ($1, $2)", [newGroup.ten_nhom, newGroup.mo_ta], function(err, res) {
        if (err) {
            
            result(true, err.message);
        } else {
            result(false, res.insertId);
        }
    }
    );
};

GroupUser.getAll = async function(result) {
    
   
    const sql = "SELECT * FROM nhom_nguoi_dung"
    
   

    await db.query(sql, function(err, res) {
        if (err) {
            result(true, err);
        } else {
           
            result(false, res.rows);
        }
    });
};

GroupUser.getById = async function(id, result) {
    await db.query("SELECT * FROM bao_cao_hinh_anh WHERE id = $1", [id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            console.log(res);
            result(false, res.rows);
        }
    });
};

GroupUser.updateById = async function(id, newGroupUser, result) {
    await db.query("UPDATE nhom_nguoi_dung SET ten_nhom = $1, mo_ta = $2  WHERE id = $3", [newGroupUser.ten_nhom, newGroupUser.mo_ta, id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

GroupUser.updateStatus = async function(statusData, result) {
    await db.query("UPDATE bao_cao_hinh_anh SET status = $1 WHERE id = $2", [statusData.status, statusData.idBaoCao], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

GroupUser.delete = async function(id, result) {
    await db.query("DELETE FROM nhom_nguoi_dung WHERE id = $1", [id], function(err, res) {
        if (err) {
            console.log(err);
            result(true, err);
        } else {
            result(false, res);
        }
    });
};








module.exports = GroupUser;