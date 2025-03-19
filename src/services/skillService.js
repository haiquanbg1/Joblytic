const { ApplicantSkill, Skill } = require("../models/index");

const create = async (applicant_id, skill_id) => {
    return await ApplicantSkill.create({
        applicant_id,
        skill_id
    });
}

const destroy = async (applicant_id) => {
    return await ApplicantSkill.destroy({
        where: {
            applicant_id
        }
    });
}

const findAll = async (applicant_id) => {
    return await ApplicantSkill.findAll({
        where: {
            applicant_id
        },
        include: [{
            model: Skill,
            attributes: ["name"]
        }]
    });
}

module.exports = {
    create,
    destroy,
    findAll
}