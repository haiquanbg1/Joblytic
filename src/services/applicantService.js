const { Applicant } = require("../models/index");

const findAll = async (whereClause) => {
    return await Applicant.findAll({
        where: whereClause
    });
}

const findOne = async (whereClause) => {
    return await Applicant.findOne({
        where: whereClause
    });
}

const update = async (id, updateClause) => {
    return await Applicant.update(updateClause, {
        where: {
            id
        }
    });
}

const create = async (insertClause) => {
    return await Applicant.create(insertClause);
}

const destroy = async (id) => {
    return await Applicant.destroy(id);
}

module.exports = {
    findAll,
    findOne,
    destroy,
    create,
    update
}
