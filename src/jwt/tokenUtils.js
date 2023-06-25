// const jwt = require('jsonwebtoken');
const fs = require('fs');

// // const PRIVATE_KEY = fs.readFileSync('../private-key.txt', 'utf8');

// const PRIVATE_KEY = "okeeeeeeeee"

// //tạo mã token
// let make = function(user) {
//     return new Promise(function(resolve, reject) {
//         jwt.sign({ data: user }, PRIVATE_KEY, {
//                 // algorithm: 'RS256',
//                 expiresIn: "24h",
//                 // subject: user
//             },
//             function(err, _token) {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve(_token);
//                 }
//             });
//     });
// }


// const checkToken = (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         // Xác thực token
//         jwt.verify(token, PRIVATE_KEY, (err, payload) => {
//             if (payload) {
//                 req.user = payload;
//                 next();
//             } else {
//                 // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
//                 res.status(401).send('Unauthorized');
//             }
//         })
//     } catch (err) {
//         // Nếu không có token ở header, server sẽ response status code 401 với msg bên dưới        
//         res.status(401).send('No token provided');
//     }
// };

// const protectedRoute = (req, res, next) => {
//     // Nếu req.user tồn tại nghĩa là token cũng tồn tại
//     if (req.user) {
//         return next();
//     }

//     // Ngược lại server sẽ response status code 401 với msg bên dưới 
//     res.status(401).send('Unauthorized');
// }

// // Nếu pass cả 2 middleware có nghĩa là token là hàng real, server sẽ response status code là 200 cùng với req.user



// //check => xác thực mã đúng, sai, hết hạn

// let check = function(token) {
//     return new Promise(function(resolve, reject) {
//         jwt.verify(token, ACCESS_TOKEN, function(err, decoded) {
//             if (err) {
//                 return reject(err); // nếu sai trả về lỗi đó
//             } else {
//                 return resolve(decoded); //nếu đúng thì trả về mã token và decode thành user với email và name
//             }
//         });
//     });
// }




// module.exports = { make: make, check: check };


// auth.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const accessTokenSecret = "fgwuniversitysecret"
const refreshTokenSecret = "fgwuniversitysecret"

const generateAccessToken = (payload) => {

    return jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '2h' });
};

const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, accessTokenSecret);
        return decoded;
    } catch (error) {
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, refreshTokenSecret);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};