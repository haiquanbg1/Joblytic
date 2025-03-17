const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");
const ms = require("ms");

const login = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.body.email.toLowerCase();

        const user = await userService.findOne({ email });
        if (!user) {
            return errorResponse(res, StatusCodes.NOT_FOUND, "Email không tồn tại");
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return errorResponse(
                res,
                StatusCodes.BAD_REQUEST,
                "Mật khẩu không chính xác"
            );
        }

        const accessToken = createAccessToken({
            userId: user.id
        });
        const refreshToken = createRefreshToken({ userId: user.id });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });

        return successResponse(res, StatusCodes.OK, "Đăng nhập thành công.");
    } catch (error) {
        console.log(error)
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const register = async (req, res) => {
    const { password, name } = req.body;
    const email = req.body.email.toLowerCase();

    const user = await userService.findOne({ email });
    if (user) {
        return errorResponse(res, StatusCodes.NOT_FOUND, "Email đã tồn tại.");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
        const user = await userService.create({
            name,
            email,
            password: hashPassword
        });

        const accessToken = createAccessToken({
            userId: user.id
        });
        const refreshToken = createRefreshToken({ userId: user.id });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });

        return successResponse(res, StatusCodes.CREATED, "Đăng ký thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return successResponse(res, StatusCodes.OK, "Đăng xuất thành công");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

const googleAuthCallback = async (req, res) => {
    const user = req.user;

    try {
        let userExist = await userService.findOne({ email: user.email });

        if (!userExist) {
            userExist = await userService.create({
                name: user.name,
                email: user.email
            });
        }

        const accessToken = createAccessToken({
            userId: userExist.id
        });
        const refreshToken = createRefreshToken({ userId: userExist.id });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });

        return res.redirect('http://localhost:5173');
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error
        );
    }
};

module.exports = {
    login,
    register,
    logout,
    googleAuthCallback
}