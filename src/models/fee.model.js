const db = require('../DB/connect.js');

const Fee = function(fee) {

    this.Id = fee.Id;
    this.SchoolYear = fee.SchoolYear;
    this.Fee = fee.Fee;
    this.FeeType = fee.FeeType;


}

Fee.create = async function(newFee, result) {
    await db.query("INSERT INTO fee SET ?", newFee, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log(res);
            result(true, res);
        }
    });
}


Fee.getAll = async function(result) {

    await db.query("Select * from fee", function(err, res) {

        if (err) {

            result(false, err);
        } else {

            result(true, res);
        }
    });
}

Fee.getById = async function(feeId, result) {
    await db.query("Select * from fee where Id = ? ", feeId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res[0]);
        }
    });
}

Fee.updateById = async function(fee, result) {
    console.log(fee.SchoolYear)

    await db.query("UPDATE fee SET SchoolYear = ?, Fee = ?, Feetype = ? WHERE Id = ?", [fee.SchoolYear, fee.Fee, fee.FeeType, fee.Id], function(err, res) {

        if (err) {

            result(false, err);
        } else {
            console.log("dfdsfvdsfdsfv");
            result(true, res);
        }
    });
}

Fee.remove = async function(id, result) {
    await db.query("DELETE FROM fee WHERE Id = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}


module.exports = Fee;