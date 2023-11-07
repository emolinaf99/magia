const {Router} = require("express");
const router = Router();
const controller = require('../controllers/productsController')


router.get("/productos/:idCategoria", controller.vistaProductos);
router.get("/detalle/:idProducto", controller.detalleProducto);



module.exports = router;