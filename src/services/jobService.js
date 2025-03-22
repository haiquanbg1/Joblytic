const { Job, SaveJob, Application } = require("../models/index");

const findAll = async (whereClause) => {
    return await Job.findAll({
        where: whereClause,
    });
};

const findOne = async (whereClause) => {
    return await Job.findOne({
        where: whereClause,
    });
};

const create = async (insertClause) => {
    return await Job.create(insertClause);
};

const destroy = async (id) => {
    return await Job.destroy({
        where: {
            id: id,
        },
    });
};

const update = async (id, updateClause) => {
    return await Job.update(updateClause, {
        where: {
            id: id,
        },
    });
};

const saveJob = async (job_id, applicant_id) => {
    return await SaveJob.create({
        job_id,
        applicant_id
    });
}

const unsaveJob = async (savejob_id) => {
    return await SaveJob.destroy({
        id: savejob_id
    });
}

module.exports = {
    findAll,
    findOne,
    create,
    destroy,
    update,
    saveJob,
    unsaveJob
};
