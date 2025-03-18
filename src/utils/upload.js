const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Đường dẫn tuyệt đối tới thư mục lưu trữ bên ngoài
const uploadDirectory = path.join(__dirname, '../files');

// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        const name = uniqueSuffix + "==" + file.originalname;
        cb(null, name);
    }
});

exports.upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);  // Cho phép upload ảnh
        } else {
            cb(new Error('Chỉ cho phép upload file ảnh (JPEG, PNG, GIF)'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }  // Giới hạn kích thước file là 10MB (có thể điều chỉnh theo nhu cầu)
});