const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3062;

// Middleware เพื่อให้ Express รับข้อมูลแบบ JSON และ URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ดึงค่าการเชื่อมต่อจาก .env
const { HOST, USER, PASSWORD, DATABASE, PORT: DB_PORT } = process.env;

// สร้าง connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: DB_PORT
});

// ตัวอย่างการใช้งาน connection pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');

    // ตัวอย่างการ query ข้อมูลจากฐานข้อมูล
    connection.query('SELECT * FROM users', (error, results, fields) => {
        connection.release(); // คืน connection ให้กับ pool
        if (error) throw error;
        console.log('Query results:', results);
    });
});

// ปิด connection pool เมื่อแอปพลิเคชันถูกปิด
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            return console.log('Error closing pool', err.message);
        }
        console.log('Pool closed');
        process.exit(0);
    });
});

// Middleware สำหรับการจัดการเมื่อไม่พบเส้นทางที่ถูกต้อง
app.use((req, res, next) => {
    res.sendStatus(404);
});

// เรียกใช้ Express เริ่มต้นที่ PORT ที่กำหนด
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
