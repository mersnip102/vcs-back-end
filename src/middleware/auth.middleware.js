const jwt = require('jsonwebtoken')
    // const apiResponse = require('../helpers/api.response.helper')
    // const Languages = require('../utils/languages');
const { prepareResponse } = require('../common/response');
const {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
} = require('../jwt/tokenUtils');
require('dotenv').config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (authHeader) {
        const token = authHeader.split(' ')[1];
        //check valid token

        const decoded = verifyAccessToken(token);
        if (decoded) {
            req.user = decoded;

            next();
        } else {
            return prepareResponse(res, 403, 'Token is not valid', null);
        }


        // jwt.verify(token, accessTokenSecret, (err, decoded) => {
        //     if (err) {
        //         return prepareResponse(res, 403, 'Token is not valid', null);

        //     }

        //     req.user = decoded;
        //     next();
        // });
    } else {
        return prepareResponse(res, 403, 'Token is not provided', null)
    }
};

module.exports = {

    authenticateJWT,
    // verifyToken(req, res, next) {
    //     const token = req.header('Authorization')
    //     if (token) {
    //         const accessToken = token.split(' ')[1]
    //         const result = jwt.verify(accessToken, '10')
    //         req.userId = result.id
    //         if (result) {
    //             next()
    //         } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
    //     } else {
    //         return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
    //     }
    // },
    // isAdmin(req, res, next) {
    //     const token = req.header('Authorization')
    //     if (token) {
    //         const accessToken = token.split(' ')[1]
    //         const result = jwt.verify(accessToken, '10')
    //         req.userId = result.id
    //         if (result.role === 1) {
    //             next()
    //         } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
    //     } else {
    //         return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
    //     }
    // },
    // isStaff(req, res, next) {
    //     const token = req.header('Authorization')
    //     if (token) {
    //         const accessToken = token.split(' ')[1]
    //         const result = jwt.verify(accessToken, '10')
    //         req.userId = result.id
    //         if (result.role === 4) {
    //             next()
    //         } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
    //     } else {
    //         return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
    //     }
    // },
    // isQAM(req, res, next) {
    //     const token = req.header('Authorization')
    //     if (token) {
    //         const accessToken = token.split(' ')[1]
    //         const result = jwt.verify(accessToken, '10')
    //         if (result.role === 2) {
    //             next()
    //         } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
    //     } else {
    //         return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
    //     }
    // },
    // isQAC(req, res, next) {
    //     const token = req.header('Authorization')
    //     if (token) {
    //         const accessToken = token.split(' ')[1]
    //         const result = jwt.verify(accessToken, '10')
    //         if (result.role === 3) {
    //             next()
    //         } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
    //     } else {
    //         return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
    //     }
    // }

}