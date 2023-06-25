const db = require('../DB/connect.js');
const Email = function(event) {
    this.id = event.id;
    this.role_id = event.role_id;
    this.emailSent = event.emailSent;
    this.emailReceived = event.emailReceived;
    this.subject = event.subject;
    this.text = event.text;
    this.date = event.date;
    this.file = event.file;

}

Email.add = async function(newEmail, result) {
    await db.query("INSERT INTO email SET ?", newEmail, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Email.getAll = async function(result) {
    await db.query("Select * from email", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('email : ', res);
            result(null, res);
        }
    });
}

Email.getById = async function(emailId, result) {
    await db.query("Select * from email where id = ? ", emailId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}


//get email by emailSent
Email.getByEmailSent = async function(emailSent, result) {
    await db.query("Select * from email where emailSent = ? ", emailSent, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}




Email.remove = async function(id, result) {
    await db.query("DELETE FROM email WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = Email;