const {Router} = require("express");
const router = Router();
const controller = require('../controllers/productsController')
const authMiddleware = require('../middlewares/auth.middleware')
const guestMiddleware = require('../middlewares/guest.middleware')
const upload = require('../middlewares/multer');

router.get("/productos/:idCategoria", controller.vistaProductos);
router.get("/detalle/:idProducto", controller.detalleProducto);

router.post('/createScent', authMiddleware, controller.crearNuevaFragancia)
router.post('/createCategory', authMiddleware, upload.single('imgBannerCategory'), controller.crearNuevaCategoria)
router.post('/createProduct', authMiddleware, upload.fields([{name: "imagenPrincipal", maxCount: 1},{name: "imagenDos", maxCount: 1},{name: "imagenTres", maxCount: 1}]), controller.crearNuevoProducto)

router.put('/editProduct', authMiddleware, upload.fields([{name: "imagenPrincipal", maxCount: 1},{name: "imagenDos", maxCount: 1},{name: "imagenTres", maxCount: 1}]), controller.editarProducto)
module.exports = router;