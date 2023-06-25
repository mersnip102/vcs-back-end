const {
    validateLoginData,
    validateProfileData,
    validateAmountData,
    validateUserCreationData,
    validatePassword
} = require('../common/validation');

const { prepareResponse } = require('../common/response');

const validateDeposit = (req, res, next) => {
    const { error } = validateAmountData(req.body);
    if (error) {
        return prepareResponse(res, 400, "Error", { message: error.message, });

        // res.status(400).json({
        //     error: true,

        // });

    }
    next();
};

const validateCreateAccountStudent = (req, res, next) => {

    const { error } = validateUserCreationData(req.body.account);
    if (error) {
        // return res.status(400).send(error.details[0].message);
        return prepareResponse(res, 400, "Error in validation", { message: error.details[0].message });
    }

    next();
};

const validatePasswordChange = (req, res, next) => {

    const { error } = validatePassword(req.body);
    if (error) {
        console.log(error)
        return prepareResponse(res, 400, "Error in validation", { message: error.details[0].message });
    }
    next();
};


module.exports = { validateDeposit, validateCreateAccountStudent, validatePasswordChange };