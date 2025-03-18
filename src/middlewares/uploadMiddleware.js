const { upload } = require("../utils/upload");
const { errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

const uploadMiddleware = async (req, res, next) => {
    try {
        await upload.single('image')(req, res, (err) => {
            if (err) {
                return errorResponse(res, StatusCodes.BAD_REQUEST, err.message);
            }
            next();
        });
    } catch (error) {
        console.log(error)
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}

module.exports = uploadMiddleware;
