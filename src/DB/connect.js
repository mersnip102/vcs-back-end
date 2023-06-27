var mysql = require('mysql');
const { Pool } = require('pg');

const connection = new Pool({
    // host: "sql.freedb.tech",
    // user: "freedb_tuyen_sinh",
    // password: "Ma&hgQbH2m@!8yT",
    // database: "freedb_Final_Project"

    // host: "localhost",
    // user: "root",
    // port: "6969",
    // password: "root",
    // database: "pakn"

    user: 'postgres',
    host: 'localhost',
    database: 'pakn',
    password: 'quyen692001',
    port: 6969, // port mặc định của PostgreSQL là 5432
});

connection.connect((error) => {
    if (error) {
        console.error('Connect error: ' + error.stack);
        return;
    }

    console.log('Connected DB');
});

// // Thực hiện truy vấn để lấy dữ liệu từ bảng "users"
// connection.query('SELECT * FROM bao_cao_hinh_anh', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     console.log(results.rows);
//     // connection.end(); // Đóng kết nối với PostgreSQL
//   });

module.exports = connection;


// const mysql = require('mysql2');

// const connect = mysql.createPool({
//     host: "sql.freedb.tech",
//     user: "freedb_quennx102",
//     password: "#?ZGfvKCwj%Fz2S",
//     database: "freedb_Final_Project"

//     // DB_HOST=sql313.epizy.com
//     // DB_USERNAME=epiz_34005412
//     // DB_PASSWORD=8eI96GobSYJR5
//     // DB_DBNAME=epiz_34005412_tuyen_sinh
//     // host: process.env.DB_HOST,
//     // user: process.env.DB_USERNAME,
//     // password: process.env.DB_PASSWORD,
//     // database: process.env.DB_DBNAME
// });

// connect.getConnection( function(err) {
//     if (err) {
//         console.log("Error");
//         throw err;

//     } else {
//         console.log("Connected!");
//     }
// });

// module.exports = connect.promise()



// var mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: "sql.freedb.tech",
//     user: "freedb_quennx102",
//     password: "#?ZGfvKCwj%Fz2S",
//     database: "freedb_Final_Project"
// });

// connection.connect((error) => {
//     if (error) {
//         console.error('Connect error: ' + error.stack);
//         return;
//     }

//     console.log('Connected as id ' + connection.threadId);
// });

// module.exports = connection;
