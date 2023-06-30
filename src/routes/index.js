const { authRouter } = require('./auth.route');
const { studentRouter } = require('./student.route');
const { admissionsRouter } = require('./admissions.route');
const { eventsRouter } = require('./events.route');
const { managerRouter } = require('./admission_manager.route');
const { accountantRouter } = require('./accountant.route');
const {dashboardRouter} = require('./dashboard.route');
const {baoCaoHinhAnhRouter} = require('./bao_cao_hinh_anh.route');
const {nhomNguoiDungRouter} = require('./nhom_nguoi_dung.route');
const {accountRouter} = require('./account.route');
module.exports = {
    authRouter,
    studentRouter,
    admissionsRouter,
    eventsRouter,
    managerRouter,
    accountantRouter,
    dashboardRouter,
    baoCaoHinhAnhRouter,
    nhomNguoiDungRouter,
    accountRouter
    

};