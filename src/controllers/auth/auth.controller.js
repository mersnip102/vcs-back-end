// const { validationResult } = require("express-validator")
// const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken');

const express = require("express");
const app = express();
var jwt = require("../../jwt/tokenUtils");

const hbs = require("hbs");
const async = require("hbs/lib/async");

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("assets"));
const Joi = require("joi");

// var Account = require('../../models/account.model.js').default;
var Account = require("../../models/account.model");
var token = require("../../jwt/tokenUtils");

var { prepareResponse } = require("../../common/response");

const {
    validateLoginData,
    validateProfileData,
    validateAmountData,
} = require("../../common/validation");

// const signIncontroller = async(req, res) => {
//     var data = req.body;
//     console.log(data);
//     Account.getByPhoneAndPassword(data, async function(status, account) {
//         if (account) {
//             const _token = await jwt.make(account);
//             res.send({ status: status, token: _token })
//         } else {
//             res.send({ status: status, token: null })
//         }
//     });
// }

const JoiPhoneNumber = require("joi-phone-number");
const Student = require("../../models/student.model");
const Accountant = require("../../models/accountant.model");
const Admission = require("../../models/admission.model");
const AdmissionManager = require("../../models/admission_manager");

// Thêm kiểm tra số điện thoại vào Joi
Joi.extend(JoiPhoneNumber);

// Định nghĩa schema để kiểm tra số điện thoại
// const phoneNumberSchema = Joi.string().phoneNumber({
//     defaultCountry: 'VN', // Quốc gia mặc định
//     format: 'national', // Định dạng số điện thoại (có thể là national, international, or E.164)
//     strict: true, // Kiểm tra chặt chẽ số điện thoại
// }).required();

const schemaLoginUser = Joi.object({
    phoneNumber: Joi.string()
        .regex(/^(?:\+|0)[0-9]{9,}$/)
        .required(),
    password: Joi.string().required(),
});

// const result = schemaLoginUser.validate(req.body)
// if (result.error) {
//     return apiResponse.response_status(res, result.error.message, 400)
//   }
let refreshTokens = [];
const signIncontroller = async(req, res) => {
    try {
        var data = req.body;

        const { error } = validateLoginData(req.body);
        if (error) {
            return prepareResponse(res, 400, error.details[0].message, null);
        }

        Account.getByPhoneAndPassword(data, async function(err, account) {
            if (account) {
                const payload = {
                    ID: account.ID,
                    Phone: account.Phone,
                    Email: account.Email,
                    FullName: account.FullName,
                    Role: account.Role,
                    Status: account.Status,
                };
                if (account.Role == 0) {
                    await Student.getStudentByAccountId(
                        account.ID,
                        async function(err, infor) {
                            if (!err) {
                                payload.Infor = infor;

                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            } else {
                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            }
                        }
                    );

                } else if (account.Role == 1) {
                    await Accountant.getAccountantByAccountId(
                        account.ID,
                        async function(err, infor) {
                            if (!err) {
                                payload.Infor = infor;

                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            } else {
                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            }
                        }
                    );

                } else if (account.Role == 2) {
                    await Admission.getAdmissionByAccountId(
                        account.ID,
                        async function(err, infor) {
                            if (!err) {
                                payload.Infor = infor;

                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            } else {
                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            }
                        }
                    );
                } else if (account.Role == 3) {
                    await AdmissionManager.getAdmissionManagerByAccountId(
                        account.ID,
                        async function(err, infor) {
                            if (!err) {
                                payload.Infor = infor;

                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            } else {
                                const accessToken = await jwt.generateAccessToken(payload);
                                const refreshToken = await jwt.generateRefreshToken(payload);

                                refreshTokens.push(refreshToken);

                                return prepareResponse(res, 200, "Login successful", {
                                    accessToken,
                                    refreshToken,
                                });
                            }
                        }
                    );
                }
            } else {
                return prepareResponse(res, 401, "Phone or password is incorrect", err);
            }
        });
    } catch (err) {
        return prepareResponse(res, 500, "Internal server error", err);
    }
};

const refreshToken = async(req, res) => {
    const refreshToken = req.body.refresh_token;
    if (refreshToken == null)
        return prepareResponse(res, 401, "token null", null);
    if (!refreshTokens.includes(refreshToken))
        return prepareResponse(res, 403, "token not exist", null);
    const decoded = await jwt.verifyRefreshToken(refreshToken);
    if (!decoded) return prepareResponse(res, 403, "token not exist", null);
    const payload = decoded;
    const accessToken = await jwt.generateAccessToken(payload);
    const newRefreshToken = await jwt.generateRefreshToken(payload);
    return prepareResponse(res, 200, "refresh token successful", {

        accessToken: accessToken,
        refreshToken: newRefreshToken,
    });

    // jwt.verifyRefreshToken(refreshToken, (err, account) => {
    //     if (err) return res.sendStatus(403)
    //     const accessToken = jwt.generateAccessToken({ account: account })
    //     res.json({ accessToken: accessToken })
    // })
};

const updateProfile = async(req, res) => {
    var data = req.body;

    if (req.user.Role == 1) {
        Accountant.updateProfile(data, function(err, account) {
            if (!err) {
                return prepareResponse(res, 200, "update succesful", account);
            } else {
                return prepareResponse(res, 400, "update faild", err);
            }
        });
    } else if (req.user.Role == 0) {
        Student.updateProfile(data, function(err, account) {
            if (!err) {
                return prepareResponse(res, 200, "update succesful", account);
            } else {
                return prepareResponse(res, 400, "update faild", err);
            }
        });
    } else if (req.user.Role == 2) {
        Admission.updateProfile(data, function(err, account) {
            if (!err) {
                return prepareResponse(res, 200, "update succesful", account);
            } else {
                return prepareResponse(res, 400, "update faild", err);
            }
        });
    } else if (req.user.Role == 3) {
        AdmissionManager.updateProfile(data, function(err, account) {
            if (!err) {
                return prepareResponse(res, 200, "update succesful", account);
            } else {
                return prepareResponse(res, 400, "update faild", err);
            }
        });
    }
};

const getProfile = async(req, res) => {
    const data = req.body
    console.log(data);

    if (data.Role == 0) {
        await Student.getStudentByAccountId(
            data.Id,
            async function(err, infor) {
                if (!err) {


                    return prepareResponse(res, 200, "Get profile successful", { infor: infor });
                } else {

                    return prepareResponse(res, 400, "Get profile faild", err);



                }
            }
        );

    } else if (data.Role == 1) {
        await Accountant.getAccountantByAccountId(
            data.Id,
            async function(err, infor) {
                if (!err) {

                    return prepareResponse(res, 200, "Get profile successful", { infor: infor });
                } else {

                    return prepareResponse(res, 400, "Get profile faild", err);



                }
            }
        );

    } else if (data.Role == 2) {
        await Admission.getAdmissionByAccountId(
            data.Id,
            async function(err, infor) {
                if (!err) {



                    return prepareResponse(res, 200, "Get profile successful", { infor: infor });
                } else {


                    return prepareResponse(res, 400, "Get profile faild", err);



                }
            }
        );
    } else if (data.Role == 3) {
        await AdmissionManager.getAdmissionManagerByAccountId(
            data.Id,
            async function(err, infor) {
                if (!err) {


                    return prepareResponse(res, 200, "Get profile successful", { infor: infor });
                } else {

                    return prepareResponse(res, 400, "Get profile faild", err);



                }

            }
        );
    }
};

// change password
const changePassword = async(req, res) => {
    try {
        var data = {
            ID: req.user.ID,
            newPassword: req.body.newPassword,
            reNewPassword: req.body.reNewPassword,
        }

        if (data.newPassword != data.reNewPassword) {
            return prepareResponse(res, 400, "Confirm password not match", null);
        } else {


            Account.changePassword(data, function(err, account) {
                if (err) {
                    return prepareResponse(res, 400, "Update password faild", account);

                } else {
                    return prepareResponse(res, 200, "Update password succesful", { account: account });

                }
            });

        }



    } catch (err) {
        return prepareResponse(res, 500, "Internal server error", err);
    }

};

const updateAccount = async(req, res) => {
    //update account
};

const home = async(req, res) => {
    res.render("login");
};

const isAuth = async function(req, res, next) {
    var _token = req.headers.authorization;
    if (_token) {
        try {
            var authData = await jwt.check(_token);

            req.auth = authData; // req chứa biến auth thì trong các routers khác có thể dùng auth này để lấy thông tin user được gửi lên
            next();
        } catch (err) {
            return res.send({ data: "Token không hợp lệ" });
        }
    } else {
        return res.send({ data: "Bạn chưa gửi kèm mã token" });
    }

    console.log(_token);
};

const logout = async(req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    return prepareResponse(res, 200, "logout successful", null);
};

// try {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         return prepareResponse(res, 400, { errors: error.array() });
//     }

//     const user = await models.user.findFirst({ where: { email: email } })
//     if (!user) {
//         return prepareResponse(res, 400, "Phone or password incorrrect")
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return prepareResponse(res, 400, "Phone or password incorrrect")
//     }

//     // if (!user.active) {
//     //     return prepareResponse(res, 400, "Please verify your account")
//     // }

//     // // Để xác thực người dùng, xác thực e là ai, đến từ đâu (jwt)
//     // const accessToken = jwt.sign({ user_id: user.id }, process.env.CONFIRM_EMAIL_TOKEN_SECRET, // NÊN ĐẶT KHÓ ĐOÁN, ký khi encode, chữ lý 1 ng khó đoán, đnáh dấu là của mình
//     //     {
//     //         expiresIn: process.env.REFRESH_TOKEN_EXP,
//     //     }
//     // );

//     return prepareResponse(res, 200, { accessToken: accessToken });

// } catch (error) {
//     console.log(error);
//     return prepareResponse(res, 500, error)
// }

module.exports = {
    logout,
    refreshToken,
    signIncontroller,
    home,
    isAuth,
    changePassword,
    updateProfile,
    getProfile
};