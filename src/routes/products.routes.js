const { Router } = require('express');
const fs = require('fs');
const plist = require('../productos.json');

const router = Router();

// GET /api/prods
router.get('/', (req, res) => {
    return res.json({
        ok: true,
        products: plist.products,
    });
});

// GET /api/prods/:id
router.get('/:pId', (req, res) => {
    console.log("PARAMS", req.params);
    const pId = req.params.pId;

    if (isNaN(pId)) {
        return res.status(400).json({
            ok: true,
            message: `No existe el producto con el id ${pId}`,
            queryParams: req.query,
        });
    }

    const product = plist.products.find((u) => {
        return u.id === Number(pId);
    });
    if (!product) {
        return res.json({
            ok: true,
            message: `No se ha encontrado el producto con el id "${pId}"`,
            queryParams: req.query,
        });
    }
    return res.json({ ok: true, message: `product id: ${pId}`, product });
});

// POST /api/prods
router.post('/', (req, res) => {
    const prod = req.body;
    console.log(prod);
    const lastId = plist.products[plist.products.length - 1].id;
    const newprod = {
        id: lastId + 1, // Generar un nuevo ID
        ...prod
    };
    plist.products.push(newprod);
    fs.writeFileSync('../productos.json', JSON.stringify(plist, null, 2)); // Guardar los cambios en el archivo JSON
    res.json({ ok: true, message: "Producto agregado", product: newprod });
});

// PUT /api/prods/:id
router.put('/:pId', (req, res) => {
    const updatedProduct = req.body;
    const productId = req.params.pId;
    const index = plist.products.findIndex(p => p.id === Number(productId));
    if (index !== -1) {
        plist.products[index] = { ...plist.products[index], ...updatedProduct };
        fs.writeFileSync('../productos.json', JSON.stringify(plist, null, 2)); // Guardar los cambios en el archivo JSON
        res.json(plist.products[index]);
    } else {
        res.status(404).json({
            ok: false,
            message: `No existe el producto con id ${productId}`
        });
    }
});

// DELETE /api/prods/:id
router.delete('/:pId', (req, res) => {
    const productId = req.params.pId;
    const filteredProducts = plist.products.filter(p => p.id !== Number(productId));
    if (filteredProducts.length < plist.products.length) {
        plist.products = filteredProducts;
        fs.writeFileSync('../productos.json', JSON.stringify(plist, null, 2)); // Guardar los cambios en el archivo JSON
        res.json({
            ok: true,
            message: 'Producto eliminado correctamente'
        });
    } else {
        res.status(404).json({
            ok: false,
            message: `No existe el producto con id ${productId}`
        });
    }
});

module.exports = router;
