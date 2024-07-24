const express = require('express');
const router = express.Router();

let orders = [
    { id: 1, product: 'Product A', quantity: 2 },
    { id: 2, product: 'Product B', quantity: 1 },
];

// GET /api/orders - ดึงข้อมูลคำสั่งซื้อทั้งหมด
router.get('/', (req, res) => {
    res.json(orders);
});

// GET /api/orders/:id - ดึงข้อมูลคำสั่งซื้อแต่ละรายการ
router.get('/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        res.sendStatus(404);
    } else {
        res.json(order);
    }
});

// POST /api/orders - เพิ่มคำสั่งซื้อใหม่
router.post('/', (req, res) => {
    const { product, quantity } = req.body;
    const orderId = orders.length + 1;
    const newOrder = { id: orderId, product, quantity };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// PUT /api/orders/:id - อัปเดตข้อมูลคำสั่งซื้อ
router.put('/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const { product, quantity } = req.body;
    let updated = false;
    orders = orders.map(o => {
        if (o.id === orderId) {
            o.product = product;
            o.quantity = quantity;
            updated = true;
        }
        return o;
    });
    if (updated) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE /api/orders/:id - ลบคำสั่งซื้อ
router.delete('/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const initialLength = orders.length;
    orders = orders.filter(o => o.id !== orderId);
    if (orders.length < initialLength) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
