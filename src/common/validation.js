// validation.js
const Joi = require('joi');

const requiredString = Joi.string().required();
const emailValidation = Joi.string().email().message('Email is not valid');
const usernameValidation = Joi.string().required().min(6).message('Phone number must be 10-15 digits');
const passwordValidation = Joi.string().required().min(6).max(30).message('password must be at least 8 characters');
// const fullNameValidation = Joi.string().regex(/^[a-zA-ZÀ-ÿ-'\s]+$/).min(3).max(50).message('Full name must be at least 3 characters, maximum 50 characters and not contain special characters');
const fullNameValidation = Joi.string()
    .regex(/^[a-zA-ZÀ-Ỹ-]+(\s+[a-zA-ZÀ-Ỹ-]+)*$/)
    .min(3)
    .max(50)
    .message('Full name must be at least 3 characters, maximum 50 characters and not contain special characters');
const addressValidation = Joi.string().max(255).message('Address must be maximum 255 characters');
const birthDateValidation = Joi.date().iso().max('now').message('Birth date must be a valid date and less than today');
const amountValidation = Joi.number().positive().max(100000000).message('Amount must be a positive number');
const genderValidation = Joi.string().valid('male', 'female', 'other')


const validateLoginData = (data) => {
    const schema = Joi.object({
        username: usernameValidation.required(),
        password: passwordValidation.required(),
    });

    return schema.validate(data);
};


const validateProfileData = (data) => {
    const schema = Joi.object({
        fullName: fullNameValidation.required(),
        address: addressValidation.required(),
        birthDate: birthDateValidation.required(),
        gender: genderValidation.required(),
        email: emailValidation.required(),
    });

    return schema.validate(data);
};


const validateAmountData = (data) => {
    const schema = Joi.object({
        amount: amountValidation.required(),
    });

    return schema.validate(data);
};

const validateUserCreationData = (data) => {
    console.log(data);
    const schema = Joi.object({
        Phone: phoneValidation.required(),
        Email: emailValidation.required(),
        FullName: fullNameValidation.required(),
        Admission: requiredString.required(),
        LeadSoure: requiredString.required(),
        AdmissionManager: requiredString.required(),
    });

    return schema.validate(data);
};

const validatePassword = (data) => {
    const schema = Joi.object({

        newPassword: passwordValidation.required(),
        // reNewPassword: Joi.ref('newPassword'),
        reNewPassword: passwordValidation.required(),
    });

    return schema.validate(data);
};


const validateEmptyBaoCaoHinhAnh = (data) => {
    const schema = Joi.object({

        // khác ''
        TieuDe: Joi.string().required(),
        LoaiBaoCao: Joi.string().required(),
        DoiTuong: Joi.string().required(),
        DonViChuTri: Joi.string().required(),


        
    });

    return schema.validate(data);
};
module.exports = {
    validateLoginData,
    validateProfileData,
    validateAmountData,
    validateUserCreationData,
    validatePassword,
    validateEmptyBaoCaoHinhAnh
};