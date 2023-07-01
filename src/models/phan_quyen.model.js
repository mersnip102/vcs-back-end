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
    
    await db.query("INSERT INTO account (ten, username, email, phone, chuc_danh, dia_chi, role, ho, password, ngay_tao, to_chuc, ngay_het_han, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now(), $10, $11, $12)", [newAccount.ten, newAccount.username, newAccount.email, newAccount.phone, newAccount.chuc_danh, newAccount.dia_chi, newAccount.role, newAccount.ho, newAccount.password, newAccount.to_chuc, newAccount.ngay_het_han, newAccount.status], function(err, res) {
        if (err) {
            console.log(err)
            result(true, err.message);
        } else {
           
            result(false, res.insertId);
        }
    }
    );
};

PhanQuyen.getAll = async function(result) {
    
   
    const sql = "SELECT account.*, nhom_nguoi_dung.ten_nhom, to_chuc.ten_to_chuc FROM account JOIN nhom_nguoi_dung ON account.role = nhom_nguoi_dung.id JOIN to_chuc ON account.to_chuc = to_chuc.id" 
    
   

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

PhanQuyen.updateAccount = async function(id, dataUpdateAccount, result) {
    await db.query("UPDATE account SET ten = $1, username = $2, email = $3, phone = $4, chuc_danh = $5, dia_chi = $6, role = $7, ho = $8, password = $9, ngay_tao = $10, to_chuc = $11, ngay_het_han = $12, status = $13 WHERE id = $14", [dataUpdateAccount.ten, dataUpdateAccount.username, dataUpdateAccount.email, dataUpdateAccount.phone, dataUpdateAccount.chuc_danh, dataUpdateAccount.dia_chi, dataUpdateAccount.role, dataUpdateAccount.ho, dataUpdateAccount.password, new Date(),dataUpdateAccount.to_chuc, dataUpdateAccount.ngay_het_han, dataUpdateAccount.status, id], function(err, res) {
        if (err) {
            console.log(err)
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