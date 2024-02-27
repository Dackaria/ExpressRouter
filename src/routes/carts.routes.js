const { Router } = require('express');
const cartsList = require('../carrito.json');

const router = Router();

// GET /api/carts
router.get('/', (req, res) => {
    return res.json({
        ok: true,
        carts: cartsList.carts,
    });
});

// GET /api/carts/:cid
router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = cartsList.carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({
            ok: false,
            message: `No existe el carrito con id ${cartId}`
        });
    }
    return res.json({
        ok: true,
        cart
    });
});

// POST /api/carts
router.post('/', (req, res) => {
    const lastCartId = cartsList.carts.length > 0 ? cartsList.carts[cartsList.carts.length - 1].id : 0;
    const newCartId = lastCartId + 1;
    const newCart = {
        id: newCartId,
        products: []
    };
    cartsList.carts.push(newCart);
    res.status(201).json(newCart);
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = cartsList.carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({
            ok: false,
            message: `No existe el carrito con id ${cartId}`
        });
    }

});

// DELETE /api/carts/:cid
router.delete('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const filteredCarts = cartsList.carts.filter(c => c.id !== cartId);
    if (filteredCarts.length < cartsList.carts.length) {
        cartsList.carts = filteredCarts;
        res.json({
            ok: true,
            message: `Carrito con id ${cartId} eliminado correctamente`
        });
    } else {
        res.status(404).json({
            ok: false,
            message: `No existe el carrito con id ${cartId}`
        });
    }
});

module.exports = router;