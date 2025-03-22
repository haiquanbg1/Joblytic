const { StatusCodes } = require("http-status-codes");
const applicantService = require("../services/applicantService");
const skillService = require("../services/skillService");
const experienceService = require("../services/experienceService");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");
const { getFile } = require("../utils/minio");

const findOne = async (req, res) => {
    const applicant = req.applicant;
    const user = req.user;

    try {
        const skills = await skillService.findAll(applicant.id);
        const experiences = await experienceService.findAll({
            applicant_id: applicant.id
        });

        const avatar = await getFile("avatar", `user${user.id}`);

        let response = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar,
            salary: applicant.salary,
            location: applicant.location,
            github: applicant.github,
            facebook: applicant.facebook,
            linkedin: applicant.linkedin,
            birthday: applicant.birthday,
            description: applicant.description,
            skills,
            experiences
        };

        return successResponse(res, StatusCodes.OK, "OK", response);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const update = async (req, res) => {
    const { salary, location, github, facebook, linkedin, birthday, description, name, email, phone } = req.body;
    const applicant = req.applicant;
    const user = req.user;

    const updateApplicant = Object.assign(
        {},
        salary && { salary },
        location && { location },
        github && { github },
        facebook && { facebook },
        linkedin && { linkedin },
        birthday && { birthday },
        description && { description },
    );

    const updateUser = Object.assign(
        {},
        name && { name },
        email && { email },
        phone && { phone },
    );

    try {
        await applicantService.update(applicant.id, updateApplicant);
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