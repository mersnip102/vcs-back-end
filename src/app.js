const express = require('express')

const app = express()

const path = require('path');
const hbs = require('hbs');
const multer = require('multer')


const formData = require("express-form-data");

// const { signIncontroller, home, isAuth } = require('./controllers/auth/auth.controller');


const session = require('express-session') // phân role
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false })) // phân role

// const fileUpload = require('express-fileupload');
// app.use(fileUpload());


app.set('view engine', 'hbs')
app.set('views', '../views');
const fs = require('fs');

const { formatTime } = require("./common/formatTime")



app.use(express.urlencoded({ extended: true })) // dòng code giúp lấy dữ liệu từ form - body
var bodyParser = require('body-parser') //đọc nội dung repuest gửi lên dạng post từ người dùng
var cors = require('cors') // cho phép truy cập từ các domain khác
app.use(bodyParser.json()) //đọc body repuest gửi lên theo cấu trúc json
app.use(bodyParser.urlencoded({ extended: true })) // khi gửi extended = true thg gặp lỗi về ký tự 

app.use(cors()) // accept request  cross domain

const partialsPath = path.join(__dirname, "/views/partials");
hbs.registerPartials(partialsPath);

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

const dotenv = require('dotenv');
dotenv.config();

const { authRouter, studentRouter, admissionsRouter,
    eventsRouter, managerRouter, accountantRouter, dashboardRouter, baoCaoHinhAnhRouter } = require('./routes/index');

//Allow origin
// Đính kèm middleware xử lý CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {

    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// var server = require('http').Server(app);
// var io = require('socket.io')(server, {

//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// }); //nghĩa là server đag .user cái socket.io



// var Server = require('socket.io');

// const io2 = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', function(socket) {

//     socket.on("Client-chat", function(data) {
//         console.log('Client ID = ' + socket.id + ' send: ' + data);
//         socket.emit("Server-send", data); //gui cho chinh nguoi dung gui

//         // io.sockets.emit("Server-send", data); //gui cho tat ca
//         // socket.broadcast.emit("Server-send", data); //gui cho tat ca tru nguoi gui
//     });
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/uploads/chat/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/chat-upload', upload.single('file'), async(req, res) => {
    const { room, message, sender, timestamp, file } = req.body;

    // console.log('File:', req.file.path);
    console.log(req.file)
    console.log(req.body)

    // const connection = await mysql.createConnection(dbConfig);
    // await connection.execute(
    //     'INSERT INTO messages (Room, Content, SenderId, TimeStamp, File) VALUES (?, ?, ?, ?, ?)', [room, message, sender, timestamp, file]
    // );


    // io.to(room).emit('message', { message, sender, timestamp, file });

    // res.status(200).send({ message: 'File uploaded successfully' });
});

function getRoomId(userIds) {
    userIds.sort((a, b) => a - b);
    return `private_chat_${userIds.join('_')}`;
}

// Khai báo đường dẫn đến tệp
const filePath = path.join(__dirname, 'assets/uploads/chat/FinalReportTemplate.docx');

app.get('/download/:filename', (req, res) => {
    const { filename } = req.params;


    // Thay đổi đường dẫn này với thư mục chứa tập tin của bạn
    const fileDirectory = path.join(__dirname, 'assets/uploads/');
    console.log(fileDirectory)

    // Kiểm tra xem tập tin có tồn tại hay không
    const filePath = path.join(fileDirectory, filename);
    if (fs.existsSync(filePath)) {
        // Nếu tập tin tồn tại, gửi nó lại như là một tập tin tải xuống
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error during file download:', err);
                res.status(500).send('Error during file download');
            }
        });
    } else {
        // Nếu tập tin không tồn tại, trả về lỗi 404
        res.status(404).send('File not found');
    }
});


// app.get('/image/:imageName', (req, res) => {
//     const { imageName } = req.params;
//     const imagePath = path.join(__dirname, 'images', imageName);

//     res.sendFile(imagePath, (err) => {
//       if (err) {
//         console.error('Error during image file sending:', err);
//         res.status(500).send('Error during image file sending');
//       }
//     });
//   });

// Đưa ảnh lên server và hiển thị nó cho client
app.get('/image', (req, res) => {
    const imagePath = path.join(__dirname, 'path/to/your/image');

    // Kiểm tra xem tệp ảnh có tồn tại hay không
    if (fs.existsSync(imagePath)) {
        // Thiết lập header và gửi tệp cho client
        res.setHeader('Content-Type', 'image/jpeg');
        res.sendFile(imagePath);
    } else {
        // Nếu tệp không tồn tại, trả về lỗi 404
        res.status(404).send('Image not found');
    }
});


const db = require("./DB/connect.js");
const Student = require('./models/student.model');
const Account = require('./models/account.model');
const { prepareResponse } = require('./common/response');
const moment = require('moment');

// function formatTime(timestamp) {
//     const now = moment();
//     const messageTime = moment(timestamp);

//     if (now.diff(messageTime, 'seconds') < 60) {
//         return 'just now';
//     } else if (now.diff(messageTime, 'minutes') < 60) {
//         return now.diff(messageTime, 'minutes') + ' minutes ago';
//     } else if (now.diff(messageTime, 'hours') < 24) {
//         return now.diff(messageTime, 'hours') + ' hours ago';
//     } else {
//         return messageTime.format('MMM DD, YYYY HH:mm');
//     }
// }

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', async(room) => {
        socket.join(room);
        const promises = [];
        // Load previous messages from the database
        await db.query('SELECT * FROM messages WHERE Room = ? ORDER BY TimeStamp ASC', [room], async(err, result) => {
            if (err) {
                console.error('Error fetching messages:', err);
                return;
            } else {

                await result.forEach(async(message) => {

                    message.TimeStamp = formatTime(message.TimeStamp);
                    console.log(message.TimeStamp);
                    const promise = new Promise(async(resolve, reject) => {

                        await Account.getAccountById(message.SenderId, async(status, res) => {
                            if (status) {
                                message.Sender = res[0];


                                await Account.getAccountById(message.ReceiverId, (status, res) => {
                                    if (status) {
                                        message.Receiver = res[0];

                                        resolve(message);

                                    } else {
                                        console.error('Error fetching messages:', err);
                                        message.Receiver = null;
                                        reject(message);

                                    }
                                });

                            } else {
                                console.error('Error fetching messages:', err);
                                message.Sender = null;
                                reject(message);

                            }
                        });

                    });
                    promises.push(promise);

                });

                Promise.all(promises).then((values) => {

                    socket.emit('previous-messages', values);
                });

                // socket.emit('previous-messages', result);
            }

        });
    });



    socket.on('message', (data) => {
        //change fileNAME to file
        if (data.file !== undefined && data.file !== null && data.file !== '') {

            const fileName = data.fileName
            const extName = path.extname(fileName);
            console.log('Ext:', extName);
            const baseName = path.basename(fileName, extName);
            const file = baseName + '-' + Date.now() + extName;
            console.log('File:', file);
            console.log('Message received:', data);

            fs.writeFile(`assets/uploads/chat/${file}`, data.file.originFileObj, (err) => {
                if (err) throw err;
                console.log('File saved successfully');
            });

            // const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

            // const now = new Date();
            // const localDateTime = now.toLocaleString();
            // console.log(localDateTime);
            // const timestamp = new Date().toLocaleDateString()

            // console.log('Message received:', timestamp);
            let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

            // Save the message to the database
            db.query('INSERT INTO messages (Content, Room, SenderId, ReceiverId, TimeStamp, File) VALUES (?, ?, ?, ?, ?, ?)', [
                data.Content,
                data.Room,
                data.SenderId,
                data.ReceiverId,
                timestamp,
                file,
            ], (err, result) => {
                if (err) {
                    console.error('Error saving message:', err);
                    return;
                }
                timestamp = formatTime(timestamp);
                io.to(data.Room).emit('message', {...data, file, timestamp });
            });
        } else {
            // const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            // console.log('Message received:', timestamp);



            let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

            console.log('Message received:', timestamp);

            // Save the message to the database
            db.query('INSERT INTO messages (Content, Room, SenderId, ReceiverId, TimeStamp) VALUES (?, ?, ?, ?, ?)', [
                data.Content,
                data.Room,
                data.SenderId,
                data.ReceiverId,
                timestamp,
            ], (err, result) => {
                if (err) {
                    console.error('Error saving message:', err);
                    return;
                }
                timestamp = formatTime(timestamp);
                console.log(timestamp);
                io.to(data.Room).emit('message', {...data, timestamp });
            });

        }

    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('join_room', (userIds) => {
//         const roomId = getRoomId(userIds);
//         socket.join(roomId);
//         console.log(`User joined room: ${roomId}`);
//     });

//     socket.on('message', (message) => {
//         console.log(message);
//         io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
//     });

//     // Đăng nhập
//     socket.on('login', (data) => {
//         const { username, userType } = data;

//         // Lưu thông tin người dùng vào socket
//         socket.username = username;
//         socket.userType = userType;

//         // Thêm user vào room tương ứng
//         socket.join(userType + '-' + username);

//         console.log(`User ${username} logged in as ${userType}`);

//         // Gửi danh sách sinh viên đến tuyển sinh
//         if (userType === 'tuyen-sinh') {
//             const user = users[username];
//             const students = user.students.map((student) => ({
//                 id: student,
//                 name: users[student].name,
//             }));
//             socket.emit('studentList', students);
//         }
//     });

//     // Gửi tin nhắn
//     // socket.on('message', (data) => {
//     //     const { from, to, message } = data;
//     //     console.log(`Message from ${from} to ${to}: ${message}`);

//     //     // Gửi tin nhắn tới người nhận
//     //     io.to(to).emit('message', data);
//     // });

//     socket.on('message', (msg) => {
//         console.log(msg);
//         socket.broadcast.emit('message-broadcast', msg);
//     });

//     // Ngắt kết nối
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// })
const pdfPath = '../assets/my-pdf-file.pdf';
app.get('/my-pdf-file.pdf', (req, res) => {
    // Check if the request is for the PDF file
    if (req.url === '/my-pdf-file.pdf') {
        // Read the PDF file from the file system
        fs.readFile(pdfPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading the PDF file');
            } else {
                // Set the response headers to indicate that the content is a PDF file
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename=my-pdf-file.pdf');

                // Send the PDF file content to the browser
                res.end(data);
            }
        });
    } else {
        // For all other requests, respond with a simple "Hello World" message
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    }
})






app.use(authRouter)
    // app.use(isAuth); //middleware để xác thực ng dùng bằng token
app.use(studentRouter)
app.use(admissionsRouter)
app.use(eventsRouter)
app.use(managerRouter)
app.use(accountantRouter)
app.use(dashboardRouter)
app.use(baoCaoHinhAnhRouter)

app.all('*', function(req, res) {
    return prepareResponse(res, 404, 'Page not found', null);
})

const PORT = process.env.PORT || 3000
server.listen(PORT)
console.log("Server is running! " + PORT)