const { Application } = require("../models/index");

const create = async (job_id, applicant_id, status) => {
    return await Application.create({
        job_id,
        applicant_id,
        status
    });
}

const destroy = async (application_id) => {
    return await Application.destroy({
        id: application_id
    });
}

const changeStatus = async (application_id, status) => {
    return await Application.update(application_id, {
        status
    });
}

module.exports = {
    create,
    destroy,
    changeStatus
}