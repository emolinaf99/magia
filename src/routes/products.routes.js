const {Router} = require("express");
const router = Router();
const controller = require('../controllers/productsController')


router.get("/productos", controller.vistaProductos);
router.get("/detalle", controller.detalleProducto);





module.exports = router;