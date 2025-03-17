const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcryptjs");

const findUser = async (req, res) => {
    const user = req.user;

    try {
        return successResponse(res, StatusCodes.OK, "Thành công.", {
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const update = async (req, res) => {
    const user = req.user;
    const { name } = req.body;

    try {
        await userService.update(user.id, { name });

        return successResponse(res, StatusCodes.OK, "Cập nhật thông tin thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const deleteAccount = async (req, res) => {
    const user = req.user;

    try {
        await user.destroy();

        return successResponse(res, StatusCodes.OK, "Xoá thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const changePassword = async (req, res) => {
    const { curPass, newPass } = req.body;
    //console.log(curPass)
    //console.log(newPass)
    const user = req.user;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(newPass, salt);

    try {
        const checkPassword = bcrypt.compareSync(curPass, user.password);
        //console.log(curPass, user.password)
        if (!checkPassword) {
            return errorResponse(
                res,
                StatusCodes.BAD_REQUEST,
                "Mật khẩu không chính xác"
            );

        }

        await userService.update(user.id, {
            password: hashPassword
        });

        return successResponse(res, StatusCodes.OK, "Đổi password thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

module.exports = {
    findUser,
    update,
    deleteAccount,
    changePassword,
}