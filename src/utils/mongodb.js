require("dotenv").config();
const mongoose = require('mongoose');

const host = process.env.mongo_host;
const port = process.env.mongo_port;
const username = process.env.mongo_username;
const password = process.env.mongo_password;
const database = process.env.mongo_database;

const dbURI = `mongodb://${username}:${password}@${host}:${port}/${database}`;  // root và rootpassword là thông tin đăng nhập của MongoDB

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Kết nối MongoDB thành công!");
}).catch(err => {
    console.log("Lỗi khi kết nối MongoDB:", err);
});
