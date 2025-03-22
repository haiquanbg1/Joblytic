var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
const express = require("express");
const cors = require("cors");
const apiRouter = require("../routes/api");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var session = require("express-session");
const passport = require("./passport");
const { corsOptions } = require("../config/corsOptions");
const http = require("http");
const mongodb = require("../utils/mongodb");
const socketIo = require("socket.io");

module.exports = (app) => {
    app.use(
        session({
            secret: "joblytic secret",
            resave: false,
            saveUninitialized: false,
        })
    );

    // config passport
    app.use(passport.initialize());
    app.use(passport.session());

    // config req.body
    app.use(logger("dev"));
    app.use(express.json({ limit: "100mb" }));
    app.use(express.urlencoded({ extended: true, limit: "100mb" }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.json());

    // config routes
    app.use("/api/v1", cors(corsOptions), apiRouter);
    // app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.send(err);
    });

    mongodb();

    const server = http.createServer(app);
    const io = socketIo(server);

    // Lắng nghe sự kiện kết nối từ client
    let users = {}; // Lưu trữ các kết nối người dùng, sử dụng userId làm khóa

    // Lắng nghe kết nối
    io.on('connection', (socket) => {
        const { channelId } = socket.handshake.query;
        socket.join(channelId);

        //console.log(`User connected to channel: ${channelId}`);

        // Lắng nghe sự kiện 'message' từ máy khách
        socket.on('send_message', (msg) => {
            console.log('Message from client:', msg);

            // Gửi lại sự kiện 'message' đến tất cả các máy khách
            io.to(channelId).emit('receive_message', msg);
        });

        // Khi người dùng ngắt kết nối
        socket.on('disconnect', () => {
            console.log(`User disconnected from channel: ${channelId}`);
        });
    });

    // Bắt đầu lắng nghe trên một cổng cụ thể, ví dụ: cổng 8080
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    return server;
};
