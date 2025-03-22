const { StatusCodes } = require("http-status-codes");
const jobService = require("../services/jobService");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
    const company = req.company;
    const { title, description, requirements, salary, location, category_id, type } = req.body;

    try {
        const job = await jobService.create({
            company_id: company.id,
            title,
            description,
            requirements,
            salary,
            location,
            category_id,
            type
        });

        return successResponse(res, StatusCodes.CREATED, "Thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const update = async (req, res) => {
    const { title, description, requirements, salary, location, category_id, type } = req.body;
    const { job_id } = req.params;

    const updateClause = Object.assign(
        {},
        title && { title },
        description && { description },
        requirements && { requirements },
        salary && { salary },
        location && { location },
        category_id && { category_id },
        type && { type },
    );

    try {
        await jobService.update(job_id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const destroy = async (req, res) => {
    const { job_id } = req.params;

    try {
        await jobService.destroy(job_id);

        return successResponse(res, StatusCodes.OK, "Xoá thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const findAll = async (req, res) => {
    const company = req.company;

    try {
        const jobs = await jobService.findAll({
            company_id: company.id
        });

        return successResponse(res, StatusCodes.OK, "Thành công.", jobs);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const findOne = async (req, res) => {
    const { job_id } = req.params;

    try {
        const job = await jobService.findOne({
            id: job_id
        });

        return successResponse(res, StatusCodes.OK, "Thành công.", job);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

module.exports = {
    create,
    update,
    destroy,
    findAll,
    findOne
}