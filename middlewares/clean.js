const cleanImageURL = async (req, res, next) => {
    try {
        if (req.body.image) {
            req.body.image = req.body.image.replace("C:\\fakepath\\", "");
        }
        next();
    } catch (error) {
        console.log(error)
        next(error);
    }
};

module.exports = {
    cleanImageURL
};