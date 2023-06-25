const db = require('../DB/connect.js');


const Accountant = function(admission) {

    this.Id = admission.Id;

    this.FullName = admission.FullName;

    this.Email = admission.Email;
    this.Phone = admission.Phone;
    this.Address = admission.Address
    this.InnitiatedDate = admission.InnitiatedDate;
    this.AccountId = admission.AccountId;

};



Accountant.getAccountantByAccountId = async function(accountId, result) {

    await db.query(
        "Select * from accountant where AccountId = ?",
        accountId,
        function(err, accountant) {

            if (err) {

                result(true, err);
            } else {
                if (accountant.length > 0) {
                    result(false, accountant[0]);
                } else {
                    result(true, null);
                }


            }
        }
    );
};

Accountant.updateProfile = async function(data, result) {
    await db.query(
        "UPDATE accountant, account SET accountant.FullName = ?, account.FullName = ?, accountant.Email = ?, account.Email = ?, accountant.Gender = ?, accountant.Address = ? WHERE accountant.AccountId = account.Id AND account.ID = ?", [data.FullName, data.FullName, data.Email, data.Email, data.Gender, data.Address, data.AccountId],
        function(err, accountant) {
            if (err) {
                result(true, err);
            } else {
                result(false, accountant);
            }
        }
    );
};




module.exports = Accountant;