const db = require('../DB/connect.js');

const Payment = function(payment) {

    this.Id = payment.Id;
    this.FeeType = payment.FeeType;
    this.StudentId = payment.StudentId;

    this.PaymentValue = payment.PaymentValue;
    this.ConfirmDate = payment.ConfirmDate;
    this.Status = payment.Status;
    this.RequestDate = payment.RequestDate;



}

Payment.checkPaymentExist = async function(studentId, feeType, result) {
    await db.query("Select * from payment where StudentId = ? and FeeType = ?", [studentId, feeType], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log("fgd: ", res);
            result(true, res);
        }
    });
}


Payment.getAllPaymentByStudentId = async function(studentId, result) {
    await db.query("Select * from payment where StudentId = ?", [studentId], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log("fgd: ", res);
            result(true, res);
        }
    });
}


Payment.create = async function(newPayment, result) {
    console.log(newPayment)
    newPayment.Status = 0;

    // values.push([data.Id, data.StudentId, data.PaymentValue, feeType, data.RequestDate]);
    await db.query("INSERT INTO payment (Id, StudentId, PaymentValue, FeeType, RequestDate, Status) VALUES ?", [newPayment], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            console.log(res);
            result(true, res);
        }
    });
}

Payment.updateById = async function(Id, payment, result) {

    await db.query("UPDATE payment SET Status = ? WHERE Id = ?", [payment.Status, Id], function(err, res) {
        console.log(payment);
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}


Payment.getAll = async function(result) {
    await db.query("Select payment.*, fee.FeeType AS FeeName from payment JOIN fee ON payment.FeeType = fee.Id", function(err, res) {
        if (err) {

            result(false, err);
        } else {

            result(true, res);
        }
    });
}

Payment.getById = async function(paymentId, result) {
    await db.query("Select * from payment where Id = ? ", paymentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}



Payment.remove = async function(id, result) {
    await db.query("DELETE FROM payment WHERE Id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}


module.exports = Payment;