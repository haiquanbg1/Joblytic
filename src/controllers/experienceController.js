const { StatusCodes } = require("http-status-codes");
const experienceService = require("../services/experienceService");
const { successResponse, errorResponse } = require("../utils/response");

const update = async (req, res) => {
    const { experience_id } = req.params;
    const { company, position, start_date, end_date, description } = req.body;

    const updateClause = Object.assign(
        {},
        company && { company },
        position && { position },
        start_date && { start_date },
        end_date && { end_date },
        description && { description }
    );

    try {
        await experienceService.update(experience_id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(
            res, StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const create = async (req, res) => {
    const applicant = req.applicant;
    const { company, position, start_date, end_date, description } = req.body;

    try {
        const experience = await experienceService.create({
            applicant_id: applicant.id,
            company,
            position,
            start_date,
            end_date,
            description
        });

        return successResponse(res, StatusCodes.CREATED, "Thành công.");
    } catch (error) {
        return errorResponse(
            res, StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

module.exports = {
    update,
    create
}
