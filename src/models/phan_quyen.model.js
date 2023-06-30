const db = require('../DB/connect.js');

const PhanQuyen = function(account) {

    this.id = account.id
    this.ten = account.ten
    this.username = account.username
    this.email = account.email
    this.phone = account.phone
    this.chuc_danh = account.chuc_danh
    this.dia_chi = account.dia_chi
    this.role = account.role
    this.ho = account.ho
    this.password = account.password
    this.ngay_tao = account.ngay_tao
    this.cap_tren = account.cap_tren
    this.to_chuc = account.to_chuc
    this.status = account.status
    this.ngay_het_han = account.ngay_het_han 

};

PhanQuyen.createAccount = async function(newAccount, result) {
    
    await db.query("INSERT INTO account (ten, username, email, phone, chuc_danh, dia_chi, role, ho, password, ngay_tao, cap_tren, to_chuc, status, ngay_het_han) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now(), $10, $11, $12, $13)", [newAccount.ten, newAccount.username, newAccount.email, newAccount.phone, newAccount.chuc_danh, newAccount.dia_chi, newAccount.role, newAccount.ho, newAccount.password, newAccount.cap_tren, newAccount.to_chuc, newAccount.status, newAccount.ngay_het_han], function(err, res) {
        if (err) {
            
            result(true, err.message);
        } else {
            result(false, res.insertId);
        }
    }
    );
};

PhanQuyen.getAll = async function(result) {
    
   
    const sql = "SELECT account.*, nhom_nguoi_dung.ten_nhom, to_chuc.ten_to_chuc FROM account LEFT JOIN nhom_nguoi_dung ON account.role = nhom_nguoi_dung.id JOIN to_chuc ON account.to_chuc = to_chuc.id;" 
    
   

    await db.query(sql, function(err, res) {
        if (err) {
            result(true, err);
        } else {
           console.log(res.rows);
            result(false, res.rows);
        }
    });
};

PhanQuyen.getById = async function(id, result) {
    await db.query("SELECT * FROM bao_cao_hinh_anh WHERE id = $1", [id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            console.log(res);
            result(false, res.rows);
        }
    });
};

PhanQuyen.updateById = async function(id, newGroupUser, result) {
    await db.query("UPDATE nhom_nguoi_dung SET ten_nhom = $1, mo_ta = $2  WHERE id = $3", [newGroupUser.ten_nhom, newGroupUser.mo_ta, id], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

PhanQuyen.updateStatus = async function(statusData, result) {
    await db.query("UPDATE bao_cao_hinh_anh SET status = $1 WHERE id = $2", [statusData.status, statusData.idBaoCao], function(err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
        }
    });
};

PhanQuyen.deleteAccount = async function(id, result) {
    await db.query("DELETE FROM account WHERE id = $1", [id], function(err, res) {
        if (err) {
            console.log(err);
            result(true, err);
        } else {
            result(false, res);
        }
    });
};








module.exports = PhanQuyen;