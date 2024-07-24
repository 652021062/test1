const mysql = require('mysql');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3062;

// Middleware เพื่อให้ Express รับข้อมูลแบบ JSON และ URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เรียกใช้งาน Express Router สำหรับ API routes
const ordersRouter = require('./routes/orders');

// เส้นทางสำหรับ API orders
app.use('/api/orders', ordersRouter);

// Middleware สำหรับการจัดการเมื่อไม่พบเส้นทางที่ถูกต้อง
app.use((req, res, next) => {
    res.sendStatus(404);
});

// ใช้ Express เริ่มต้นที่ PORT ที่กำหนด
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
