const { Company } = require("../models/index");

const findAll = async (whereClause) => {
    return await Company.findAll({
        where: whereClause
    });
}

const findOne = async (whereClause) => {
    return await Company.findOne({
        where: whereClause
    });
}

const update = async (id, updateClause) => {
    return await Company.update(updateClause, {
        where: {
            id
        }
    });
}

const create = async (insertClause) => {
    return await Company.create(insertClause);
}

const destroy = async (id) => {
    return await Company.destroy(id);
}

module.exports = {
    findAll,
    findOne,
    destroy,
    create,
    update
}
