const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/response");
const applicantService = require("../services/applicantService");

const applicantMiddleware = async (req, res, next) => {
    const user = req.user;

    try {
        if (user.role != "applicant") {
            return errorResponse(res, StatusCodes.BAD_REQUEST, "Bạn không có quyền này.");
        }

        req.applicant = await applicantService.findOne({
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

module.exports = applicantMiddleware;