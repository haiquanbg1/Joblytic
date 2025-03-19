const { StatusCodes } = require("http-status-codes");
const applicantService = require("../services/applicantService");
const skillService = require("../services/skillService");
const { successResponse, errorResponse } = require("../utils/response");

const findOne = async (req, res) => {
    const applicant = req.applicant;

    try {
        const skills = await skillService.findAll(applicant.id);
        return successResponse(res, StatusCodes.OK, "OK", applicant);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const update = async (req, res) => {
    const { salary, location, github, facebook, linkedin, birthday, description } = req.body;
    const applicant = req.applicant;

    const updateClause = Object.assign(
        {},
        salary && { salary },
        location && { location },
        github && { github },
        facebook && { facebook },
        linkedin && { linkedin },
        birthday && { birthday },
        description && { description },
    );

    try {
        await applicantService.update(applicant.id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const addSkill = async (req, res) => {
    const { skills } = req.body;
    const applicant = req.applicant;

    try {
        await skillService.destroy(applicant.id);

        for (let i = 0; i < skills; i++) {
            await skillService.create(applicant.id, skills[i]);
        }

        return successResponse(res, StatusCodes.OK, "Thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

module.exports = {
    findOne,
    update,
    addSkill
}