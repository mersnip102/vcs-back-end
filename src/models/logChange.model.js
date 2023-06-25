const db = require('../DB/connect.js');

const LogChange = function(logChange) {
    this.id = logChange.id;
    this.id_account = logChange.id_account;
    this.id_event = logChange.id_event;
    this.action = logChange.action;
    this.time = logChange.time;
    this.description = logChange.description;

}

LogChange.create = async function(newLogChange, result) {
    await db.query("INSERT INTO log_change SET ?", newLogChange, function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

LogChange.getAll = async function(result) {
    await db.query("Select * from log_change", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('log_change : ', res);
            result(null, res);
        }
    });
}

LogChange.getById = async function(logChangeId, result) {
    await db.query("Select * from log_change where id = ? ", logChangeId, function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

LogChange.updateById = async function(logChange, result) {

    await db.query("UPDATE log_change SET id_event = ?, id_account = ?, action = ?, time = ?, description = ? WHERE id = ?", [logChange.id_event, logChange.id_account, logChange.action, logChange.time, logChange.description, logChange.id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

LogChange.remove = async function(id, result) {
    await db.query("DELETE FROM log_change WHERE id = ?", [id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
}

module.exports = LogChange;