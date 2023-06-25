const db = require('../db/connect.js');

const Status = function(status) {
    this.id = logChange.id;
    this.id_account = logChange.id_account;
    this.id_event = logChange.id_event;
    this.action = logChange.action;
    this.time = logChange.time;
    this.description = logChange.description;

}

Status.create = async function(newStatus, result) {
    await db.query("INSERT INTO status SET ?", newStatus, function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Status.getAll = async function(result) {
    await db.query("Select * from status", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('status : ', res);
            result(null, res);
        }
    });
}

Status.getById = async function(statusId, result) {
    await db.query("Select * from status where id = ? ", statusId, function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Status.updateById = async function(status, result) {

    await db.query("UPDATE status SET id_event = ?, id_account = ?, action = ?, time = ?, description = ? WHERE id = ?", [status.id_event, status.id_account, status.action, status.time, status.description, status.id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Status.remove = async function(id, result) {
    await db.query("DELETE FROM status WHERE id = ?", [id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
}

module.exports = Status;