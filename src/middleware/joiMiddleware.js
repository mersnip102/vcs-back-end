const {
    validateLoginData,
    validateProfileData,
    validateAmountData,
    validateUserCreationData,
    validatePassword,
    validateEmptyBaoCaoHinhAnh,
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

const validateEmptyBaoCao = (req, res, next) => {
    console.log(req.body)

    const { error } = validateEmptyBaoCaoHinhAnh({
        TieuDe: req.body.TieuDe,
        LoaiBaoCao: req.body.LoaiBaoCao,
        DoiTuong: req.body.DoiTuong,
        DonViChuTri: req.body.DonViChuTri,

    });
    if (error) {
        console.log(error.details[0].message)
        return prepareResponse(res, 400, error.details[0].message, { message: error.details[0].message });
    }
    next();
};



module.exports = { validateDeposit, validateCreateAccountStudent, validatePasswordChange, validateEmptyBaoCao };