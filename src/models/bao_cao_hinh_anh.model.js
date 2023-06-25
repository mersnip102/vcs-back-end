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

const ImageReport = function(baocao) {

    this.Id = student.Id;
    this.TieuDe = baocao.TieuDe;
    this.NoiDung = baocao.NoiDung;
    this.KienNghi = baocao.KienNghi;
    this.LoaiBaoCao = baocao.LoaiBaoCao;
    this.DoiTuong = baocao.DoiTuong;
    this.DonViChuTri = baocao.DonViChuTri;
    this.DonViLiQuan = baocao.DonViLiQuan;
    this.LoaiVuViec = baocao.LoaiVuViec;
    this.File = baocao.File;
    this.KinhDo = baocao.KinhDo;
    this.ViDo = baocao.ViDo;
    this.DiaChi = baocao.DiaChi;
    this.NgayTao = baocao.NgayTao;
    this.Status = baocao.Status;

};

ImageReport.create = async function(newImageReport, result) {
    await db.query("INSERT INTO bao_cao_hinh_anh SET ?", newImageReport, function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res.insertId);
        }
    });
};

ImageReport.getAll = async function(result) {
    await db.query("SELECT * FROM bao_cao_hinh_anh", function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

ImageReport.getById = async function(id, result) {
    await db.query("SELECT * FROM bao_cao_hinh_anh WHERE Id = ?", id, function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

ImageReport.updateById = async function(id, baocao, result) {
    await db.query("UPDATE bao_cao_hinh_anh SET TieuDe = ?, NoiDung = ?, KienNghi = ?, LoaiBaoCao = ?, DoiTuong = ?, DonViChuTri = ?, DonViLiQuan = ?, LoaiVuViec = ?, File = ?, KinhDo = ?, ViDo = ?, DiaChi = ?, NgayTao = ?, Status = ? WHERE Id = ?", [baocao.TieuDe, baocao.NoiDung, baocao.KienNghi, baocao.LoaiBaoCao, baocao.DoiTuong, baocao.DonViChuTri, baocao.DonViLiQuan, baocao.LoaiVuViec, baocao.File, baocao.KinhDo, baocao.ViDo, baocao.DiaChi, baocao.NgayTao, baocao.Status, id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

ImageReport.delete = async function(id, result) {
    await db.query("DELETE FROM bao_cao_hinh_anh WHERE Id = ?", [id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};








module.exports = ImageReport;