const async = require('hbs/lib/async.js');
const connection = require('../DB/connect.js')
const Account = function(account) {
    this.id = account.id;
    this.phone = account.phone;
    this.password = account.password;
    this.email = account.email;
    this.ho = account.ho;
    this.ten = account.ten;
    this.chu_danh = account.chu_danh;
    this.dia_chi = account.dia_chi;
    this.username = account.username;
    this.role = account.role;
    this.cap_tren = account.cap_tren;
    this.ngay_tao = account.ngay_tao;


//     this.Password = account.Password;
//     this.Email = account.Email;
//     this.Ho = account.Ho;
//     this.Ten = account.Ten;
//     this.ChucDanh = account.ChucDanh;
//     this.Diachi = account.Diachi;

//     this.Username = account.Username;
//     this.Role = account.Role;
//    this.CapTren = account.CapTren;
}

Account.getByUsernameAndPassword = async function(data, result) {
   
    await connection.query('SELECT * FROM account WHERE username = $1 AND password = $2', [data.username, data.password], function(err, account) {
        if (err || account.rows.length == 0 || account.rows == null) {
           
            result(false, err);
        } else {
            
            result(true, account);

            // const role = account[0].role;
            // if (role == -1) {
            //     res.render('login')
            // } else {
            //     req.session["Auth"] = {
            //         name: account[0].name,
            //         role: role
            //     }
            //     console.log("Ban dang dang nhap voi quyen la: " + role)
            //     res.redirect('/')
            // }
            // return account.role;
        };
    });

}

Account.changePassword = async function(data, result) {
    await connection.query("UPDATE account SET Password = ? WHERE ID = ?", [data.newPassword, data.ID], function(err, res) {
        if (err) {

            result(true, err);
        } else {

            result(false, res);
        }

    });
}

Account.createAccount = async function(data, result) {
    await connection.query('SELECT COUNT(*) as count FROM account WHERE Phone = ?', data.Phone, async function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(true, err);
            return
        } else {
            console.log(res[0].count);
            if (res[0].count > 0) {

                result(true, null);
                return
            } else {

                // result(false, "okee");
                await connection.query("INSERT INTO account SET ?", data, function(err, res) {
                    if (err) {
                        console.log("error: ", err);

                        result(true, err);
                    } else {

                        result(false, data);
                    }
                });
                return
            }
        }
    });

}

Account.getAccountById = async function(ID, result) {
    await connection.query("SELECT * FROM account WHERE ID = ?", ID, function(err, res) {
        if (err) {

            result(false, err);
        } else {

            result(true, res);
        }
    });
}

Account.check_login = function(data, result) {

}

module.exports = Account;