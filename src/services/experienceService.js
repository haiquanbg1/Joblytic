const { Experience } = require("../models/index");

const findAll = async (whereClause) => {
    return await Experience.findAll({
        where: whereClause
    });
}

const findOne = async (whereClause) => {
    return await Experience.findOne({
        where: whereClause
    });
}

const update = async (id, updateClause) => {
    return await Experience.update(updateClause, {
        where: {
            id
        }
    });
}

const create = async (insertClause) => {
    return await Experience.create(insertClause);
}

const destroy = async (id) => {
    return await Experience.destroy(id);
}

module.exports = {
    findAll,
    findOne,
    destroy,
    create,
    update
}
