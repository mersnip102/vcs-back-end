const prepareResponse = (res, status, message, args) => {
    res.status(status).json({
        status,
        message,
        ...args, //... để lấy tất cả các thuộc tính của args và gán vào đây (args là 1 object) 
        // ...helps to get all the properties of args and assign them here (args is an object)
    });
};

// const ACTION = {
//     CLASS_USER: 'CLASS_USER',
//     USER_ATTENDANCE: 'USER_ATTENDANCE',
//     CLASS_CALENDAR: 'CLASS_CALENDAR',
// };

// module.exports = { prepareResponse, ACTION };
module.exports = { prepareResponse };