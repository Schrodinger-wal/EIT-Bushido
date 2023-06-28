function isAdmin (req, res, next) {
    if(req.user.role !== 'ADMIN-ROLE') {
        return res.status 
    }
    next();
}

module.exports = isAdmin;