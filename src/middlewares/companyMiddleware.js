const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/response");
const companyService = require("../services/companyService");

const companyMiddleware = async (req, res, next) => {
    const user = req.user;

    try {
        if (user.role == "applicant") {
            return errorResponse(res, StatusCodes.BAD_REQUEST, "Bạn không có quyền này.");
        }

        req.company = await companyService.findOne({
            user_id: user.id
        });
        next();
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

module.exports = companyMiddleware;