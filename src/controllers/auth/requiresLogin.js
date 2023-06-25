function requiresLogin(req, res, next) {
    if (req.session["Student"] && req.session["Student"].id) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = { requiresLogin }