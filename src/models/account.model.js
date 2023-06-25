const async = require('hbs/lib/async.js');
const connection = require('../DB/connect.js')
const Account = function(account) {
    this.ID = account.ID;
    this.Phone = account.Phone;
    this.Password = account.Password;
    this.Email = account.Email;
    this.FullName = account.FullName;

    this.Role = account.Role;
    this.Status = account.Status
}

Account.getByPhoneAndPassword = async function(data, result) {

    await connection.query('SELECT * FROM account WHERE Phone = ? AND Password = ?', [data.phone, data.password], function(err, account) {
        if (err || account.length == 0 || account == null) {
            result(false, null);
        } else {
            result(true, account[0]);

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