const { StatusCodes } = require("http-status-codes");
const messageService = require("../services/messageService");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
    const user = req.user;
    const { user_id, message } = req.body;

    try {
        await messageService.create({
            sender_id: user.id,
            receiver_id: user_id,
            message
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

const findAll = async (req, res) => {
    const user = req.user;
    const { user_id } = req.query;

    try {
        const messages = await messageService.findAll({
            sender_id: user.id
        })
    } catch (error) {

    }
}