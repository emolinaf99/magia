const {Router} = require("express");
const router = Router();

const controller = require('../controllers/indexController')
const userController = require('../controllers/userController')

const authMiddleware = require('../middlewares/auth.middleware')
const guestMiddleware = require('../middlewares/guest.middleware')
const upload = require('../middlewares/multer');

const validationsLogin = require('../validations/login')

router.get("/", controller.vistaPaginaPrincipal);
router.get("/loginAdminMagia",guestMiddleware, userController.loginAdmin);
router.get("/funcionesAdministrador",authMiddleware, userController.funcionesAdministradorVista);
router.get("/logout",authMiddleware, userController.logout);


router.put('/bannerChange', authMiddleware, upload.single('imagenBanner'), controller.editarBannerPrincipal)
router.put('/bannerTextChange', authMiddleware, controller.editarTextoAnimado)

router.post("/formularioContacto", controller.formularioMayorista);
router.post("/loginProcess", validationsLogin, userController.loginProcess);



module.exports = router;