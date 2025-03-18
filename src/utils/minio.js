require("dotenv").config();
const Minio = require("minio");
const fs = require("fs");

// Khởi tạo MinIO client
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET;

// Kiểm tra và tạo bucket nếu chưa có
const ensureBucketExists = async () => {
    try {
        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
            await minioClient.makeBucket(bucketName);
            console.log(`Bucket "${bucketName}" đã được tạo.`);
        }
    } catch (error) {
        console.error("Lỗi khi kiểm tra/tạo bucket:", error);
    }
};

// Hàm upload file lên MinIO
const uploadFile = async (folderName, filePath, name) => {
    try {
        await ensureBucketExists();

        const fileStream = fs.createReadStream(filePath);
        const fileName = folderName + "/" + name;

        await minioClient.putObject(bucketName, fileName, fileStream);
        console.log(`File "${fileName}" đã được upload thành công.`);

        return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
    } catch (error) {
        console.error("Lỗi khi upload:", error);
        throw new Error("Lỗi khi upload: " + error);
    }
};

// Hàm lấy pre-signed URL của file
const getFile = async (folderName, fileName, expiry = 3600) => {
    try {
        if (!bucketName || !fileName) {
            throw new Error("Thiếu bucketName hoặc fileName");
        }

        // Đường dẫn đầy đủ trong bucket (nếu có folderName)
        const objectName = folderName ? `${folderName}/${fileName}` : fileName;

        // Tạo pre-signed URL
        const presignedUrl = await minioClient.presignedUrl("GET", bucketName, objectName, expiry);

        return presignedUrl;
    } catch (error) {
        console.error("Lỗi khi lấy file:", error);
        throw new Error("Không thể lấy file từ MinIO: " + error.message);
    }
};

// Hàm xóa file khỏi MinIO
const deleteFile = async (folderName, fileName) => {
    try {
        const objectName = `${folderName}/${fileName}`;
        await minioClient.removeObject(bucketName, objectName);
        console.log(`File "${objectName}" đã được xóa.`);
        return { success: true };
    } catch (error) {
        console.error("Lỗi khi xóa file:", error);
        throw new Error("Lỗi khi xóa file: " + error);
    }
};

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};