const { StatusCodes } = require("http-status-codes");
const companyService = require("../services/companyService");
const userService = require("../services/userService");
const { getFile } = require("../utils/minio");
const { successResponse, errorResponse } = require("../utils/response");

const findOne = async (req, res) => {
    const company = req.company;
    const user = req.user;

    try {
        const avatar = await getFile("avatar", `user${user.id}`);

        const response = {
            name: user.name,
            website: company.website,
            location: company.location,
            description: company.description,
            avatar
        };

        return successResponse(res, StatusCodes.OK, "Thành công.", response);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const findAll = async (req, res) => {
    try {
        const companies = await companyService.findAll();
        let response = [];

        for (let i = 0; i < companies.length; i++) {
            response.push(companies[i]);
            response.avatar = await getFile("avatar", `user${response.user_id}`);
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", response);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const update = async (req, res) => {
    const company = req.company;
    const user = req.user;
    const { name, email, phone, website, location, description } = req.body;

    const updateUser = Object.assign(
        {},
        name && { name },
        email && { email },
        phone && { phone },
    );

    const updateCompany = Object.assign(
        {},
        website && { website },
        location && { location },
        description && { description },
    );

    try {
        await companyService.update(company.id, updateCompany);
        await userService.update(user.id, updateUser);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
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
    findAll
}