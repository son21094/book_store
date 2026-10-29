/**
 * Script khởi tạo dữ liệu hạng thành viên (ranks).
 *
 * Cách dùng:
 *   npm run init-ranks          # chỉ tạo nếu DB chưa có rank nào
 *   npm run init-ranks:force    # xóa các rank mặc định cũ rồi tạo lại
 *
 * Lưu ý: server cũng tự gọi autoInitializeRanks() khi khởi động,
 * nên bình thường không cần chạy script này.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Rank = require('./src/ranks/rank.model');
const { autoInitializeRanks } = require('./src/ranks/rank.init');

const isForce = process.argv.includes('--force');

const run = async () => {
    if (!process.env.DB_URL) {
        console.error('❌ Thiếu biến môi trường DB_URL trong file backend/.env');
        process.exit(1);
    }

    try {
        console.log('🔌 Đang kết nối MongoDB...');
        await mongoose.connect(process.env.DB_URL, { serverSelectionTimeoutMS: 10000 });
        console.log('✅ Kết nối thành công');

        if (isForce) {
            const existing = await Rank.countDocuments();
            console.log(`⚠️  Chế độ --force: xóa ${existing} rank hiện có...`);
            await Rank.deleteMany({});
        }

        await autoInitializeRanks();

        await mongoose.disconnect();
        console.log('👋 Đã ngắt kết nối. Hoàn tất.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Lỗi khi khởi tạo ranks:', error.message);
        await mongoose.disconnect().catch(() => {});
        process.exit(1);
    }
};

run();
