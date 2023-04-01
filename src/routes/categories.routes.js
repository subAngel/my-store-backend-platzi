const express = require("express");

// crea un endpoint para obtener categorias de productos usando faker-js

const router = express.Router();

router.get("/:categoryId/products/:productsId", (req, res) => {
	const { categoryId, productsId } = req.params;
	res.json({ categoryId, productsId });
});

module.exports = router;
