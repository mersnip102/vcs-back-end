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

    this.tieu_de = baocao.tieu_de;
    this.noi_dung = baocao.noi_dung;
    this.kien_nghi = baocao.kien_nghi;
    this.loai_bao_cao = baocao.loai_bao_cao;
    this.doi_tuong = baocao.doi_tuong;
    this.don_vi_chu_tri = baocao.don_vi_chu_tri;
    this.don_vi_lien_quan = baocao.don_vi_lien_quan;
    this.loai_vu_viec = baocao.loai_vu_viec;
    this.file = baocao.file;
    this.kinh_do = baocao.kinh_do;
    this.vi_do = baocao.vi_do;
    this.dia_chi = baocao.dia_chi;
    this.ngay_tao = baocao.ngay_tao;
    this.status = baocao.status;
    this.geo = baocao.geo;
    this.nguoi_bao_cao = baocao.nguoi_bao_cao;

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

ImageReport.create = async function(newImageReport, result) {
    console.log(newImageReport.Geo);
    await db.query("INSERT INTO bao_cao_hinh_anh (tieu_de, noi_dung, kien_nghi, loai_bao_cao, doi_tuong, don_vi_chu_tri, don_vi_lien_quan, loai_vu_viec, file, kinh_do, vi_do, dia_chi, ngay_tao, status, geo, nguoi_bao_cao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ST_GeomFromText($11, 4326), $12, $13, $14, ST_GeomFromText($15, 4326), $16) RETURNING id", [newImageReport.TieuDe, newImageReport.NoiDung, newImageReport.KienNghi, newImageReport.LoaiBaoCao, newImageReport.DoiTuong, newImageReport.DonViChuTri, newImageReport.DonViLiQuan, newImageReport.LoaiVuViec, newImageReport.File, newImageReport.KinhDo, newImageReport.ViDo, newImageReport.DiaChi, newImageReport.NgayTao, newImageReport.Status, newImageReport.Geo, newImageReport.NguoiBaoCao], function(err, res) {
        if (err) {
            
            result(true, err.message);
        } else {
            result(false, res.insertId);
        }
    }
    );
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