const { Message } = require("../models/index");

const findAll = async (sender_id, receiver_id) => {
    const messages = await Message.findAll({
        where: {
            [Sequelize.Op.or]: [
                {
                    sender_id,
                    receiver_id
                },
                {
                    receiver_id: sender_id,
                    sender_id: receiver_id
                }
            ]
        },
        include: [
            {
                model: User,
                as: 'sender',
                attributes: ['id', 'name', 'email'] // Chỉ định các trường cần thiết
            },
            {
                model: User,
                as: 'receiver',
                attributes: ['id', 'name', 'email']
            }
        ]
    });
    return messages;
};

const findOne = async (whereClause) => {
    return await Message.findOne({
        where: whereClause,
    });
};

const create = async (insertClause) => {
    return await Message.create(insertClause);
};

const destroy = async (id) => {
    return await Message.destroy({
        where: {
            id: id,
        },
    });
};

const update = async (id, updateClause) => {
    return await Message.update(updateClause, {
        where: {
            id: id,
        },
    });
};

module.exports = {
    findAll,
    findOne,
    create,
    destroy,
    update,
};
